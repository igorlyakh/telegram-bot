require('dotenv').config();
const YooKassa = require('yookassa');

const { SECRET_KEY, SHOP_ID } = process.env;

const yooKassa = new YooKassa({
  shopId: SHOP_ID,
  secretKey: SECRET_KEY,
});

const TYPES = {
  month: 'Подписка на 1 месяц',
  year: 'Подписка на 1 год',
  endless: 'Подписка навсегда',
  day: '1 день',
};

const createPayment = async (type, amount) => {
  const payment = await yooKassa.createPayment({
    amount: {
      value: `${amount}`,
      currency: 'RUB',
    },
    confirmation: {
      type: 'redirect',
      return_url: 'https://t.me/Demonstration17Bot',
    },
    description: TYPES[type],
  });
  return payment;
};

module.exports = { createPayment, yooKassa };
