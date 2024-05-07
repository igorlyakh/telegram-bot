const { keyboard } = require('../constants');
const { User } = require('../model/user.model');
const { Markup } = require('telegraf');

const start = async ctx => {
  try {
    const newUser = {
      name: ctx.chat.username,
      tgId: ctx.chat.id,
    };
    await User.create(newUser);
  } catch (error) {
    if (error.code === 11000) {
      return;
    }
    ctx.sendMessage('Что-то пошло не так...\nПопробуйте позже!');
  } finally {
    ctx.sendMessage(
      'Добро пожаловать!\nЭто бот для покупки доступа в канал!\n\nВыберите тариф и перейдите к оплате!',
      Markup.keyboard(keyboard).resize()
    );
  }
};

module.exports = start;
