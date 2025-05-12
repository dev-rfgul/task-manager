  import pkg from 'whatsapp-web.js';
  const { Client, LocalAuth } = pkg;

  import qrcode from 'qrcode-terminal';

  // Create client with session persistence
  const client = new Client({
    authStrategy: new LocalAuth(), // Saves session to avoid scanning QR again
  });

  // Show QR Code
  client.on('qr', (qr) => {
    console.log('📱 Scan this QR code in your WhatsApp:');
    qrcode.generate(qr, { small: true });
  });

  const number= '923236229587'
  const chatId = number + '@c.us';
  // When client is ready
  client.on('ready', () => {
    console.log('✅ WhatsApp client is ready!');
    
    // 👇 Example message after login
    client.sendMessage(chatId, 'Hello , what should we do now?');
  });

  // Listen to incoming messages
  client.on('message', message => {
    console.log(`📨 ${message.from}: ${message.body}`);

    if (message.body.toLowerCase() === 'hello') {
      message.reply('yes sir 🏓');
    }
  });

  // Initialize
  client.initialize();

  // Export the client for use in other files
  export default client;
