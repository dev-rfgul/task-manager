// import cron from 'node-cron';
// import pkg from 'whatsapp-web.js';
// const { Client, LocalAuth } = pkg;
// import qrcode from 'qrcode-terminal';
// import { addWhatsappSubscriber } from './controllers/user.controller.js';
// import { getTodaysTasks, getTomrrowsTasks, getUpcomingTasks, getAllTasks, sendReminderForAllUsers, productivityReport } from './whatsappBot/whatsappBot.controller.js';


// // Store registered users to track their state
// const registeredUsers = new Set();

// // Initialize Whats App client
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
//   console.log('✅ WhatsApp Client is ready!');

//   // Run every 10 seconds
//   cron.schedule('0 */1 * * *', async () => {
//     console.log('⏰ Running scheduled task...');

//     try {
//       const reminders = await sendReminderForAllUsers();
//       console.log('📋 Reminders returned:', reminders);

//       for (const reminder of reminders) {
//         const chatId = `${reminder.number}@c.us`;
//         await client.sendMessage(chatId, reminder.message);
//         console.log(`✅ Reminder sent to ${reminder.number}`);
//       }
//     } catch (err) {
//       console.error('❌ Error while sending reminders:', err);
//     }
//   });
// });

// // Function to send menu
// const sendMenu = async (chatId) => {
//   const menuText = `
// 🎯 *Welcome to Our Service Menu*

// Please select an option by sending the number:

// *0* - 📋 Show this menu again
// *1* - 📊 Today's Task
// *2* - 📞 Tomorrow's Task
// *3* - 💰 Upcoming Tasks
// *4* - 📚 Get All Tasks  
// *5* - 🔔 Productivity Report 
// *6* - 📈 View analytics
// *7* - 🛠️ Technical support
// *8* - 📝 Submit feedback
// *9* - 🚪 Social Media

// Simply reply with a number (0-9) to proceed.
//   `;

//   await client.sendMessage(chatId, menuText);
// };

// // Function to handle menu selections
// const handleMenuSelection = async (chatId, selection, userName, number) => {
//   let responseMessage = '';

//   switch (selection) {
//     case '0':
//       await sendMenu(chatId);
//       return;

//     case '1':
//       try {
//         const { todaysTasks } = await getTodaysTasks(number);

//         if (!todaysTasks || todaysTasks.length === 0) {
//           responseMessage = `❌ No tasks found for today. Please check back later or contact support if you think this is an error. Add your tasks using the app or web dashboard. www.taskai.studio`;
//         } else {
//           const todaysTaskList = todaysTasks
//             .map((task, index) => `${index + 1}. ${task.title} - Due: ${new Date(task.dueDate).toLocaleDateString()}`)
//             .join('\n');

//           responseMessage = `📊 *Today's Tasks*

// Hello ${userName}!
// ✅ *Account:* Active  
// 📱 *WhatsApp:* Connected  
// 📅 *Last Login:* ${new Date().toLocaleDateString()}

// 📝 *Your tasks for today:\n*  
// ${todaysTaskList}

// 🔗 *Visit:* 🌐 *www.taskai.studio* to add more tasks.

// 📌 Type *0* to return to the main menu.`;

//         }
//       } catch (error) {
//         console.error('Error fetching today\'s tasks:', error);
//         responseMessage = `❌ Error fetching today's tasks. Please try again later.`;
//       }
//       break;

//     case '2':
//       try {
//         const { tomorrowsTasks } = await getTomrrowsTasks(number);

//         if (!tomorrowsTasks || tomorrowsTasks.length === 0) {
//           responseMessage = `❌ No tasks found for tomorrow. Please check back later or contact support if you think this is an error.`;
//         } else {
//           const tomorrowsTaskList = tomorrowsTasks
//             .map((task, index) => `${index + 1}. ${task.title} - Due: ${new Date(task.dueDate).toLocaleDateString()}`)
//             .join('\n');
//           responseMessage = `📅 *Tomorrow's Tasks*\n\nHello ${userName}!\n\nYour tasks for tomorrow:\n${tomorrowsTaskList}🔗 *Visit:* 🌐 *www.taskai.studio* to add more tasks.

