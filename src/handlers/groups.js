const { color } = require('../utils');

async function handleGroupUpdate(sock, { id, participants, action }) {
  const actions = {
    'add': `🎉 Welcome @${participants[0].split('@')[0]}!`,
    'remove': `🚪 User left the group.`
  };

  if (actions[action]) {
    await sock.sendMessage(id, { 
      text: actions[action],
      mentions: participants
    });
  }
}

module.exports = handleGroupUpdate;
