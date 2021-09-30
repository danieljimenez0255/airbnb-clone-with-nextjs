const stripe = require("stripe")(process.env.STRIPE_TEST_SK);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.items * 100,
      currency: "usd",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  }
}