//       📌 Type *0* to return to the main menu.`;
//         }
//       } catch (error) {
//         console.error('Error fetching tomorrow\'s tasks:', error);
//         responseMessage = `❌ Error fetching tomorrow's tasks. Please try again later.`;
//       }
//       break;

//     case '3':
//       try {
//         const { upcomingTasks } = await getUpcomingTasks(number);
//         console.log('Upcoming Tasks:', upcomingTasks);

//         if (!upcomingTasks || upcomingTasks.length === 0) {
//           responseMessage = `❌ No upcoming tasks found. Please check back later or contact support if you think this is an error.`;
//         } else {
//           const upcomingTaskList = upcomingTasks
//             .map((task, index) => `${index + 1}. ${task.title} - Due: ${new Date(task.dueDate).toLocaleDateString()}`)
//             .join('\n');
//           responseMessage = `📅 *Tomorrow's Tasks*

// Hello ${userName}!

// 📝 *Your tasks for tomorrow:*  
// ${tomorrowsTaskList}\n\n
// 🔗 *Visit:* 🌐 *www.taskai.studio* to add more tasks.

// 📌 Type *0* to return to the main menu.`;
//         }
//       } catch (error) {
//         console.error('Error fetching upcoming tasks:', error);
//         responseMessage = `❌ Error fetching upcoming tasks. Please try again later.`;
//       }
//       break;

//     case '4':
//       try {
//         const { allTasks } = await getAllTasks(number);
//         console.log('All Tasks:', allTasks);
//         if (!allTasks || allTasks.length === 0) {
//           responseMessage = `❌ No tasks found. Please check back later or contact support if you think this is an error.`;
//         } else {
//           const taskList = allTasks
//             .map((task, index) => `${index + 1}. ${task.title} - Due: ${new Date(task.dueDate).toLocaleDateString()}`)
//             .join('\n');

//           responseMessage = `📚 *All Tasks*

// Hello ${userName}!

// 🗂️ *Here are all your tasks:*  
// ${taskList}

// 🔗 *Visit:* 🌐 *www.taskai.studio* to manage your tasks.

// 📌 Type *0* to return to the main menu.`;

//         }
//       } catch (error) {
//         console.error('Error fetching tutorials:', error);
//         responseMessage = `❌ Error fetching tutorials. Please try again later.`;

//       }
//       break;

//     case '5':
//       try {
//         const { report: report } = await productivityReport(number); // ✅ fixed key
//         console.log('Productivity Report:', report);
//         responseMessage = `🔔 *Productivity Report*\n\nHello ${userName},\n\n` +
//           `Total Tasks: ${report.totalTasks}\n` +
//           `Completed: ${report.completedTasks}\n` +
//           `Pending: ${report.pendingTasks}\n` +
//           `Overdue: ${report.overDueTasks}\n\n` +
//           `Completion Rate: ${report.completionRate}\n` +
//           `pending Rate: ${report.pendingRate}\n` +
//           `Overdue Rate: ${report.overDueRate}\n\n`
//       }

//       catch (error) {
//         console.error('Error fetching productivity report:', error);
//         responseMessage = `⚠️ Failed to fetch productivity data. Please try again later.`;
//       }
//       break;

//     case '6':
//       responseMessage = `📈 * Analytics Dashboard *\n\nYour Activity Summary: \n📊 Messages sent this month: 45\n📈 Response rate: 98 %\n⏱️ Average response time: 2 minutes\n📅 Most active day: Monday\n\nFor detailed analytics, visit our web dashboard.\n\nType * 0 * to return to main menu.`;
//       break;

//     case '7':
//       responseMessage = `🛠️ * Technical Support *\n\nExperiencing technical issues ?\n\n🔧 Common Solutions: \n• Restart the application\n• Check your internet connection\n• Clear browser cache\n• 💬 For advanced support: \nEmail: taskai.studio@gmail.com\n\nType * 0 * to return to main menu.`;
//       break;

//     case '8':
//       responseMessage = `📝 * Submit Feedback *\n\nWe value your opinion!\n\n⭐ Rate our service(1 - 5 stars) \n💭 Share your thoughts\n🐛 Report bugs\n💡 Suggest new features\n\nSend your feedback to: \n taskai.studio@gmail.com\n\nType * 0 * to return to main menu.`;
//       break;

