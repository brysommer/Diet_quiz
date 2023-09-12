const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6309511831:AAHjqHMKMGzIewjKXeVSKH9ZB1G1DH9ydR4', { polling: true });
const fs = require('fs'); 

const questions = {
  first: `Чи є   у вас…\n\n
    А) жага до солодощів, хлібу чи макаронам?\n\n
    В) жага до солі (кренделі, сирні палички чи солоний арахіс) або шоколад?\n\n
    С) жага до смажених у фрітюрі продуктам чи картопляним чіпсам?\n\n
    D) жага до морозива, вершкового сиру, сметани чи молока?`,
  second: `Ви… \n\n 
    А) часто буваєти пригніченими чи відчуваєте безнадійність?\n\n
    В) схильні до занепокоєння або часто Або часто стривожені або нервуєте?\n\n
    С) буваєте роздратовані, не в дусі, бурчите зранку?\n\n
    D) буваєте не в дусі, роздратовані у певний період місяця?`,
  third: `Ви… \n\n 
    А) відчуваєтесебе краще споживаючи ірукти та ягоди?\n\n
    В) потребуєте каву чи інші стимулятори, щоб прокинутися?\n\n
    С) відчуваєте відчуття стиснення праворуч у нижній частині живота або праворуч у грудній клітині?\n\n
    D) страждаєте закрепами під час місячного?`,
  fourth: `У вас…\n\n 
    А) ламкі нігті з поздовжніми борознами?\n\n
    В) (для жінок) є волосся на обличчі?\n\n
    С) є біль/дискомфорт в області правого плеча?\n\n
    D) є біль у нижній частині спини праворуч чи ліворуч чи в області стегон?`,
  fifth: `У вас…\n\n 
    А) зайва вага розподілена більш-менш равномірно?\n\n
    В) обвислий живіт? \n\n
    С) випираючий живіт (пузо)?\n\n
    D) є зайвий жир в області тазу, стегон (”сполучні сумки“) та внизу живота?`,
  sixth: `У вас…\n\n 
    А) суха шкіра, особливо на кистях рук та ліктях?\n\n
    В) опухлі кісточки - залищаються сліди від шкарпеток? \n\n
    С) шкіра, що лущиться чи лупа на бровах та на голові?\n\n
    D) випадає волосся під час місячного?`,
  seventh: `У вас…\n\n 
    А) поглиблення з обох сторін язика там, де він торкається зубів?\n\n
    В) атрофія (зменшення) м‘язів стегон та вам важко підійматися зі стілця? \n\n
    С) темно-жовта сеча?\n\n
    D) бувають приливи?`,
  eighth: `У вас…\n\n 
    А) випадає волосся на зовнішній третині бровей?\n\n
    В) паморочиться голова, коли підіймаєтеся дуже швидко? \n\n
    С) гарячі чи набряклі ступні?\n\n
    D) буває затьмареність свідомості під час місячного?`,
  ninth: `У вас…\n\n 
    А) мерзнуть ноги і доводиться спати у шкарпетках?\n\n
    В) є хронічні запалення? \n\n
    С) бувають головні болі чи важкість у голові зранку?\n\n
    D) обільне місячне?`,
  tenth: `У вас…\n\n 
    А) набряклі очі?\n\n
    В) є відчуття, що вам не вистачає повітря при підйомі сходами? \n\n
    С) є проблеми зі шкірою (псоріаз, екзема, коричневі плями) ?\n\n
    D) низький статевий потяг?`,
  eleventh: `У вас…\n\n 
    А) дуже сильно обвисає шкіра на руках?\n\n
    В) є сіпання під чи над віком? \n\n
    С) сова та відчуваєте себе бадьоріше ввечері ?\n\n
    D) набираєте вагу за тиждень до місячного?`,
  twelfth: `У вас…\n\n 
    А) сухе волосся та випадає волосся?\n\n
    В) прокидаєтеся у 2 або 3 години ночі? \n\n
    С) є  глибока складка у центрі язика та/чи білий наліт на язику?\n\n
    D) верхня частина тіла більш худа, ніж нижня?`,
  thirteenth: `У вас…\n\n 
    А) не тримається завивка?\n\n
    В) інкола ночами зводить гомілки? \n\n
    С) свербіж підсилюється вночі?\n\n
    D) затримка рідини в певні періоди місяця?`,
  fourteenth: `У вас…\n\n 
    А) буває надмірна втома раннім вечором (о пів на восьму), а рано вранці відчуваєте себе бадьоріше?\n\n
    В) сечовий міхур вночі активніший, ніж вдень? \n\n
    С) білки очей мають жовтуватий відтінок?\n\n
    D) у минулому були кісти яєчників чи молочних залоз?`,
  fifteenth: `У вас…\n\n 
    А) не вистачає життєвих сил (ви важкі на підйом)?\n\n
    В) є відкладення кальцію чи проблеми з кальцієм-бурсит, тендиніт, камені у нирках,, п‘яткові шпори, ранні катаракти? \n\n
    С) дуже псується настрій, якщо пропустити прийом їжі?\n\n
    D) є труднощі зі зниженням ваги після вагітності?`,
  sixteenth: `Ви…\n\n 
    А) у минулому ви були на низькокалорійних дієтах?\n\n
    В) погано переностите стрес, легко дратуєтеся за заводитеся? \n\n
    С) відчуваєте дискомфорт чи біль у правому плечі та праворуч у шиї?\n\n
    D) Відчуваєте біль в одному коліні, котра підсилюється під час місячного?`,

};

