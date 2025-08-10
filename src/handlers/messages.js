const { getContentType } = require('@whiskeysockets/baileys');
const { color } = require('../utils');

async function messageHandler(sock, { messages }) {
  for (const msg of messages) {
    try {
      const jid = msg.key.remoteJid;
      const msgType = getContentType(msg.message);
      
      // Text messages
      if (msgType === 'conversation' || msgType === 'extendedTextMessage') {
        const text = msg.message[msgType]?.text || '';
        
        if (text.startsWith('!')) {
          const [cmd, ...args] = text.slice(1).split(' ');
          
          switch(cmd.toLowerCase()) {
            case 'ping':
              await sock.sendMessage(jid, { text: '🚀 Pong!' });
              break;
              
            case 'menu':
              await sock.sendMessage(jid, {
                text: `✨ *Orion Bot Menu* ✨\n` +
                      `• !ping - Check latency\n` +
                      `• !invite - Get group invite\n` +
                      `• !sticker - Create sticker`
              });
              break;
          }
        }
      }
    } catch (e) {
      console.log(color('[ERROR]', 'red'), e);
    }
  }
}

module.exports = messageHandler;
