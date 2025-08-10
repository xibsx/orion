const { downloadMediaMessage } = require('@whiskeysockets/baileys');

async function mediaHandler(sock, update) {
  // Handle stickers, images, videos
  if (update.type === 'image' || update.type === 'video') {
    const buffer = await downloadMediaMessage(update, 'buffer', {});
    // Process media here (e.g., save or convert)
  }
}

module.exports = mediaHandler;
