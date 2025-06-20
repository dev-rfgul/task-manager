

// import pkg from 'whatsapp-web.js';
// const { Client, LocalAuth } = pkg;
// import qrcode from 'qrcode-terminal';
// import { addWhatsappSubscriber } from './controllers/user.controller.js';



// // Initialize WhatsApp client
// const client = new Client({
//   authStrategy: new LocalAuth(),
//   puppeteer: {
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//   },
// });

// // Show QR on terminal
// client.on('qr', (qr) => {
//   console.log('📱 Scan this QR code in your WhatsApp:');
//   qrcode.generate(qr, { small: true });
// });

// client.on('ready', () => {
//   console.log('✅ WhatsApp client is ready!');
// });



// // Message listener
// client.on('message', async (message) => {
//   const content = message.body.trim().toLowerCase();
//   const number = message.from.split('@')[0];
//   const notifyName = message._data?.notifyName || 'Subscriber';

//   const secretCodeMatch = content.match(/([a-fA-F0-9]{24})$/);
//   const secretCode = secretCodeMatch ? secretCodeMatch[1] : null;

//   console.log(`📨 ${number}: ${content}`);
//   console.log(`🔑 Extracted Secret Code: ${secretCode}`);

//   if (secretCode) {
//     try {
//       const user = await addWhatsappSubscriber(secretCode, number);

//       // ✅ Success - user was found and updated
//       await client.sendMessage(message.from, ` Welcome, ${user.name || 'Subscriber'}! \n✅ Successfully connected to WhatsApp!`);

//     } catch (err) {
//       // ❌ User not found or update failed
//       console.error('❌ Failed to Connect:', err.message);
//       await client.sendMessage(message.from, `❌ Failed to connect to WhatsApp. Please try again without changing the secret code.`);
//     }
//   } else {
//     // No secret code in message
//     await client.sendMessage(message.from, `❌ Failed to connect to WhatsApp. Please try again without changing the secret code.`);
//   }
// });



// // Start the client
// client.initialize();

// export default client;



import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import { addWhatsappSubscriber } from './controllers/user.controller.js';
import { getTodaysTasks } from './whatsappBot/whatsappBot.controller.js';

// Store registered users to track their state
const registeredUsers = new Set();

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

// Function to send menu
const sendMenu = async (chatId) => {
  const menuText = `
🎯 *Welcome to Our Service Menu*

Please select an option by sending the number:

*0* - 📋 Show this menu again
*1* - 📊 Today's Task
*2* - 📞 Tomorrow's Task
*3* - 💰 Upcoming Tasks
*4* - 📚 View tutorials
*5* - 🔔 Notification settings
*6* - 📈 View analytics
*7* - 🛠️ Technical support
*8* - 📝 Submit feedback
*9* - 🚪 Logout/Disconnect

Simply reply with a number (0-9) to proceed.
  `;

  await client.sendMessage(chatId, menuText);
};

// Function to handle menu selections
const handleMenuSelection = async (chatId, selection, userName, number) => {
  let responseMessage = '';

  switch (selection) {
    case '0':
      await sendMenu(chatId);
      return;

case '1':
  const { tasks } = await getTodaysTasks(number);

  if (!tasks || tasks.length === 0) {
    responseMessage = `❌ No tasks found for today. Please check back later or contact support if you think this is an error.`;
    await client.sendMessage(chatId, responseMessage);
    return;
  }

  const taskList = tasks
    .map((task, index) => `${index + 1}. ${task.title} - Due: ${new Date(task.dueDate).toLocaleDateString()}`)
    .join('\n');

  responseMessage = `📊 *Account Status*\n\nHello ${userName}!\n✅ Account: Active\n📱 WhatsApp: Connected\n📅 Last Login: ${new Date().toLocaleDateString()}\n\nYour tasks for today:\n${taskList}\n\nType *0* to return to main menu.`;

  await client.sendMessage(chatId, responseMessage);
  break;

    case '2':
      responseMessage = `📞 *Contact Support*\n\nOur support team is here to help!\n\n📧 Email: support@example.com\n📱 Phone: +1-800-123-4567\n⏰ Hours: 9 AM - 6 PM (Mon-Fri)\n\nType *0* to return to main menu.`;
      break;

    case '3':
      responseMessage = `💰 *Pricing Plans*\n\n🆓 *Basic Plan* - Free\n• 100 messages/month\n• Basic support\n\n⭐ *Premium Plan* - $9.99/month\n• Unlimited messages\n• Priority support\n• Advanced features\n\n💎 *Enterprise Plan* - $29.99/month\n• Everything in Premium\n• Custom integrations\n• Dedicated support\n\nType *0* to return to main menu.`;
      break;

    case '4':
      responseMessage = `📚 *Tutorials*\n\nHere are some helpful resources:\n\n🎥 Getting Started Guide\n📖 User Manual\n💡 Tips & Tricks\n🔧 Advanced Features\n\n📱 Visit our website for video tutorials!\n\nType *0* to return to main menu.`;
      break;

    case '5':
      responseMessage = `🔔 *Notification Settings*\n\nCurrent Settings:\n✅ Daily updates: ON\n✅ Security alerts: ON\n❌ Marketing messages: OFF\n✅ System notifications: ON\n\nTo modify settings, please visit our web portal or contact support.\n\nType *0* to return to main menu.`;
      break;

    case '6':
      responseMessage = `📈 *Analytics Dashboard*\n\nYour Activity Summary:\n📊 Messages sent this month: 45\n📈 Response rate: 98%\n⏱️ Average response time: 2 minutes\n📅 Most active day: Monday\n\nFor detailed analytics, visit our web dashboard.\n\nType *0* to return to main menu.`;
      break;

    case '7':
      responseMessage = `🛠️ *Technical Support*\n\nExperiencing technical issues?\n\n🔧 Common Solutions:\n• Restart the application\n• Check your internet connection\n• Clear browser cache\n• Update to latest version\n\n💬 For advanced support:\nEmail: tech@example.com\n\nType *0* to return to main menu.`;
      break;

    case '8':
      responseMessage = `📝 *Submit Feedback*\n\nWe value your opinion!\n\n⭐ Rate our service (1-5 stars)\n💭 Share your thoughts\n🐛 Report bugs\n💡 Suggest new features\n\nSend your feedback to:\nfeedback@example.com\n\nType *0* to return to main menu.`;
      break;

    case '9':
      responseMessage = `🚪 *Logout/Disconnect*\n\nAre you sure you want to disconnect?\n\n⚠️ You'll need to re-register with your secret code to access the menu again.\n\nSend *CONFIRM* to logout or *0* to return to main menu.`;
      break;

    default:
      responseMessage = `❌ Invalid selection!\n\nPlease choose a number from 0-9.\n\nType *0* to see the menu again.`;
      break;
  }

  await client.sendMessage(chatId, responseMessage);
};

