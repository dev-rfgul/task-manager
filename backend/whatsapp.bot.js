// import pkg from 'whatsapp-web.js';
// const { Client, LocalAuth } = pkg;

// import qrcode from 'qrcode-terminal';

// // Create client with session persistence
// const client = new Client({
//   authStrategy: new LocalAuth(), // Saves session to avoid scanning QR again
//   puppeteer: {
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//   },
// });

// // Show QR Code
// client.on('qr', (qr) => {
//   console.log('📱 Scan this QR code in your WhatsApp:');
//   qrcode.generate(qr, { small: true });
// });

// const number = '923236229587'
// const chatId = number + '@c.us';
// // When client is ready
// client.on('ready', () => {
//   console.log('✅ WhatsApp client is ready!');

//   // 👇 Example message after login
//   client.sendMessage(chatId, 'Hello , what should we do now?');
// });

// // Listen to incoming messages
// client.on('message', message => {
//   console.log(`📨 ${message.from}: ${message.body}`);

//   if (message.body.toLowerCase() === 'hello') {
//     message.reply(`yes sir 🏓 785 ${process.env.MODE}`);
//   }
// });

// // Initialize
// client.initialize();

// // Export the client for use in other files
// export default client;


import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import { addWhatsappSubscriber } from './controllers/user.controller.js';



// Initialize WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

// Show QR on terminal
client.on('qr', (qr) => {
  console.log('📱 Scan this QR code in your WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ WhatsApp client is ready!');
});



// Message listener
client.on('message', async (message) => {
  const content = message.body.trim().toLowerCase();
  const number = message.from.split('@')[0];
  const notifyName = message._data?.notifyName || 'Subscriber';

  const secretCodeMatch = content.match(/([a-fA-F0-9]{24})$/);
  const secretCode = secretCodeMatch ? secretCodeMatch[1] : null;

  console.log(`📨 ${number}: ${content}`);
  console.log(`🔑 Extracted Secret Code: ${secretCode}`);

  if (secretCode) {
    try {
      const user = await addWhatsappSubscriber(secretCode, number);

      // ✅ Success - user was found and updated
      await client.sendMessage(message.from, ` Welcome, ${user.name || 'Subscriber'}! \n✅ Successfully connected to WhatsApp!`);

    } catch (err) {
      // ❌ User not found or update failed
      console.error('❌ Failed to Connect:', err.message);
      await client.sendMessage(message.from, `❌ Failed to connect to WhatsApp. Please try again without changing the secret code.`);
    }
  } else {
    // No secret code in message
    await client.sendMessage(message.from, `❌ Failed to connect to WhatsApp. Please try again without changing the secret code.`);
  }
});



// Start the client
client.initialize();

export default client;
