const { Markup } = require('telegraf');

const keyboard = [
  [
    Markup.button.callback('Проверить мою подписку'),
    Markup.button.callback('Купить подписку', 'buy'),
  ],
  [Markup.button.callback('Описание товара', 'about')],
  [Markup.button.callback('Тех. поддержка', 'support')],
];

module.exports = keyboard;
