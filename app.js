const TelegramBot = require('node-telegram-bot-api');
const values = require('./values.js');
const bot = new TelegramBot(values.bot_token, { polling: true });


const questions = {
  first:  `*(1/13) У вас:*\n\n 
    А) Суха шкіра, особливо на кистях рук та ліктях\n\n
    В) Темні кола під очима  \n\n
    С) Невеличкі червоні крапки на тілі \n\n
    D) Схильність до висипань напередодні менструації`,
  second: `*(2/13) Чи є у вас постійна жага до:*\n\n
    А) Солодощів, хлібу, макарон\n\n
    В) Солі (солоні горішки, сирні палички) або (та) до шоколаду\n\n
    С) Смажених у фрітюрі продуктів, картопляних чипсів чи кислих продуктів\n\n
    D) Морозива, вершкового сиру, сметани чи молока`,
  third: `*(3/13) У вас:*\n\n 
    А) Ламкі нігті з поздовжніми бороздами\n\n
    В) Є волосся на обличчі (для жінок)\n\n
    С) Нігті з білими плямами\n\n
    D) Витончення та випадіння волосся в певні дні менструального циклу`,
  fourth: `*(4/13) У вас:*\n\n 
    А) Зайва вага розподіляється більш-менш рівномірно\n\n
    В) Жир відкладається в області спини, грудях, животі, в той час, як руки і ноги виглядають непропорційно худими \n\n
    С) Випираючий живіт \n\n
    D) Зайвий жир у черевній порожнині (нижче талії), ногах і нижній частині сідниць (фігура груша) `,
  fifth: `*(5/13) У вас:*\n\n 
    А) Мерзнуть ноги і доводиться спати у шкарпетках\n\n
    В) Інколи ночами зводить гомілки  \n\n
    С) Гарячі чи набряклі ступні \n\n
    D) Затримка рідини під час менструації`,
  sixth: `*(6/13) У вас:*\n\n 
    А) Поганий апетит, закрепи\n\n
    В) Є хронічні запалення  \n\n
    С) Темно – жовта сеча \n\n
    D) Обільна менструація`,
  seventh: `*(7/13) У вас:*\n\n 
    А) Буває надмірна втома ранім вечором (приблизно 19:30), а рано вранці відчуваєтє себе комфортно\n\n
    В) Є відчуття, що вам не вистачає повітря при підйомі сходами \n\n
    С) Відчуваєте себе бадьоріше ввечері (сова)\n\n
    D) Буваєте не в дусі, роздратовані у певний період місяця `,
  eighth: `*(8/13) У вас:*\n\n 
    А) Жорстке та сухе волосся\n\n
    В) Опухлі кісточки, залишаются сліди від шкарпеток \n\n
    С) Шкіра, що лущиться чи лупа на бровах і голові \n\n
    D) Інтенсивне нічне потовиділення, приливи`,
  ninth: `*(9/13) У вас:*\n\n 
    А) Провисла шкіра на внутрішніх поверхнях рук та підборідді \n\n
    В) Скупчення жиру на талії та животі у вигляді надувного кругу  \n\n
    С) Білки очей мають жовтуватий відтінок  \n\n
    D) У минулому були кисти яєчників чи молочних залоз`,
  tenth: `*(10/13) У вас:*\n\n 
    А) Сонливість, потреба у денному сні \n\n
    В) Труднощі із засинанням, неглибокій і уривчастий сон  \n\n
    С) Безсоння і тривожне пробудження посеред ночі \n\n
    D) Напади втоми та відчуття «туману» в голові `,
  eleventh: `*(11/13) У вас:*\n\n 
    А) Випадає волосся бровей особливо із зовнішного боку \n\n
    В) Є відкладення кальцію, чи проблеми з кальцієм – бурсит, камені у нирках, п‘яткові шпори, ранні катаракти \n\n
    С) Відчуваєтє дискомфорт чи біль у правому плечі та праворуч у шиї\n\n
    D) Відчуваєтє біль в одному коліні або попереку, яка підсилюється під час менструації `,
  twelfth: `*(12/13) У вас:*\n\n 
    А) Високий рівень холестирину\n\n
    В) Нестабільний рівень глюкози в крові \n\n
    С) Здуття живота, закрепи, відрижка після їжи\n\n
    D) Зниження лібідо `,
  thirteenth: `*(13/13) У вас:*\n\n 
    А) Xолодна, бліда, з жовтуватим відтінком шкіра, знижена пітливість, гіперкератоз епідермісу\n\n
    В) Купероз, втрата пружності шкіри \n\n
    С) Псоріаз, екзема, нічний свербіж шкіри\n\n
    D) Ендометріоз, міома, мастопатія `,
    /*
  fourteenth: `*(14/16) У вас…*\n\n 
    А) буває надмірна втома раннім вечором (о пів на восьму), а рано вранці відчуваєте себе бадьоріше?\n\n
    В) сечовий міхур вночі активніший, ніж вдень? \n\n
    С) білки очей мають жовтуватий відтінок?\n\n
    D) у минулому були кісти яєчників чи молочних залоз?`,
  fifteenth: `*(15/16) У вас…*\n\n 
    А) не вистачає життєвих сил (ви важкі на підйом)?\n\n
    В) є відкладення кальцію чи проблеми з кальцієм-бурсит, тендиніт, камені у нирках,, п‘яткові шпори, ранні катаракти? \n\n
    С) дуже псується настрій, якщо пропустити прийом їжі?\n\n
    D) є труднощі зі зниженням ваги після вагітності?`,
  sixteenth: `*(16/16) Ви…*\n\n 
    А) у минулому ви були на низькокалорійних дієтах?\n\n
    В) погано переностите стрес, легко дратуєтеся за заводитеся? \n\n
    С) відчуваєте дискомфорт чи біль у правому плечі та праворуч у шиї?\n\n
    D) Відчуваєте біль в одному коліні, котра підсилюється під час місячного?`,
    */
  start: `Виберіть одну літеру (А, В, С або D) у кожній групі наведених нижче питань.
Якщо у вас декілька симптомів з наведених у одній групі, виділіть найбільш виражений симптом.
Жінкам у менопаузі чи постменопаузі потрібно відповідати на питання (D), що стосуються яʼєчникового типу статури з точки зору того, чи були у них раніше вказані проблеми чи стани.
Всього буде потрібно відповісти на 16 питань.

  *Розпочинаємо?*
  `

};

