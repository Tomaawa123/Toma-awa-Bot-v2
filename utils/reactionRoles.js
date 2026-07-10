const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "..", "reactionroles.json");

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
  } catch (e) {
    return {};
  }
}

function saveData(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

function addReactionRole(guildId, messageId, emoji, roleId) {
  const data = loadData();
  if (!data[guildId]) data[guildId] = {};
  if (!data[guildId][messageId]) data[guildId][messageId] = {};
  data[guildId][messageId][emoji] = roleId;
  saveData(data);
}

function removeReactionRole(guildId, messageId, emoji) {
  const data = loadData();
  if (data[guildId] && data[guildId][messageId]) {
    delete data[guildId][messageId][emoji];
    saveData(data);
  }
}

function getRoleId(guildId, messageId, emoji) {
  const data = loadData();
  return data[guildId] && data[guildId][messageId] && data[guildId][messageId][emoji];
}

function emojiKey(reactionEmoji) {
  return reactionEmoji.id || reactionEmoji.name;
}

function initReactionRoles(client) {
  client.on("raw", async (packet) => {
    if (!["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(packet.t)) return;

    const { d: data } = packet;
    if (!data.guild_id) return;

    const channel = client.channels.cache.get(data.channel_id);
    if (!channel) return;

    let message;
    try {
      message = channel.messages.cache.get(data.message_id) || (await channel.messages.fetch(data.message_id));
    } catch (e) {
      return;
    }

    const emojiId = data.emoji.id || data.emoji.name;
    const roleId = getRoleId(data.guild_id, data.message_id, emojiId);
    if (!roleId) return;

    const guild = client.guilds.cache.get(data.guild_id);
    if (!guild) return;
    const member = guild.members.cache.get(data.user_id) || (await guild.members.fetch(data.user_id).catch(() => null));
    if (!member || member.user.bot) return;

    const role = guild.roles.cache.get(roleId);
    if (!role) return;

    if (packet.t === "MESSAGE_REACTION_ADD") {
      await member.roles.add(role).catch(() => {});
    } else {
      await member.roles.remove(role).catch(() => {});
    }
  });
}

module.exports = {
  initReactionRoles,
  addReactionRole,
  removeReactionRole,
  emojiKey,
};
