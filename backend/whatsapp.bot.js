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
import fs from 'fs';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';

const SUBSCRIBERS_FILE = './subscribers.json';

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

// Save number in local file
function saveSubscriber(number) {
  let data = [];

  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const content = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8').trim();
      data = content ? JSON.parse(content) : [];
    }
  } catch (err) {
    console.error('❌ Error reading subscribers file:', err.message);
    data = [];
  }

  if (!data.includes(number)) {
    data.push(number);
    try {
      fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(data, null, 2));
      console.log(`✅ Added new subscriber: ${number}`);
    } catch (err) {
      console.error('❌ Error writing to subscribers file:', err.message);
    }
  } else {
    console.log(`ℹ️ ${number} is already a subscriber.`);
  }
}

// Message listener
client.on('message', async (message) => {
  const content = message.body.trim().toLowerCase();
  const number = message.from.split('@')[0];

  console.log(`📨 ${number}: ${message.body}`);

  if (content.includes('subscribe') || content.includes('alert')) {
    try {
      // Use sendMessage instead of reply to avoid puppeteer error
      await client.sendMessage(message.from, '✅ You are now subscribed to WhatsApp alerts!');
    } catch (err) {
      console.error('❌ Failed to send message:', err.message);
    }

    saveSubscriber(number);
  }
});

// Start the client
client.initialize();

export default client;
