const { yooKassa } = require('./payment');

const infoPayment = async id => {
  const payment = await yooKassa.getPayment(id);
  // return payment.status === 'succeeded' ? true : false;
  return payment.paid;
};

module.exports = infoPayment;
