const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
// console.log(process.env.STRIPE_KEY);

const stripe = require('stripe')(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Success!',
  });
});

app.post('/payment/create', async (req, res) => {
  const amount = parseInt(req.query.total, 10); // Explicitly parse amount as an integer

  if (!isNaN(amount) && amount > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // amount is expected to be in cents
        currency: 'usd',
      });

      res.status(201).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res
        .status(500)
        .json({ message: 'Payment intent creation failed', error });
    }
  } else {
    res.status(403).json({
      message: 'Amount must be a number greater than zero',
    });
  }
});

const port = 5000;

app.listen(port, err => {
  if (err) throw err;

  console.log('Amazon server listening on port: ' + port);
});