//     case '9':
//       responseMessage = `🚪 *Visit Our Social Media*

// 🌐 *Stay connected with us:*  
// 📱 TikTok: https://www.tiktok.com/@taskai.studio  
// 🐦 Twitter: https://twitter.com/taskai_studio  
// 💼 LinkedIn: https://www.linkedin.com/company/taskai-studio  
// 📸 Instagram: https://www.instagram.com/taskai.studio

// ⬅️ Or type *0* to return to the main menu.`;

//       break;

//     default:
//       responseMessage = `❌ Invalid selection!\n\nPlease choose a number from 0-9.\n\nType *0* to see the menu again.`;
//       break;
//   }

//   await client.sendMessage(chatId, responseMessage);
// };

// // Message listener
// client.on('message', async (message) => {
//   // Skip if message has no body (like images, voice notes, etc.)
//   if (!message.body) {
//     return;
//   }


//   const content = message.body.trim();
//   const contentLower = content.toLowerCase();
//   const number = message.from.split('@')[0];
//   const notifyName = message._data?.notifyName || 'Subscriber';

//   console.log(`📨 ${number}: ${content}`);

//   // Check if user is registered
//   const isRegistered = registeredUsers.has(number);

//   if (!isRegistered) {
//     // Check for exact format: "subscribe: secretcode" or "subscribe:secretcode"
//     const subscribeMatch = content.match(/^secret code\s*:\s*([a-fA-F0-9]{24})$/i);

//     if (subscribeMatch) {
//       const secretCode = subscribeMatch[1];
//       console.log(`🔑 Processing subscription request with Secret Code: ${secretCode}`);

//       try {
//         const user = await addWhatsappSubscriber(secretCode, number);

//         // ✅ Success - user was found and updated
//         registeredUsers.add(number);

//         await client.sendMessage(message.from, `🎉 Welcome, ${user.name || 'Subscriber'}!\n✅ Successfully connected to WhatsApp!\n\nLet me show you what you can do:`);

//         // Send menu after successful registration
//         setTimeout(() => {
//           sendMenu(message.from);
//         }, 2000);

//       } catch (err) {
//         // ❌ User not found or update failed
//         console.error('❌ Failed to Connect:', err.message);
//         await client.sendMessage(message.from, `❌ Failed to connect to WhatsApp. Please check your secret code and try again.\n\nFormat: "subscribe: your-secret-code"`);
//       }
//     } else if (contentLower.includes('subscribe')) {
//       // Has subscribe keyword but wrong format
//       await client.sendMessage(message.from, `📝 To subscribe, please send your message in this exact format:\n\n"subscribe: your-secret-code"\n\nExample: subscribe: 507f1f77bcf86cd799439011`);
//     }
//     // If no subscribe keyword, ignore the message completely (no response)

//   } else {
//     // Handle registered user interactions
//     if (contentLower === 'confirm') {
//       // Handle logout confirmation
//       registeredUsers.delete(number);
//       await client.sendMessage(message.from, `👋 You have been successfully logged out!\n\nTo reconnect, please send "subscribe: your-secret-code" again.\n\nThank you for using our service!`);
//     } else if (content >= '0' && content <= '9' && content.length === 1) {
//       // Handle menu selection
//       await handleMenuSelection(message.from, content, notifyName, number);
//     } else if (contentLower === 'menu' || contentLower === 'help') {
//       // Show menu on request
//       await sendMenu(message.from);
//     } else {
//       // Invalid input from registered user
//       await client.sendMessage(message.from, `❓ I didn't understand that command.\n\nPlease send a number (0-9) to use the menu, or type *menu* to see all options.`);
//     }
//   }
// });

// // Start the client
// client.initialize();

// export default client;

import cron from 'node-cron';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import User from './models/user.model.js';
import { addWhatsappSubscriber, removeWhatsappSubscriber } from './controllers/user.controller.js';
import { getTodaysTasks, getTomrrowsTasks, getUpcomingTasks, getAllTasks, sendReminderForAllUsers, productivityReport } from './whatsappBot/whatsappBot.controller.js';

// Store registered users and their attempt counts
const registeredUsers = new Set();
const userAttempts = new Map(); // Track failed attempts per user
const MAX_ATTEMPTS = 3;
const BLOCK_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

