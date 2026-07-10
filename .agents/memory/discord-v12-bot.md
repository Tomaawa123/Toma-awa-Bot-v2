---
name: Toma awa Discord bot (discord.js v12)
description: Version-specific quirks for this bot project that differ from modern discord.js docs/examples.
---

This project's Discord bot runs **discord.js v12**, not v13+. Most examples online (and AI-generated snippets) use v13+ syntax, which silently breaks here.

- Sending embeds: use `message.channel.send(embed)` or `message.reply(embed)` directly (embed instance as the arg), or `.send({ embed })`. The v13+ form `.send({ embeds: [embed] })` sends an effectively empty message and throws `DiscordAPIError: Cannot send an empty message`.
- Attachments alongside a reply: `message.reply(embed, { files: [file] })`, not `{ embeds: [...], files: [...] }`.

**Why:** New NSFW commands were written with v13-style `{ embeds: [...] }` calls and crashed the bot process at runtime (uncaught DiscordAPIError, no message handler try/catch) the moment a user triggered them.

**How to apply:** When adding/editing any command file in `comandos/`, always check existing working commands' send/reply syntax first and match it, rather than assuming latest discord.js API docs apply.

Other project structure notes:
- Commands live in `comandos/`, loaded recursively (including subfolders like `comandos/nsfw/`) by `index.js`.
- NSFW commands are restricted to a single hardcoded channel ID and require `message.channel.nsfw === true`.
- `nekobot.xyz` (and its `pgif`/`anal`/`hentai`/`pussy` types) is dead (403 Forbidden). Working free NSFW image API found: `https://api.n-sfw.com/nsfw/<category>` (categories confirmed working: hentai, ass, anal, gif, vagina, neko, trap, blowjob; `pussy`/`boobs`/`solo` return 404 — use `vagina` instead). For male/gay content, `https://purrbot.site/api/img/nsfw/yaoi/gif` works (returns `{link}`); its `pussy` category is broken/Forbidden.
- Music/voice commands (`play`, `join`, `skip`, etc.) were originally empty stubs — never implemented. Built real playback with `@discordjs/voice` + `ytdl-core` + `ytsr` (search by name) + system `ffmpeg` (already present in Nix env). Note: `ffmpeg-static` fails to install here (native postinstall SIGSEGV) — do not use it, rely on system ffmpeg instead. Shared playback state lives in `utils/musicManager.js` (per-guild queue map).
- discord.js v12 has NO `guild.voiceAdapterCreator` (that's v13+). `@discordjs/voice`'s `joinVoiceChannel` needs a manual adapter for v12: implement `adapterCreator` yourself, forwarding raw `VOICE_SERVER_UPDATE`/`VOICE_STATE_UPDATE` gateway events (via `client.ws.on(...)`) to the adapter's `onVoiceServerUpdate`/`onVoiceStateUpdate`, and send payloads via `guild.shard.send(data)`. See `utils/musicManager.js` for the implementation.
- `ytsr` filter category for videos is named `"Videos"` (plural), not `"Video"` — `filters.get("Type").get("Video")` silently returns undefined and crashes search.
- Command loader matches aliases via `c.alias` (not `c.aliases`) — new command files must use the `alias` key or alias matching silently fails (name-only match still works).
- `megadb` deprecation warning is cosmetic, not an error: `megadbx` (all versions 1.0.0–2.0.1 checked) has a completely different class-based API (`MegaDB`, `MegaDBAsync`, etc.), is NOT drop-in compatible with `megadb`'s sync `crearDB()/.tiene()/.establecer()/.obtener()/.sumar()` API used for the leveling system, and its `MegaDB` class constructor even throws in this environment. Decision: keep `megadb`, do not migrate without a full rewrite of leveling-system calls.
- GitHub remote `origin` already points to `github.com/Tomaawa123/Toma-awa-Bot` — repo is connected; Replit's checkpoint system handles committing, so no manual push automation was needed/added.
