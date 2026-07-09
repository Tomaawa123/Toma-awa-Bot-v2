const DELETE_DELAY_MS = 60 * 1000;

const rooms = new Map();
const pendingDeletes = new Map();

function registerRoom(guildId, channelId, roleId, ownerId) {
  rooms.set(channelId, { guildId, channelId, roleId, ownerId });
}

function getRoomByChannel(channelId) {
  return rooms.get(channelId);
}

function getRoomByOwner(guildId, ownerId) {
  for (const room of rooms.values()) {
    if (room.guildId === guildId && room.ownerId === ownerId) return room;
  }
  return null;
}

async function destroyRoom(guild, channelId) {
  const room = rooms.get(channelId);
  if (!room) return;
  rooms.delete(channelId);

  const channel = guild.channels.cache.get(channelId);
  if (channel) {
    try { await channel.delete("Canal privado vacío"); } catch (e) {}
  }
  const role = guild.roles.cache.get(room.roleId);
  if (role) {
    try { await role.delete("Canal privado eliminado"); } catch (e) {}
  }
}

function cancelPendingDelete(channelId) {
  const timeout = pendingDeletes.get(channelId);
  if (timeout) {
    clearTimeout(timeout);
    pendingDeletes.delete(channelId);
  }
}

function schedulePendingDelete(guild, channelId) {
  cancelPendingDelete(channelId);
  const timeout = setTimeout(() => {
    pendingDeletes.delete(channelId);
    const channel = guild.channels.cache.get(channelId);
    if (channel && channel.members.size === 0) {
      destroyRoom(guild, channelId);
    }
  }, DELETE_DELAY_MS);
  pendingDeletes.set(channelId, timeout);
}

function initTempVoiceManager(client) {
  client.on("voiceStateUpdate", (oldState, newState) => {
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;

    if (oldChannel && rooms.has(oldChannel.id) && oldChannel.id !== (newChannel && newChannel.id)) {
      if (oldChannel.members.size === 0) {
        schedulePendingDelete(oldState.guild, oldChannel.id);
      }
    }

    if (newChannel && rooms.has(newChannel.id)) {
      cancelPendingDelete(newChannel.id);
    }
  });
}

module.exports = {
  initTempVoiceManager,
  registerRoom,
  getRoomByChannel,
  getRoomByOwner,
  destroyRoom,
};
