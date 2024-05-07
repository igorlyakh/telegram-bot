require('dotenv').config();
const { Scenes, Markup } = require('telegraf');
const { createPayment, infoPayment } = require('../helpers');
const { User } = require('../model/user.model');

const CHANEL = process.env.CHANEL_ID;

const buyScene = new Scenes.BaseScene('buyScene');

let user;

buyScene.action('month', async ctx => {
  ctx.deleteMessage();
  const payment = await createPayment('month', '100.00');
  const myUrl = payment.confirmation.confirmation_url;
  const payId = payment.id;
  ctx.reply(
    'Счет для оплаты готов.',
    Markup.inlineKeyboard([
      [Markup.button.url('Нажмите для оплаты', myUrl)],
      [Markup.button.callback('Отмена', 'cancel')],
    ]).resize()
  );
  const checkPay = setInterval(async () => {
    const status = await infoPayment(payId);
    if (status) {
      clearInterval(checkPay);
      ctx.scene.leave();
      if (user.subscribe) {
        const oldDate = new Date(user.subUntil);
        const month = oldDate.setDate(oldDate.getDate() + 30);
        user.subUntil = month;
        await User.findByIdAndUpdate(user._id, user);
        ctx.reply('Ваша подписка обновлена!');
        return;
      }
      const currentDate = new Date();
      const oneMonth = currentDate.setDate(currentDate.getDate() + 30);
      user.subscribe = 'month';
      user.subUntil = oneMonth;
      await User.findByIdAndUpdate(user._id, user);
      const { invite_link: link } = await ctx.telegram.createChatInviteLink(
        CHANEL,
        {
          name: `Ссылка для имя: ${ctx.chat.first_name}`,
          member_limit: 1,
          expire_date: Math.floor(Date.now() / 1000) + 10 * 60,
        }
      );
      ctx.reply(
        'Ваш платеж прошел успешно!',
        Markup.inlineKeyboard([
          Markup.button.url('Вступить в канал', link),
        ]).resize()
      );
    }
  }, 2000);
  setTimeout(() => clearInterval(checkPay), 600000);
});

buyScene.action('year', async ctx => {
  ctx.deleteMessage();
  const payment = await createPayment('year', '1000.00');
  const myUrl = payment.confirmation.confirmation_url;
  const payId = payment.id;
  ctx.reply(
    'Счет для оплаты готов.',
    Markup.inlineKeyboard([
      [Markup.button.url('Нажмите для оплаты', myUrl)],
      [Markup.button.callback('Отмена', 'cancel')],
    ]).resize()
  );
  const checkPay = setInterval(async () => {
    const status = await infoPayment(payId);
    if (status) {
      clearInterval(checkPay);
      ctx.scene.leave();
      if (user.subscribe) {
        const oldDate = new Date(user.subUntil);
        const year = oldDate.setFullYear(oldDate.getFullYear() + 1);
        user.subUntil = year;
        await User.findByIdAndUpdate(user._id, user);
        ctx.reply('Ваша подписка обновлена!');
        return;
      }
      const currentDate = new Date();
      const oneYear = currentDate.setFullYear(currentDate.getFullYear() + 1);
      user.subscribe = 'year';
      user.subUntil = oneYear;
      await User.findByIdAndUpdate(user._id, user);
      const { invite_link: link } = await ctx.telegram.createChatInviteLink(
        CHANEL,
        {
          name: `Ссылка для имя: ${ctx.chat.first_name}`,
          member_limit: 1,
          expire_date: Math.floor(Date.now() / 1000) + 10 * 60,
        }
      );
      ctx.reply(
        'Ваш платеж прошел успешно!',
        Markup.inlineKeyboard([
          Markup.button.url('Вступить в канал', link),
        ]).resize()
      );
    }
  }, 2000);
  setTimeout(() => clearInterval(checkPay), 600000);
});

