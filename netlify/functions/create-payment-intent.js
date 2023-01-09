// require is like import
// config will attatch the secret variables to our environment
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log(stripe);
exports.handler = async (event) => {
  try {
    console.log('hi');
    // amount (currency without decimals)
    const { amount } = JSON.parse(event.body);
    // sends the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    // returns if succeeds
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};