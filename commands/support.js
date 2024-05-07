const { Scenes, Markup } = require('telegraf');
const { keyboard } = require('../constants');

const supportScene = new Scenes.BaseScene('supportScene');

let msgEnter;

supportScene.on('text', ctx => {
  ctx.reply(
    'Спасибо!\nВаше сообщение передано поддержке, скоро с Вами свяжутся!',
    Markup.keyboard(keyboard).resize()
  );
  ctx.telegram.sendMessage(
    244920248,
    `Сообщение о помощи от <a href='tg://user?id=${ctx.chat.id}'>${ctx.chat.first_name}</a>.\nЕго id ${ctx.chat.id}`,
    { parse_mode: 'HTML' }
  );
  ctx.telegram.forwardMessage(244920248, ctx.chat.id, ctx.message.message_id);
  ctx.scene.leave();
});

supportScene.action('cancel', ctx => {
  ctx.reply(
    'Вы отказали писать в поддержку.',
    Markup.keyboard(keyboard).resize()
  );
  ctx.deleteMessage(msgEnter);
  ctx.scene.leave();
});

const support = async ctx => {
  const obj = await ctx.reply(
    'Опишите Вашу проблему и отправьте сообщение поддержке!',
    Markup.inlineKeyboard([Markup.button.callback('Отмена', 'cancel')]).resize()
  );
  msgEnter = obj.message_id;
  ctx.scene.enter('supportScene');
};

module.exports = { support, supportScene };