const keyboard = (questionsNumber) => {
  const keys = [
    { text: '✨ A ✨', callback_data: questionsNumber * 10 + 11 },
    { text: '✨ B ✨', callback_data: questionsNumber * 10 + 12 },
    { text: '✨ C ✨', callback_data: questionsNumber * 10 + 13 },
    { text: '✨ D ✨', callback_data: questionsNumber * 10 + 14 }
  ];
  return keys;
};

const result = (A, B, C, D, chatId) => {
  const number = Math.max(A,B,C,D);
  let path;
  let name;
  bot.sendMessage(chatId, `*Ваш результат:*
  "Щитоподібний"=${A}/13,
  "Наднирковий"=${B}/13,
  "Печінковий"=${C}/13,
  "Яєчниковий"=${D}/13`, { parse_mode: 'Markdown' });
  bot.sendMessage(values.logger_channel, `${chatId} пройшов тест і отримав результат`);
  switch (number) {
    case A:
      bot.sendMessage(chatId, `<a href="https://professional.skin/test_a">Щитоподібний</a>` , { parse_mode: 'HTML' });
      break;
    case B:
      bot.sendMessage(chatId, `<a href="https://professional.skin/test_b">Наднирковий</a>` , { parse_mode: 'HTML' });
      break;
    case C:
      bot.sendMessage(chatId, `<a href="https://professional.skin/test_c">Печінковий</a>` , { parse_mode: 'HTML' });
      break;
    case D:
      bot.sendMessage(chatId, `<a href="https://professional.skin/test_d">Яєчниковий</a>` , { parse_mode: 'HTML' });
  }
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
    if (msg.text == '/start') {
      A = 0;
      B = 0;
      C = 0;
      D = 0;
      bot.sendMessage(chatId, questions.start , { reply_markup:  { inline_keyboard: [
        [{ text: '✨ Так ✨', callback_data: `7` }]
      ]},  parse_mode: 'Markdown'  });
    }
  });
  bot.on("callback_query", async (query) => {
    const action = query.data;
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
        /* 
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
        */
      case '7': 
        bot.sendMessage(chatId, questions.first , { reply_markup:  { inline_keyboard: [keyboard(6)]}, parse_mode: 'Markdown' });
        break;
      case '71': 
        A++
        bot.sendMessage(chatId, questions.second , { reply_markup:  { inline_keyboard: [keyboard(7)]},  parse_mode: 'Markdown' });
        break;
      case '72': 
        B++
        bot.sendMessage(chatId, questions.second , { reply_markup:  { inline_keyboard: [keyboard(7)]},  parse_mode: 'Markdown' });
        break;
      case '73': 
        C++
        bot.sendMessage(chatId, questions.second , { reply_markup:  { inline_keyboard: [keyboard(7)]},  parse_mode: 'Markdown' });
        break;
      case '74': 
        D++
        bot.sendMessage(chatId, questions.second , { reply_markup:  { inline_keyboard: [keyboard(7)]},  parse_mode: 'Markdown' });
        break;
      case '81':
        A++
        bot.sendMessage(chatId, questions.third, { reply_markup:  { inline_keyboard: [keyboard(8)]},  parse_mode: 'Markdown' });
        break;
      case '82':
        B++;
        bot.sendMessage(chatId, questions.third, { reply_markup:  { inline_keyboard: [keyboard(8)]},  parse_mode: 'Markdown' });
        break;
      case '83':
        C++
        bot.sendMessage(chatId, questions.third, { reply_markup:  { inline_keyboard: [keyboard(8)]},  parse_mode: 'Markdown' });
        break;
      case '84':
        D++
        bot.sendMessage(chatId, questions.third, { reply_markup:  { inline_keyboard: [keyboard(8)]},  parse_mode: 'Markdown' });
        break;
      case '91':
        A++
        bot.sendMessage(chatId, questions.fourth, { reply_markup:  { inline_keyboard: [keyboard(9)]},  parse_mode: 'Markdown' });
        break;
      case '92':
        B++
        bot.sendMessage(chatId, questions.fourth, { reply_markup:  { inline_keyboard: [keyboard(9)]},  parse_mode: 'Markdown' });
        break;
      case '93':
        C++
        bot.sendMessage(chatId, questions.fourth, { reply_markup:  { inline_keyboard: [keyboard(9)]},  parse_mode: 'Markdown' });
        break;
      case '94':
        D++
        bot.sendMessage(chatId, questions.fourth, { reply_markup:  { inline_keyboard: [keyboard(9)]},  parse_mode: 'Markdown' });
        break;
      case '101':
        A++
        bot.sendMessage(chatId, questions.fifth, { reply_markup:  { inline_keyboard: [keyboard(10)]},  parse_mode: 'Markdown' });
        break;
      case '102':
        B++
        bot.sendMessage(chatId, questions.fifth, { reply_markup:  { inline_keyboard: [keyboard(10)]},  parse_mode: 'Markdown' });
        break;
      case '103':
        C++
        bot.sendMessage(chatId, questions.fifth, { reply_markup:  { inline_keyboard: [keyboard(10)]},  parse_mode: 'Markdown' });
        break;
      case '104':
        D++
        bot.sendMessage(chatId, questions.fifth, { reply_markup:  { inline_keyboard: [keyboard(10)]},  parse_mode: 'Markdown' });
        break;
      case '111':
        A++
        bot.sendMessage(chatId, questions.sixth, { reply_markup:  { inline_keyboard: [keyboard(11)]},  parse_mode: 'Markdown' });
        break;
      case '112':
        B++
        bot.sendMessage(chatId, questions.sixth, { reply_markup:  { inline_keyboard: [keyboard(11)]},  parse_mode: 'Markdown' });
        break;
      case '113':
        C++
        bot.sendMessage(chatId, questions.sixth, { reply_markup:  { inline_keyboard: [keyboard(11)]},  parse_mode: 'Markdown' });
        break;
      case '114':
        D++
        bot.sendMessage(chatId, questions.sixth, { reply_markup:  { inline_keyboard: [keyboard(11)]},  parse_mode: 'Markdown' });
        break;
      case '121':
        A++
        bot.sendMessage(chatId, questions.seventh, { reply_markup:  { inline_keyboard: [keyboard(12)]},  parse_mode: 'Markdown' });
        break;
      case '122':
        B++
        bot.sendMessage(chatId, questions.seventh, { reply_markup:  { inline_keyboard: [keyboard(12)]},  parse_mode: 'Markdown' });
        break;
      case '123':
        C++
        bot.sendMessage(chatId, questions.seventh, { reply_markup:  { inline_keyboard: [keyboard(12)]},  parse_mode: 'Markdown' });
        break;
      case '124':
        D++
        bot.sendMessage(chatId, questions.seventh, { reply_markup:  { inline_keyboard: [keyboard(12)]},  parse_mode: 'Markdown' });
        break;
      case '131':
        A++
        bot.sendMessage(chatId, questions.eighth, { reply_markup:  { inline_keyboard: [keyboard(13)]},  parse_mode: 'Markdown' });
        break;
      case '132':
        B++
        bot.sendMessage(chatId, questions.eighth, { reply_markup:  { inline_keyboard: [keyboard(13)]},  parse_mode: 'Markdown' });
        break;
      case '133':
        C++
        bot.sendMessage(chatId, questions.eighth, { reply_markup:  { inline_keyboard: [keyboard(13)]},  parse_mode: 'Markdown' });
        break;
      case '134':
        D++
        bot.sendMessage(chatId, questions.eighth, { reply_markup:  { inline_keyboard: [keyboard(13)]},  parse_mode: 'Markdown' });
        break;
      case '141':
        A++
        bot.sendMessage(chatId, questions.ninth, { reply_markup:  { inline_keyboard: [keyboard(14)]},  parse_mode: 'Markdown' });
        break;
      case '142':
        B++
        bot.sendMessage(chatId, questions.ninth, { reply_markup:  { inline_keyboard: [keyboard(14)]},  parse_mode: 'Markdown' });
        break;
      case '143':
        C++
        bot.sendMessage(chatId, questions.ninth, { reply_markup:  { inline_keyboard: [keyboard(14)]},  parse_mode: 'Markdown' });
        break;
      case '144':
        D++
        bot.sendMessage(chatId, questions.ninth, { reply_markup:  { inline_keyboard: [keyboard(14)]},  parse_mode: 'Markdown' });
        break;
      case '151':
        A++
        bot.sendMessage(chatId, questions.tenth, { reply_markup:  { inline_keyboard: [keyboard(15)]},  parse_mode: 'Markdown' });
        break;
      case '152':
        B++
        bot.sendMessage(chatId, questions.tenth, { reply_markup:  { inline_keyboard: [keyboard(15)]},  parse_mode: 'Markdown' });
        break;
      case '153':
        C++
        bot.sendMessage(chatId, questions.tenth, { reply_markup:  { inline_keyboard: [keyboard(15)]},  parse_mode: 'Markdown' });
        break;
      case '154':
        D++
        bot.sendMessage(chatId, questions.tenth, { reply_markup:  { inline_keyboard: [keyboard(15)]},  parse_mode: 'Markdown' });
        break;
      case '161':
        A++
        bot.sendMessage(chatId, questions.eleventh, { reply_markup:  { inline_keyboard: [keyboard(16)]},  parse_mode: 'Markdown' });
        break;
      case '162':
        B++
        bot.sendMessage(chatId, questions.eleventh, { reply_markup:  { inline_keyboard: [keyboard(16)]},  parse_mode: 'Markdown' });
        break;
      case '163':
        C++
        bot.sendMessage(chatId, questions.eleventh, { reply_markup:  { inline_keyboard: [keyboard(16)]},  parse_mode: 'Markdown' });
        break;
      case '164':
        D++
        bot.sendMessage(chatId, questions.eleventh, { reply_markup:  { inline_keyboard: [keyboard(16)]},  parse_mode: 'Markdown' });
        break;
      case '171':
        A++
        bot.sendMessage(chatId, questions.twelfth, { reply_markup:  { inline_keyboard: [keyboard(17)]},  parse_mode: 'Markdown' });
        break;
      case '172':
        B++
        bot.sendMessage(chatId, questions.twelfth, { reply_markup:  { inline_keyboard: [keyboard(17)]},  parse_mode: 'Markdown' });
        break;
      case '173':
        C++
        bot.sendMessage(chatId, questions.twelfth, { reply_markup:  { inline_keyboard: [keyboard(17)]},  parse_mode: 'Markdown'});
        break;
      case '174':
        D++
        bot.sendMessage(chatId, questions.twelfth, { reply_markup:  { inline_keyboard: [keyboard(17)]},  parse_mode: 'Markdown' });
        break;
      case '181':
        A++
        bot.sendMessage(chatId, questions.thirteenth, { reply_markup:  { inline_keyboard: [keyboard(21)]},  parse_mode: 'Markdown' });
        break;
      case '182':
        B++
        bot.sendMessage(chatId, questions.thirteenth, { reply_markup:  { inline_keyboard: [keyboard(21)]},  parse_mode: 'Markdown' });
        break;
      case '183':
        C++
        bot.sendMessage(chatId, questions.thirteenth, { reply_markup:  { inline_keyboard: [keyboard(21)]},  parse_mode: 'Markdown' });
        break;
      case '184':
        D++
        bot.sendMessage(chatId, questions.thirteenth, { reply_markup:  { inline_keyboard: [keyboard(21)]},  parse_mode: 'Markdown' });
        break;
      case '191':
        A++
        bot.sendMessage(chatId, questions.fourteenth, { reply_markup:  { inline_keyboard: [keyboard(19)]},  parse_mode: 'Markdown' });
        break;
      case '192':
        B++
        bot.sendMessage(chatId, questions.fourteenth, { reply_markup:  { inline_keyboard: [keyboard(19)]},  parse_mode: 'Markdown' });
        break;
      case '193':
        C++
        bot.sendMessage(chatId, questions.fourteenth, { reply_markup:  { inline_keyboard: [keyboard(19)]},  parse_mode: 'Markdown' });
        break;
      case '194':
        D++
        bot.sendMessage(chatId, questions.fourteenth, { reply_markup:  { inline_keyboard: [keyboard(19)]},  parse_mode: 'Markdown' });
        break;
      case '201':
        A++
        bot.sendMessage(chatId, questions.fifteenth, { reply_markup:  { inline_keyboard: [keyboard(20)]},  parse_mode: 'Markdown' });
        break;
      case '202':
        B++
        bot.sendMessage(chatId, questions.fifteenth, { reply_markup:  { inline_keyboard: [keyboard(20)]},  parse_mode: 'Markdown' });
        break;
      case '203':
        C++
        bot.sendMessage(chatId, questions.fifteenth, { reply_markup:  { inline_keyboard: [keyboard(20)]},  parse_mode: 'Markdown' });
        break;
      case '204':
        D++
        bot.sendMessage(chatId, questions.fifteenth, { reply_markup:  { inline_keyboard: [keyboard(20)]},  parse_mode: 'Markdown' });
        break;
      case '211':
        A++
        bot.sendMessage(chatId, questions.sixteenth, { reply_markup:  { inline_keyboard: [keyboard(21)]},  parse_mode: 'Markdown' });
        break;
      case '212':
        B++
        bot.sendMessage(chatId, questions.sixteenth, { reply_markup:  { inline_keyboard: [keyboard(21)]},  parse_mode: 'Markdown' });
        break;
      case '213':
        C++
        bot.sendMessage(chatId, questions.sixteenth, { reply_markup:  { inline_keyboard: [keyboard(21)]},  parse_mode: 'Markdown' });
        break;
      case '214':
        D++
        bot.sendMessage(chatId, questions.sixteenth, { reply_markup:  { inline_keyboard: [keyboard(21)]},  parse_mode: 'Markdown' });
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