const keyboard = (questionsNumber) => {
  const keys = [
    { text: '✨ A ✨', callback_data: questionsNumber * 10 + 11 },
    { text: '✨ B ✨', callback_data: questionsNumber * 10 + 12 },
    { text: '✨ C ✨', callback_data: questionsNumber * 10 + 13 },
    { text: '✨ D ✨', callback_data: questionsNumber *10 + 14 }
  ];
  return keys;
};

const result = (A, B, C, D, chatId) => {
  const number = Math.max(A,B,C,D);
  let path;
  let name;
  switch (number) {
    case A:
      path = `${__dirname}/thyroid.pdf`;
      name = '"Щитоподібний"';
      break;
    case B:
      path = `${__dirname}/kidney.pdf`;
      name = '"Наднирковий"';
      break;
    case C:
      path = `${__dirname}/liver.pdf`;
      name = '"Печінковий"';
      break;
    case D:
      path = `${__dirname}/D.pdf`;
      name = '"Яєчниковий"';
  }
  bot.sendDocument(chatId, fs.createReadStream(path), { caption: `Ваш основний тип статури: ${name}` })
  .then(() => {
      console.log('Файл відправлено успішно');
  })
  .catch((error) => {
      console.error('Помилка відправки файлу:', error);
  });
}


const botLogic = async () => {
  bot.setMyCommands([
    {command: '/start', description: 'Пройти тест ще раз'},
  ]);

  let A=0;
  let B=0;
  let C=0;
  let D=0;
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
    console.log(action);
    console.log(`A= ${A}, B= ${B}, C= ${C}, D= ${D}`);
    const chatId = query.message.chat.id;
    switch (action) {
      case 'liver':
        bot.sendDocument(chatId, fs.createReadStream(`${__dirname}/liver.pdf`), { caption: `Ваш основний тип статури: "Печінковий"` })
        .then(() => {
            console.log('Файл відправлено успішно');
        })
        .catch((error) => {
            console.error('Помилка відправки файлу:', error);
        });
      
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
        bot.sendMessage(chatId, questions.first , { reply_markup:  { inline_keyboard: [keyboard(6)]} });
        break;
      case '71': 
        A++
        bot.sendMessage(chatId, questions.second , { reply_markup:  { inline_keyboard: [keyboard(7)]} });
        break;
      case '72': 
        B++
        bot.sendMessage(chatId, questions.second , { reply_markup:  { inline_keyboard: [keyboard(7)]} });
        break;
      case '73': 
        C++
        bot.sendMessage(chatId, questions.second , { reply_markup:  { inline_keyboard: [keyboard(7)]} });
        break;
      case '74': 
        D++
        bot.sendMessage(chatId, questions.second , { reply_markup:  { inline_keyboard: [keyboard(7)]} });
        break;
      case '81':
        A++
        bot.sendMessage(chatId, questions.third, { reply_markup:  { inline_keyboard: [keyboard(8)]} });
        break;
      case '82':
        B++;
        bot.sendMessage(chatId, questions.third, { reply_markup:  { inline_keyboard: [keyboard(8)]} });
        break;
      case '83':
        C++
        bot.sendMessage(chatId, questions.third, { reply_markup:  { inline_keyboard: [keyboard(8)]} });
        break;
      case '84':
        D++
        bot.sendMessage(chatId, questions.third, { reply_markup:  { inline_keyboard: [keyboard(8)]} });
        break;
      case '91':
        A++
        bot.sendMessage(chatId, questions.fourth, { reply_markup:  { inline_keyboard: [keyboard(9)]} });
        break;
      case '92':
        B++
        bot.sendMessage(chatId, questions.fourth, { reply_markup:  { inline_keyboard: [keyboard(9)]} });
        break;
      case '93':
        C++
        bot.sendMessage(chatId, questions.fourth, { reply_markup:  { inline_keyboard: [keyboard(9)]} });
        break;
      case '94':
        D++
        bot.sendMessage(chatId, questions.fourth, { reply_markup:  { inline_keyboard: [keyboard(9)]} });
        break;
      case '101':
        A++
        bot.sendMessage(chatId, questions.fifth, { reply_markup:  { inline_keyboard: [keyboard(10)]} });
        break;
      case '102':
        B++
        bot.sendMessage(chatId, questions.fifth, { reply_markup:  { inline_keyboard: [keyboard(10)]} });
        break;
      case '103':
        C++
        bot.sendMessage(chatId, questions.fifth, { reply_markup:  { inline_keyboard: [keyboard(10)]} });
        break;
      case '104':
        D++
        bot.sendMessage(chatId, questions.fifth, { reply_markup:  { inline_keyboard: [keyboard(10)]} });
        break;
      case '111':
        A++
        bot.sendMessage(chatId, questions.sixth, { reply_markup:  { inline_keyboard: [keyboard(11)]} });
        break;
      case '112':
        B++
        bot.sendMessage(chatId, questions.sixth, { reply_markup:  { inline_keyboard: [keyboard(11)]} });
        break;
      case '113':
        C++
        bot.sendMessage(chatId, questions.sixth, { reply_markup:  { inline_keyboard: [keyboard(11)]} });
        break;
      case '114':
        D++
        bot.sendMessage(chatId, questions.sixth, { reply_markup:  { inline_keyboard: [keyboard(11)]} });
        break;
      case '121':
        A++
        bot.sendMessage(chatId, questions.seventh, { reply_markup:  { inline_keyboard: [keyboard(12)]} });
        break;
      case '122':
        B++
        bot.sendMessage(chatId, questions.seventh, { reply_markup:  { inline_keyboard: [keyboard(12)]} });
        break;
      case '123':
        C++
        bot.sendMessage(chatId, questions.seventh, { reply_markup:  { inline_keyboard: [keyboard(12)]} });
        break;
      case '124':
        D++
        bot.sendMessage(chatId, questions.seventh, { reply_markup:  { inline_keyboard: [keyboard(12)]} });
        break;
      case '131':
        A++
        bot.sendMessage(chatId, questions.eighth, { reply_markup:  { inline_keyboard: [keyboard(13)]} });
        break;
      case '132':
        B++
        bot.sendMessage(chatId, questions.eighth, { reply_markup:  { inline_keyboard: [keyboard(13)]} });
        break;
      case '133':
        C++
        bot.sendMessage(chatId, questions.eighth, { reply_markup:  { inline_keyboard: [keyboard(13)]} });
        break;
      case '134':
        D++
        bot.sendMessage(chatId, questions.eighth, { reply_markup:  { inline_keyboard: [keyboard(13)]} });
        break;
      case '141':
        A++
        bot.sendMessage(chatId, questions.ninth, { reply_markup:  { inline_keyboard: [keyboard(14)]} });
        break;
      case '142':
        B++
        bot.sendMessage(chatId, questions.ninth, { reply_markup:  { inline_keyboard: [keyboard(14)]} });
        break;
      case '143':
        C++
        bot.sendMessage(chatId, questions.ninth, { reply_markup:  { inline_keyboard: [keyboard(14)]} });
        break;
      case '144':
        D++
        bot.sendMessage(chatId, questions.ninth, { reply_markup:  { inline_keyboard: [keyboard(15)]} });
        break;
      case '151':
        A++
        bot.sendMessage(chatId, questions.tenth, { reply_markup:  { inline_keyboard: [keyboard(15)]} });
        break;
      case '152':
        B++
        bot.sendMessage(chatId, questions.tenth, { reply_markup:  { inline_keyboard: [keyboard(15)]} });
        break;
      case '153':
        C++
        bot.sendMessage(chatId, questions.tenth, { reply_markup:  { inline_keyboard: [keyboard(15)]} });
        break;
      case '154':
        D++
        bot.sendMessage(chatId, questions.tenth, { reply_markup:  { inline_keyboard: [keyboard(15)]} });
        break;
      case '161':
        A++
        bot.sendMessage(chatId, questions.eleventh, { reply_markup:  { inline_keyboard: [keyboard(16)]} });
        break;
      case '162':
        B++
        bot.sendMessage(chatId, questions.eleventh, { reply_markup:  { inline_keyboard: [keyboard(16)]} });
        break;
      case '163':
        C++
        bot.sendMessage(chatId, questions.eleventh, { reply_markup:  { inline_keyboard: [keyboard(16)]} });
        break;
      case '164':
        D++
        bot.sendMessage(chatId, questions.eleventh, { reply_markup:  { inline_keyboard: [keyboard(16)]} });
        break;
      case '171':
        A++
        bot.sendMessage(chatId, questions.twelfth, { reply_markup:  { inline_keyboard: [keyboard(17)]} });
        break;
      case '172':
        B++
        bot.sendMessage(chatId, questions.twelfth, { reply_markup:  { inline_keyboard: [keyboard(17)]} });
        break;
      case '173':
        C++
        bot.sendMessage(chatId, questions.twelfth, { reply_markup:  { inline_keyboard: [keyboard(17)]} });
        break;
      case '174':
        D++
        bot.sendMessage(chatId, questions.twelfth, { reply_markup:  { inline_keyboard: [keyboard(17)]} });
        break;
      case '181':
        A++
        bot.sendMessage(chatId, questions.thirteenth, { reply_markup:  { inline_keyboard: [keyboard(18)]} });
        break;
      case '182':
        B++
        bot.sendMessage(chatId, questions.thirteenth, { reply_markup:  { inline_keyboard: [keyboard(18)]} });
        break;
      case '183':
        C++
        bot.sendMessage(chatId, questions.thirteenth, { reply_markup:  { inline_keyboard: [keyboard(18)]} });
        break;
      case '184':
        D++
        bot.sendMessage(chatId, questions.thirteenth, { reply_markup:  { inline_keyboard: [keyboard(18)]} });
        break;
      case '191':
        A++
        bot.sendMessage(chatId, questions.fourteenth, { reply_markup:  { inline_keyboard: [keyboard(19)]} });
        break;
      case '192':
        B++
        bot.sendMessage(chatId, questions.fourteenth, { reply_markup:  { inline_keyboard: [keyboard(19)]} });
        break;
      case '193':
        C++
        bot.sendMessage(chatId, questions.fourteenth, { reply_markup:  { inline_keyboard: [keyboard(19)]} });
        break;
      case '194':
        D++
        bot.sendMessage(chatId, questions.fourteenth, { reply_markup:  { inline_keyboard: [keyboard(19)]} });
        break;
      case '201':
        A++
        bot.sendMessage(chatId, questions.fifteenth, { reply_markup:  { inline_keyboard: [keyboard(20)]} });
        break;
      case '202':
        B++
        bot.sendMessage(chatId, questions.fifteenth, { reply_markup:  { inline_keyboard: [keyboard(20)]} });
        break;
      case '203':
        C++
        bot.sendMessage(chatId, questions.fifteenth, { reply_markup:  { inline_keyboard: [keyboard(20)]} });
        break;
      case '204':
        D++
        bot.sendMessage(chatId, questions.fifteenth, { reply_markup:  { inline_keyboard: [keyboard(20)]} });
        break;
      case '211':
        A++
        bot.sendMessage(chatId, questions.sixteenth, { reply_markup:  { inline_keyboard: [keyboard(21)]} });
        break;
      case '212':
        B++
        bot.sendMessage(chatId, questions.sixteenth, { reply_markup:  { inline_keyboard: [keyboard(21)]} });
        break;
      case '213':
        C++
        bot.sendMessage(chatId, questions.sixteenth, { reply_markup:  { inline_keyboard: [keyboard(21)]} });
        break;
      case '214':
        D++
        bot.sendMessage(chatId, questions.sixteenth, { reply_markup:  { inline_keyboard: [keyboard(21)]} });
        break;
      case '221':
        A++;
        result(A, B, C, D, chatId);
        break;
      case '222':
        B++;
        result(A, B, C, D, chatId);
        break;
      case '223':
        C++;
        result(A, B, C, D, chatId);
        break;
      case '224':
        D++;
        result(A, B, C, D, chatId);
        break;
    }
    
  });
};

botLogic();

