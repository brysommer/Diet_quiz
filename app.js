const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6309511831:AAHjqHMKMGzIewjKXeVSKH9ZB1G1DH9ydR4', { polling: true }); 

const botLogic = async () => {
  let A=0;
  let B=0;
  let C=0;
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Давайте пройдемо коротенький тест')
    if (msg.text == '/start') {
      bot.sendMessage(chatId, 'Чи видалений у вас жовчний міхур?', { reply_markup:  { inline_keyboard: [
        [{ text: 'Так', callback_data: `liver` }, { text: 'Ні', callback_data: `2` }]
      ]} });
    }
  });
  bot.on("callback_query", async (query) => {
    const action = query.data;
    const chatId = query.message.chat.id;
    switch (action) {
      case 'liver':
        bot.sendMessage(chatId, 'У вас печінковий тип');
        break;
      case '2': 
        bot.sendMessage(chatId, 'Чи були у вас коли-небудь камені у нирках?', { reply_markup:  { inline_keyboard: [
          [{ text: 'Так', callback_data: `liver` }, { text: 'Ні', callback_data: `3` }]]} 
        });
        break;
      case '3': 
        bot.sendMessage(chatId, 'Не знижується вага на високобілкових дієтах (напр., дієта Аткінса)?', { reply_markup:  { inline_keyboard: [
          [{ text: 'Так', callback_data: `liver` }, { text: 'Ні', callback_data: `4` }]]} 
        });
        break;
      case '4': 
        bot.sendMessage(chatId, 'Не подобається вживати багать високобілкової їжі?', { reply_markup:  { inline_keyboard: [
          [{ text: 'Так', callback_data: `liver` }, { text: 'Ні', callback_data: `5` }]]} 
        });
        break;
      case '5': 
        bot.sendMessage(chatId, 'Не перетравлюєте жирну їжу, особливо ввечері?', { reply_markup:  { inline_keyboard: [
          [{ text: 'Так', callback_data: `liver` }, { text: 'Ні', callback_data: `6` }]]} 
        });
        break;
      case '5': 
        bot.sendMessage(chatId, 'Чи були у вас коли-небудь проблеми з печінкою?', { reply_markup:  { inline_keyboard: [
          [{ text: 'Так', callback_data: `liver` }, { text: 'Ні', callback_data: `6` }]]} 
        });
        break;
      case '6': 
        bot.sendMessage(chatId, 'Випираючий здутий живіт (пузо)?', { reply_markup:  { inline_keyboard: [
          [{ text: 'Так', callback_data: `liver` }, { text: 'Ні', callback_data: `7` }]]} 
        });
        break;
      case '7': 
        bot.sendMessage(chatId, 'Чи є у вас…', { reply_markup:  { inline_keyboard: [
          [{ text: 'жага до солодощів, хлібу чи макаронам?', callback_data: `71` }],
          [{ text: 'жага до солі або шоколад?', callback_data: `72` }],
          [{ text: 'жага до морозива, вершкового сиру, сметани чи молока?', callback_data: `73` }]
        ]} });
        break;
      case '71': 
        A++
        bot.sendMessage(chatId, 'Ви… \n А) часто буваєти пригніченими чи відчуваєте безнадійність? \n В) схильні до занепокоєння або часто Або часто стривожені або нервуєте? \n С) буваєте не в дусі, роздратовані у певний період місяця?', { reply_markup:  { inline_keyboard: [
          [{ text: 'A', callback_data: `81` }],
          [{ text: 'B', callback_data: `82` }],
          [{ text: 'C', callback_data: `83` }]
        ]} });
        break;
      case '72': 
        B++
        bot.sendMessage(chatId, 'Ви… \n А) часто буваєти пригніченими чи відчуваєте безнадійність? \n В) схильні до занепокоєння або часто Або часто стривожені або нервуєте? \n С) буваєте не в дусі, роздратовані у певний період місяця?', { reply_markup:  { inline_keyboard: [
          [{ text: 'A', callback_data: `81` }],
          [{ text: 'B', callback_data: `82` }],
          [{ text: 'C', callback_data: `83` }]
        ]} });
        break;
      case '73': 
        C++
        bot.sendMessage(chatId, 'Ви… \n А) часто буваєти пригніченими чи відчуваєте безнадійність? \n В) схильні до занепокоєння або часто Або часто стривожені або нервуєте? \n С) буваєте не в дусі, роздратовані у певний період місяця?', { reply_markup:  { inline_keyboard: [
          [{ text: 'A', callback_data: `81` }],
          [{ text: 'B', callback_data: `82` }],
          [{ text: 'C', callback_data: `83` }]
        ]} });
        break;
      case '81':
        A++
        bot.sendMessage(chatId, 'Ви… ', { reply_markup:  { inline_keyboard: [
          [{ text: 'відчуваєтесебе краще споживаючи фрукти та ягоди?', callback_data: `91` }],
          [{ text: 'потребуєте каву чи інші стимулятори, щоб прокинутися?', callback_data: `92` }],
          [{ text: 'страждаєте закрепами під час місячного?', callback_data: `93` }]
        ]} });
      case '82':
        B++;
        bot.sendMessage(chatId, 'Ви… ', { reply_markup:  { inline_keyboard: [
          [{ text: 'відчуваєтесебе краще споживаючи фрукти та ягоди?', callback_data: `91` }],
          [{ text: 'потребуєте каву чи інші стимулятори, щоб прокинутися?', callback_data: `92` }],
          [{ text: 'страждаєте закрепами під час місячного?', callback_data: `93` }]
        ]} });
      case '83':
        C++
        bot.sendMessage(chatId, 'Ви… ', { reply_markup:  { inline_keyboard: [
          [{ text: 'відчуваєтесебе краще споживаючи фрукти та ягоди?', callback_data: `91` }],
          [{ text: 'потребуєте каву чи інші стимулятори, щоб прокинутися?', callback_data: `92` }],
          [{ text: 'страждаєте закрепами під час місячного?', callback_data: `93` }]
        ]} });
        break;
      case '91':
        A++
        bot.sendMessage(chatId, 'У вас…', { reply_markup:  { inline_keyboard: [
          [{ text: 'ламкі нігті з поздовжніми борознами?', callback_data: `11` }],
          [{ text: '(для жінок) є волосся на обличчі?', callback_data: `12` }],
          [{ text: 'є біль у нижній частині спини праворуч чи ліворуч чи в області стегон?', callback_data: `13` }]
        ]} });
        break;
      case '92':
        B++
        bot.sendMessage(chatId, 'У вас…', { reply_markup:  { inline_keyboard: [
          [{ text: 'ламкі нігті з поздовжніми борознами?', callback_data: `11` }],
          [{ text: '(для жінок) є волосся на обличчі?', callback_data: `12` }],
          [{ text: 'є біль у нижній частині спини праворуч чи ліворуч чи в області стегон?', callback_data: `13` }]
        ]} });
        break;
      case '93':
        C++
        bot.sendMessage(chatId, 'У вас…', { reply_markup:  { inline_keyboard: [
          [{ text: 'ламкі нігті з поздовжніми борознами?', callback_data: `11` }],
          [{ text: '(для жінок) є волосся на обличчі?', callback_data: `12` }],
          [{ text: 'є біль у нижній частині спини праворуч чи ліворуч чи в області стегон?', callback_data: `13` }]
        ]} });
        console.log(C);
        break;
    }
  });
};

botLogic();

