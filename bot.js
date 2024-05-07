require('colors');
require('dotenv').config();

const cron = require('node-cron');

const { Telegraf, Scenes, session } = require('telegraf');
const mongoose = require('mongoose');
const {
  start,
  check,
  support,
  buy,
  description,
  supportScene,
  buyScene,
} = require('./commands');
const { User } = require('./model/user.model');

const TOKEN = process.env.BOT_TOKEN;
const DB_LINK = process.env.DB_LINK;
const CHANEL_ID = process.env.CHANEL_ID;

const bot = new Telegraf(TOKEN);
const stage = new Scenes.Stage([supportScene, buyScene]);

bot.use(session());
bot.use(stage.middleware());

bot.start(ctx => start(ctx));

bot.hears('Проверить мою подписку', ctx => check(ctx));

bot.hears('Купить подписку', ctx => buy(ctx));

bot.hears('Описание товара', ctx => description(ctx));

bot.hears('Тех. поддержка', ctx => support(ctx));

bot.on('text', ctx => ctx.reply('Я не понимаю тебя\nИспользуй меню.'));

const startBot = async () => {
  try {
    bot.launch();
    console.log('[BOT] Бот запущен!'.magenta);
  } catch {
    console.log('[BOT] Ошибка запуска!'.red);
    process.exit(1);
  }
};

cron.schedule('0 0 * * *', async () => {
  console.log('Done crone task!'.bgRed);
  const users = await User.find({
    subscribe: { $ne: null },
  });
  users.forEach(async user => {
    const remainingDays = Math.ceil(
      (new Date(user.subUntil) - new Date()) / (1000 * 60 * 60 * 24)
    );
    console.log(remainingDays);
    if (remainingDays > 1) return;
    if (remainingDays === 1) {
      bot.telegram.sendMessage(
        user.tgId,
        'Ваша подписка заканчивается завтра!\nНе забудьте её продлить!'
      );
      return;
    } else if (remainingDays <= 0) {
      bot.telegram.sendMessage(user.tgId, 'Ваша подписка истекла!');
      user.subUntil = null;
      user.subscribe = null;
      bot.telegram.banChatMember(CHANEL_ID, user.tgId);
      bot.telegram.unbanChatMember(CHANEL_ID, user.tgId);
    }
    await User.findByIdAndUpdate(user._id, user);
  });
});

mongoose
  .connect(DB_LINK)
  .then(() => {
    console.log('[DB] База данных успешно подключена!'.magenta);
    startBot();
  })
  .catch(() => {
    console.log('[DB] Ошибка подключения к базе данных!'.red);
    console.log('[BOT] Бот не запущен!'.red);
    process.exit(1);
  });