buyScene.action('endless', async ctx => {
  ctx.deleteMessage();
  const payment = await createPayment('year', '1000.00');
  const myUrl = payment.confirmation.confirmation_url;
  const payId = payment.id;
  ctx.reply(
    'Счет для оплаты готов.',
    Markup.inlineKeyboard([
      [Markup.button.url('Нажмите для оплаты', myUrl)],
      [Markup.button.callback('Отмена', 'cancel')],
    ]).resize()
  );
  const checkPay = setInterval(async () => {
    const status = await infoPayment(payId);
    if (status) {
      clearInterval(checkPay);
      ctx.scene.leave();
      const currentDate = new Date();
      const endless = currentDate.setFullYear(currentDate.getFullYear() + 9999);
      const { invite_link: link } = await ctx.telegram.createChatInviteLink(
        CHANEL,
        {
          name: `Ссылка для имя: ${ctx.chat.first_name}`,
          member_limit: 1,
          expire_date: Math.floor(Date.now() / 1000) + 10 * 60,
        }
      );
      ctx.reply(
        'Ваш платеж прошел успешно!',
        Markup.inlineKeyboard([
          Markup.button.url('Вступить в канал', link),
        ]).resize()
      );
      await User.findOneAndUpdate(
        { tgId: ctx.chat.id },
        {
          subscribe: 'endless',
          subUntil: endless,
        }
      );
    }
  }, 2000);
  setTimeout(() => clearInterval(checkPay), 600000);
});

buyScene.action('day', async ctx => {
  ctx.deleteMessage();
  const payment = await createPayment('day', '10.00');
  const myUrl = payment.confirmation.confirmation_url;
  const payId = payment.id;
  ctx.reply(
    'Счет для оплаты готов.',
    Markup.inlineKeyboard([
      [Markup.button.url('Нажмите для оплаты', myUrl)],
      [Markup.button.callback('Отмена', 'cancel')],
    ]).resize()
  );
  const checkPay = setInterval(async () => {
    const status = await infoPayment(payId);
    if (status) {
      clearInterval(checkPay);
      ctx.scene.leave();
      if (user.subscribe) {
        const oldDate = new Date(user.subUntil);
        const day = oldDate.setDate(oldDate.getDate() + 1);
        user.subUntil = day;
        await User.findByIdAndUpdate(user._id, user);
        ctx.reply('Ваша подписка обновлена!');
        return;
      }
      const currentDate = new Date();
      const day = currentDate.setDate(currentDate.getDate() + 1);
      user.subscribe = 'day';
      user.subUntil = day;
      await User.findByIdAndUpdate(user._id, user);
      const { invite_link: link } = await ctx.telegram.createChatInviteLink(
        CHANEL,
        {
          name: `Ссылка для имя: ${ctx.chat.first_name}`,
          member_limit: 1,
          expire_date: Math.floor(Date.now() / 1000) + 10 * 60,
        }
      );
      ctx.reply(
        'Ваш платеж прошел успешно!',
        Markup.inlineKeyboard([
          Markup.button.url('Вступить в канал', link),
        ]).resize()
      );
    }
  }, 2000);
  setTimeout(() => clearInterval(checkPay), 600000);
});

buyScene.action('cancel', async ctx => {
  ctx.deleteMessage();
  ctx.reply(
    'Выберите тариф для покупки:',
    Markup.inlineKeyboard([
      [Markup.button.callback('1 месяц', 'month')],
      [Markup.button.callback('1 год', 'year')],
      [Markup.button.callback('Навсегда', 'endless')],
      // [Markup.button.callback('1 день', 'day')],
      [Markup.button.callback('Отмена', 'cancelOrder')],
    ]).resize()
  );
});

buyScene.action('cancelOrder', async ctx => {
  ctx.deleteMessage();
  ctx.reply('Вы отменили покупку.');
  ctx.scene.leave();
});

buyScene.on('text', ctx => ctx.reply('Выберите тариф из списка!'));

const buy = async ctx => {
  user = await User.findOne({ tgId: ctx.chat.id });
  if (user.subscribe === 'endless') {
    ctx.reply('У вас уже активирована пожизненная подписка.');
    return;
  }
  ctx.reply(
    'Выберите тариф для покупки:',
    Markup.inlineKeyboard([
      [Markup.button.callback('1 месяц', 'month')],
      [Markup.button.callback('1 год', 'year')],
      [Markup.button.callback('Навсегда', 'endless')],
      // [Markup.button.callback('1 день', 'day')],
      [Markup.button.callback('Отмена', 'cancelOrder')],
    ]).resize()
  );
  ctx.scene.enter('buyScene');
};

module.exports = { buy, buyScene };
