const { useMultiFileAuthState, makeWASocket, delay } = require('@whiskeysockets/baileys');
const messageHandler = require('./handlers/messages');
const groupHandler = require('./handlers/groups');
const mediaHandler = require('./handlers/media');
const { color } = require('./utils');

class OrionBot {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this.sessionPath = `./sessions/orion-${sessionId}`;
    this.sock = null;
  }

  async start() {
    console.log(color("[ORION]", "yellow"), "Booting up...");
    const { state, saveCreds } = await useMultiFileAuthState(this.sessionPath);

    this.sock = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      mobile: true,
      browser: ['Orion', 'Chrome', '121.0'],
      logger: { level: 'silent' }
    });

    // Event Handlers
    this.sock.ev.on('connection.update', (update) => {
      if (update.connection === 'open') 
        console.log(color("[ORION]", "green"), "Connected to WhatsApp!");
    });

    this.sock.ev.on('creds.update', saveCreds);
    this.sock.ev.on('messages.upsert', m => messageHandler(this.sock, m));
    this.sock.ev.on('group-participants.update', groupHandler);
    this.sock.ev.on('messages.media-update', mediaHandler);
  }

  async sendMessage(jid, content) {
    await this.sock.sendMessage(jid, content);
  }
}

module.exports = OrionBot;