// Rate limiting for message sending
const messageQueue = [];
let isProcessingQueue = false;

// Initialize WhatsApp client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  },
});

// Utility function to add random delay
const randomDelay = (min = 2000, max = 5000) => {
  return new Promise(resolve => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(resolve, delay);
  });
};

// Enhanced message sending with queue and delays
const sendMessageWithDelay = async (chatId, message, delay = null) => {
  return new Promise((resolve, reject) => {
    messageQueue.push({
      chatId,
      message,
      delay: delay || Math.random() * 3000 + 2000, // Random delay 2-5 seconds
      resolve,
      reject
    });
    processMessageQueue();
  });
};

// Process message queue to prevent spam detection
const processMessageQueue = async () => {
  if (isProcessingQueue || messageQueue.length === 0) return;

  isProcessingQueue = true;

  while (messageQueue.length > 0) {
    const { chatId, message, delay, resolve, reject } = messageQueue.shift();

    try {
      await randomDelay(delay);
      await client.sendMessage(chatId, message);
      console.log(`✅ Message sent to ${chatId.split('@')[0]} with ${Math.round(delay)}ms delay`);
      resolve();
    } catch (error) {
      console.error(`❌ Failed to send message to ${chatId}:`, error);
      reject(error);
    }
  }

  isProcessingQueue = false;
};

