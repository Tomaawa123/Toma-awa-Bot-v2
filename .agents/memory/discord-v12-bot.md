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