// Message listener
client.on('message', async (message) => {
  // Skip if message has no body (like images, voice notes, etc.)
  // console.log('Received message:', message);
  if (!message.body) {
    return;
  }

  const content = message.body.trim();
  const contentLower = content.toLowerCase();
  const number = message.from.split('@')[0];
  const notifyName = message._data?.notifyName || 'Subscriber';

  console.log(`📨 ${number}: ${content}`);

  // Check if user is registered
  const isRegistered = registeredUsers.has(number);

  if (!isRegistered) {
    // Only respond if message contains subscribe keywords AND a secret code
    const hasSubscribeKeyword = contentLower.includes('subscribe') ||
      contentLower.includes('register') ||
      contentLower.includes('connect') ||
      contentLower.includes('join');

    const secretCodeMatch = content.match(/([a-fA-F0-9]{24})/);
    const secretCode = secretCodeMatch ? secretCodeMatch[1] : null;

    // Only process if both subscribe keyword and secret code are present
    if (hasSubscribeKeyword && secretCode) {
      console.log(`🔑 Processing subscription request with Secret Code: ${secretCode}`);

      try {
        const user = await addWhatsappSubscriber(secretCode, number);

        // ✅ Success - user was found and updated
        registeredUsers.add(number);

        await client.sendMessage(message.from, `🎉 Welcome, ${user.name || 'Subscriber'}!\n✅ Successfully connected to WhatsApp!\n\nLet me show you what you can do:`);

        // Send menu after successful registration
        setTimeout(() => {
          sendMenu(message.from);
        }, 1000);

      } catch (err) {
        // ❌ User not found or update failed
        console.error('❌ Failed to Connect:', err.message);
        await client.sendMessage(message.from, `❌ Failed to connect to WhatsApp. Please check your secret code and try again.\n\nFormat: "subscribe [your-secret-code]"`);
      }
    } else if (hasSubscribeKeyword && !secretCode) {
      // Has subscribe keyword but no valid secret code
      await client.sendMessage(message.from, `📝 To subscribe, please send your message in this format:\n\n"subscribe [your-secret-code]"\n\nExample: subscribe 507f1f77bcf86cd799439011`);
    }
    // If no subscribe keyword, ignore the message completely (no response)

  } else {
    // Handle registered user interactions
    if (contentLower === 'confirm' && content !== '0') {
      // Handle logout confirmation
      registeredUsers.delete(number);
      await client.sendMessage(message.from, `👋 You have been successfully logged out!\n\nTo reconnect, please send "subscribe [your-secret-code]" again.\n\nThank you for using our service!`);
    } else if (content >= '0' && content <= '9' && content.length === 1) {
      // Handle menu selection
      await handleMenuSelection(message.from, content, notifyName, number);
    } else if (contentLower === 'menu' || contentLower === 'help') {
      // Show menu on request
      await sendMenu(message.from);
    } else {
      // Invalid input from registered user
      await client.sendMessage(message.from, `❓ I didn't understand that command.\n\nPlease send a number (0-9) to use the menu, or type *menu* to see all options.`);
    }
  }
});

// Start the client
client.initialize();

export default client;