// Show QR on terminal
client.on('qr', (qr) => {
  console.log('📱 Scan this QR code in your WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
  console.log('✅ WhatsApp Client is ready!');

  // Auto-register users from database
  try {
    // Option 1: Use the existing function (once imported)
    // const activeUsers = await getAllActiveWhatsAppUsers();

    // Option 2: Alternative approach if you want to modify
    const activeUsers = await User.find({ whatsappNumber: { $exists: true } });

    activeUsers.forEach(user => {
      registeredUsers.add(user.whatsappNumber);
    });
    console.log(`📱 Auto-registered ${activeUsers.length} users`);
  }
  catch (error) {
    console.error('Failed to auto-register users:', error);
  }

  // Run reminders every hour with randomized sending
  cron.schedule('0 */3 * * *', async () => {
    console.log('⏰ Running scheduled task...');

    try {
      const reminders = await sendReminderForAllUsers();
      console.log(`📋 Found ${reminders.length} reminders to send`);

      // Filter reminders to only include registered users
      const filteredReminders = reminders.filter(reminder =>
        registeredUsers.has(reminder.number)
      );

      console.log(`📱 Sending to ${filteredReminders.length} registered users (filtered from ${reminders.length})`);

      // Shuffle reminders array to randomize sending order
      const shuffledReminders = filteredReminders.sort(() => Math.random() - 0.5);

      for (let i = 0; i < shuffledReminders.length; i++) {
        const reminder = shuffledReminders[i];
        const chatId = `${reminder.number}@c.us`;

        // Add randomized delay between reminders (5-15 minutes)
        const delayBetweenReminders = Math.random() * 600000 + 300000; // 5-15 minutes

        setTimeout(async () => {
          try {
            // Double check user is still registered before sending
            if (registeredUsers.has(reminder.number)) {
              await sendMessageWithDelay(chatId, reminder.message);
              console.log(`✅ Reminder sent to ${reminder.number}`);
            } else {
              console.log(`⏭️ Skipped reminder for logged out user: ${reminder.number}`);
            }
          } catch (error) {
            console.error(`❌ Failed to send reminder to ${reminder.number}:`, error);
          }
        }, i * delayBetweenReminders);
      }
    } catch (err) {
      console.error('❌ Error while processing reminders:', err);
    }
  });
});

// Enhanced menu function
const sendMenu = async (chatId) => {
  const menuText = `
🎯 *Welcome to TaskAI Studio Bot*

*What would you like to do today?*

*📋 TASKS*
*1* - 📊 Today's Tasks
*2* - 📅 Tomorrow's Tasks  
*3* - 🔮 Upcoming Tasks
*4* - 📚 All Tasks

*📊 INSIGHTS*
*5* - 📈 Productivity Report
*6* - 📊 Analytics Dashboard

*🛠️ SUPPORT*
*7* - 🆘 Technical Support
*8* - 💬 Send Feedback
*9* - 🌐 Social Media

*0* -  🔄 Show this menu again

❌ Type "LOGOUT" to disconnect your WhatsApp account.

*🎯 Simply reply with a number (0-9) to get started!*

_💡 Tip: You can type "menu" or "help" anytime to see this menu_
  `;

  await sendMessageWithDelay(chatId, menuText);
};

// Check if user is temporarily blocked
const isUserBlocked = (number) => {
  const attempts = userAttempts.get(number);
  if (!attempts) return false;

  const { count, lastAttempt } = attempts;
  const now = Date.now();

  if (count >= MAX_ATTEMPTS && (now - lastAttempt) < BLOCK_DURATION) {
    return true;
  }

  // Reset attempts if block duration has passed
  if (count >= MAX_ATTEMPTS && (now - lastAttempt) >= BLOCK_DURATION) {
    userAttempts.delete(number);
    return false;
  }

  return false;
};

// Record failed attempt
const recordFailedAttempt = (number) => {
  const attempts = userAttempts.get(number) || { count: 0, lastAttempt: 0 };
  attempts.count++;
  attempts.lastAttempt = Date.now();
  userAttempts.set(number, attempts);
};

// Get remaining attempts
const getRemainingAttempts = (number) => {
  const attempts = userAttempts.get(number);
  if (!attempts) return MAX_ATTEMPTS;
  return Math.max(0, MAX_ATTEMPTS - attempts.count);
};

// Enhanced menu selection handler
const handleMenuSelection = async (chatId, selection, userName, number) => {
  let responseMessage = '';

  try {
    switch (selection) {
      case '0':
        await sendMenu(chatId);
        return;

      case '1':
        try {
          const { todaysTasks } = await getTodaysTasks(number);

          if (!todaysTasks || todaysTasks.length === 0) {
            responseMessage = `📅 *Today's Tasks*

Hello ${userName}! 👋

🤔 No tasks scheduled for today. Enjoy your free time!

*What you can do:*
• 🌐 Visit *www.taskai.studio* to add new tasks
• 📱 Plan tomorrow's schedule
• 📊 Check your productivity report (option 5)

📌 Type *0* to return to the main menu.`;
          } else {
            const todaysTaskList = todaysTasks
              .map((task, index) => `${index + 1}. ✅ ${task.title}\n   📅 Due: ${new Date(task.dueDate).toLocaleDateString()}`)
              .join('\n\n');

            responseMessage = `📊 *Today's Tasks*

Hello ${userName}! 👋
✅ *Status:* Connected & Active  
📱 *Last Sync:* ${new Date().toLocaleString()}

📝 *Your tasks for today:*
${todaysTaskList}

🌐 *Manage Tasks:* www.taskai.studio
📌 Type *0* for main menu`;
          }
        } catch (error) {
          console.error('Error fetching today\'s tasks:', error);
          responseMessage = `❌ *Oops! Something went wrong*

Unable to fetch today's tasks right now. This might be a temporary issue.

*Please try:*
• Wait a moment and try again
• Check option *7* for technical support
• Visit www.taskai.studio directly

📌 Type *0* to return to main menu.`;
        }
        break;

      case '2':
        try {
          const { tomorrowsTasks } = await getTomrrowsTasks(number);

          if (!tomorrowsTasks || tomorrowsTasks.length === 0) {
            responseMessage = `📅 *Tomorrow's Tasks*

Hello ${userName}! 👋

🌅 Tomorrow looks free! Perfect time to plan ahead.

*Suggestions:*
• 🌐 Add tasks at *www.taskai.studio*
• 📋 Review your upcoming tasks (option 3)
• 🎯 Set new goals

📌 Type *0* to return to main menu.`;
          } else {
            const tomorrowsTaskList = tomorrowsTasks
              .map((task, index) => `${index + 1}. 📋 ${task.title}\n   📅 Due: ${new Date(task.dueDate).toLocaleDateString()}`)
              .join('\n\n');

            responseMessage = `📅 *Tomorrow's Tasks*

Hello ${userName}! 👋

🌅 *Your tasks for tomorrow:*
${tomorrowsTaskList}

🌐 *Manage Tasks:* www.taskai.studio
📌 Type *0* for main menu`;
          }
        } catch (error) {
          console.error('Error fetching tomorrow\'s tasks:', error);
          responseMessage = `❌ *Unable to load tomorrow's tasks*

Please try again in a moment or contact support.

📌 Type *0* to return to main menu.`;
        }
        break;

      case '3':
        try {
          const { upcomingTasks } = await getUpcomingTasks(number);

          if (!upcomingTasks || upcomingTasks.length === 0) {
            responseMessage = `🔮 *Upcoming Tasks*

Hello ${userName}! 👋

🎉 Your schedule looks clear ahead! Time to plan something exciting.

*Ideas:*
• 🌐 Visit *www.taskai.studio* to add future tasks
• 📊 Check your productivity report (option 5)
• 🎯 Set long-term goals

📌 Type *0* to return to main menu.`;
          } else {
            const upcomingTaskList = upcomingTasks
              .map((task, index) => `${index + 1}. 🔮 ${task.title}\n   📅 Due: ${new Date(task.dueDate).toLocaleDateString()}`)
              .join('\n\n');

            responseMessage = `🔮 *Upcoming Tasks*

Hello ${userName}! 👋

📋 *Tasks coming up:*
${upcomingTaskList}

🌐 *Manage Tasks:* www.taskai.studio
📌 Type *0* for main menu`;
          }
        } catch (error) {
          console.error('Error fetching upcoming tasks:', error);
          responseMessage = `❌ *Can't load upcoming tasks right now*

Please try again later or visit www.taskai.studio directly.

📌 Type *0* to return to main menu.`;
        }
        break;

      case '4':
        try {
          const { allTasks } = await getAllTasks(number);

          if (!allTasks || allTasks.length === 0) {
            responseMessage = `📚 *All Tasks*

Hello ${userName}! 👋

🎯 Ready to get started? You haven't added any tasks yet!

*Get Started:*
• 🌐 Visit *www.taskai.studio* to create your first task
• 📱 Set up your productivity goals
• 🔔 Enable reminders

📌 Type *0* to return to main menu.`;
          } else {
            const taskList = allTasks
              .slice(0, 10) // Limit to first 10 tasks to avoid long messages
              .map((task, index) => `${index + 1}. 📋 ${task.title}\n   📅 ${new Date(task.dueDate).toLocaleDateString()}`)
              .join('\n\n');

            const totalCount = allTasks.length;
            const showingCount = Math.min(10, totalCount);

            responseMessage = `📚 *All Tasks*

Hello ${userName}! 👋

📊 *Showing ${showingCount} of ${totalCount} tasks:*

${taskList}

${totalCount > 10 ? `\n*And ${totalCount - 10} more tasks...*` : ''}

🌐 *Full List:* www.taskai.studio
📌 Type *0* for main menu`;
          }
        } catch (error) {
          console.error('Error fetching all tasks:', error);
          responseMessage = `❌ *Unable to load your tasks*

Something went wrong while fetching your task list.

*Try:*
• Option *7* for technical support
• Visit www.taskai.studio directly

📌 Type *0* to return to main menu.`;
        }
        break;

      case '5':
        try {
          const { report } = await productivityReport(number);

          const completionPercentage = report.totalTasks > 0 ?
            Math.round((report.completedTasks / report.totalTasks) * 100) : 0;

          const getMotivationalMessage = (percentage) => {
            if (percentage >= 80) return "🏆 Outstanding! You're crushing it!";
            if (percentage >= 60) return "💪 Great progress! Keep it up!";
            if (percentage >= 40) return "📈 You're getting there! Stay focused!";
            if (percentage >= 20) return "🎯 Good start! Let's build momentum!";
            return "🚀 Every journey starts with a single step!";
          };

          responseMessage = `📈 *Your Productivity Report*

Hello ${userName}! 👋

📊 *Task Overview:*
• 📝 Total Tasks: ${report.totalTasks}
• ✅ Completed: ${report.completedTasks}
• ⏳ Pending: ${report.pendingTasks}
• ⚠️ Overdue: ${report.overDueTasks}

📈 *Performance:*
• 🎯 Completion Rate: ${completionPercentage}%
• ⏳ Pending Rate: ${report.pendingRate}
• ⚠️ Overdue Rate: ${report.overDueRate}

${getMotivationalMessage(completionPercentage)}

🌐 *Detailed Analytics:* www.taskai.studio
📌 Type *0* for main menu`;

        } catch (error) {
          console.error('Error fetching productivity report:', error);
          responseMessage = `❌ *Report Temporarily Unavailable*

We're having trouble generating your productivity report right now.

*Alternative:*
• Try again in a few minutes
• Visit www.taskai.studio for full analytics
• Contact support (option 7)

📌 Type *0* to return to main menu.`;
        }
        break;

      case '6':
        responseMessage = `📊 *Analytics Dashboard*

Hello ${userName}! 👋

📈 *Quick Stats:*
• 📱 WhatsApp: Connected & Active
• ⚡ Response Time: Instant
• 🔔 Notifications: Enabled
• 📅 Active Since: ${new Date().toLocaleDateString()}

*🌐 For detailed analytics visit:*
www.taskai.studio

*Features Available:*
• 📊 Performance graphs
• 📅 Daily/weekly/monthly views
• 🎯 Goal tracking
• 📈 Progress trends

📌 Type *0* for main menu`;
        break;

      case '7':
        responseMessage = `🆘 *Technical Support*

Hello ${userName}! 👋

*🔧 Quick Solutions:*
• 🔄 Try typing *menu* to refresh
• 📱 Check your WhatsApp connection
• ⏰ Wait a moment and try again

*💬 Need More Help?*
📧 Email: taskai.studio@gmail.com
🌐 Web: www.taskai.studio
📱 WhatsApp: Available 24/7

*📋 When contacting support, please include:*
• Your issue description
• What you were trying to do
• Any error messages

📌 Type *0* for main menu`;
        break;

      case '8':
        responseMessage = `💬 *We Value Your Feedback!*

Hello ${userName}! 👋

*⭐ How are we doing?*
Your opinion helps us improve!

*📝 Share Your Thoughts:*
• ⭐ Rate our service (1-5 stars)
• 💡 Suggest new features
• 🐛 Report any bugs
• 💭 General feedback

*📧 Send feedback to:*
taskai.studio@gmail.com

*🌐 Or use our website:*
www.taskai.studio/feedback

Thank you for helping us grow! 🙏

📌 Type *0* for main menu`;
        break;

      case '9':
        responseMessage = `🌐 *Connect With Us!*

Hello ${userName}! 👋

*📱 Follow TaskAI Studio:*

🎵 *TikTok:* https://www.tiktok.com/@taskai.studio
📘 *LinkedIn:* https://www.linkedin.com/company/taskai-studio
🐦 *Twitter:* https://twitter.com/taskai_studio
📸 *Instagram:* https://www.instagram.com/taskai.studio

*🌟 Join our community for:*
• 📚 Productivity tips
• 🚀 New feature announcements
• 💡 Success stories
• 🎯 Motivation & inspiration

📌 Type *0* for main menu`;
        break;

      default:
        responseMessage = `❓ *Invalid Selection*

Hello ${userName}! 👋

Please choose a number from *0-9* to continue.

*💡 Quick Help:*
• Type *0* to see the menu
• Type *menu* or *help* anytime

📌 Let's try again! What would you like to do?`;
        break;
    }

    await sendMessageWithDelay(chatId, responseMessage);

  } catch (error) {
    console.error('Error in handleMenuSelection:', error);
    await sendMessageWithDelay(chatId, `❌ *Something went wrong*

Please try again or contact support if the issue persists.

📌 Type *0* to return to main menu.`);
  }
};

// Message listener with enhanced error handling
client.on('message', async (message) => {
  // Skip if message has no body
  if (!message.body) return;

  const content = message.body.trim();
  const contentLower = content.toLowerCase();
  const number = message.from.split('@')[0];
  const notifyName = message._data?.notifyName || 'Friend';

  console.log(`📨 ${number}: ${content}`);

  // Check if user is temporarily blocked
  if (isUserBlocked(number)) {
    const attempts = userAttempts.get(number);
    const timeLeft = Math.ceil((BLOCK_DURATION - (Date.now() - attempts.lastAttempt)) / 60000);

    await sendMessageWithDelay(message.from,
      `🚫 *Too Many Failed Attempts*\n\nPlease wait ${timeLeft} minutes before trying again.\n\n💡 *Need help?* Contact support at taskai.studio@gmail.com`
    );
    return;
  }

  const isRegistered = registeredUsers.has(number);

  if (!isRegistered) {
    // Check if message starts with "secret code:" - exact format required
    if (content.toLowerCase().startsWith('secret code:')) {
      const subscribeMatch = content.match(/^secret\s*code\s*:\s*([a-fA-F0-9]{24})$/i);

      if (subscribeMatch) {
        // ... keep existing code for valid secret code
        const secretCode = subscribeMatch[1];
        console.log(`🔑 Processing subscription with Secret Code: ${secretCode}`);

        try {
          const user = await addWhatsappSubscriber(secretCode, number);

          // Success - clear any failed attempts
          userAttempts.delete(number);
          registeredUsers.add(number);

          await sendMessageWithDelay(message.from,
            `🎉 *Welcome to TaskAI Studio!*\n\nHello ${user.name || 'Friend'}! 👋\n\n✅ Successfully connected to WhatsApp!\n🔔 You'll now receive task reminders\n📱 Access all features through this chat\n\n*Let me show you what you can do...*`
          );

          // Send menu after a brief delay
          setTimeout(async () => {
            await sendMenu(message.from);
          }, 3000);

        } catch (err) {
          console.error('❌ Subscription failed:', err.message);
          recordFailedAttempt(number);
          const remaining = getRemainingAttempts(number);

          let errorMsg = `❌ *Connection Failed*\n\n`;

          if (err.message.includes('not found') || err.message.includes('invalid')) {
            errorMsg += `🔑 Invalid secret code. Please check and try again.\n\n`;
          } else {
            errorMsg += `⚠️ Unable to connect right now. Please try again.\n\n`;
          }

          errorMsg += `*Format:* secret code: your-24-digit-code\n`;
          errorMsg += `*Example:* secret code: 507f1f77bcf86cd799439011\n\n`;

          if (remaining > 0) {
            errorMsg += `⏳ ${remaining} attempts remaining`;
          } else {
            errorMsg += `🚫 No more attempts. Please wait 10 minutes.`;
          }

          await sendMessageWithDelay(message.from, errorMsg);
        }
      } else {
        // Secret code format is altered
        await sendMessageWithDelay(message.from, `🔑 *Secret code altered, try again*`);
      }
    }
    // Bot will NOT respond to any other messages from unregistered users
  }
  else {
    // Handle registered user interactions
    if (contentLower === 'logout' || contentLower === 'disconnect') {
      await sendMessageWithDelay(message.from,
        `🚪 *Logout Confirmation*\n\nAre you sure you want to disconnect from TaskAI Studio?\n\n• You'll stop receiving reminders\n• You'll need your secret code to reconnect\n\nType *confirm* to logout or *0* to return to menu.`
      );
    } else if (contentLower === 'confirm') {
      removeWhatsappSubscriber(number);
      await sendMessageWithDelay(message.from,
        `👋 *Successfully Logged Out*\n\nThank you for using TaskAI Studio!\n\n*To reconnect anytime:*\nsecret code: your-24-digit-code\n\n*Stay productive!* 🎯\nwww.taskai.studio`
      );
    } else if (content >= '0' && content <= '9' && content.length === 1) {
      await handleMenuSelection(message.from, content, notifyName, number);
    } else if (contentLower === 'menu' || contentLower === 'help' || contentLower === 'start') {
      await sendMenu(message.from);
    } else {
      // Enhanced help for invalid input
      await sendMessageWithDelay(message.from,
        `❓ *I didn't understand that*\n\nHere's what you can do:\n\n*📋 Quick Options:*\n• Type *0-9* to use the menu\n• Type *menu* to see all options\n• Type *help* for assistance\n\n*💡 Popular commands:*\n• *1* - Today's tasks\n• *5* - Productivity report\n• *0* - Main menu`
      );
    }
  }
});

// Enhanced error handling
client.on('disconnected', (reason) => {
  console.log('🔌 Client was disconnected:', reason);
});

client.on('auth_failure', (msg) => {
  console.error('❌ Authentication failure:', msg);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🛑 Shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

// Start the client
client.initialize();

export default client;