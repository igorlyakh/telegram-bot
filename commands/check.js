const { User } = require('../model/user.model');

const TYPE = {
  month: 'месячная',
  year: 'годовая',
  endless: 'пожизненная',
  day: 'дневная',
};

const check = async ctx => {
  try {
    const { subscribe, subUntil } = await User.findOne({ tgId: ctx.chat.id });
    const dateObj = new Date(subUntil);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    if (!subscribe) {
      ctx.reply('На данный момент у вас нет действующей подписки!');
      return;
    }
    if (subscribe === 'endless') {
      ctx.reply(`Тариф вашей подписки: <b>${TYPE[subscribe]}</b>`, {
        parse_mode: 'HTML',
      });
      return;
    }
    ctx.reply(
      `Тариф вашей подписки: <b>${TYPE[subscribe]}</b>, он действует до <b>${day}.${month}.${year}</b>`,
      { parse_mode: 'HTML' }
    );
  } catch {
    ctx.reply('Упс...\nЧто-то пошло не так!\nПопробуйте позже!');
  }
};

module.exports = check;
