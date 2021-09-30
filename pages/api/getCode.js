const accountSid = process.env.TWILIO_VERIFY_SID;
const authToken = process.env.TWILIO_VERIFY_TOKEN;
const twilioService = process.env.TWILIO_VERIFY_SERVICES;
const client = require("twilio")(accountSid, authToken);

export default async function handler(req, res) {
  await client.verify
    .services(twilioService)
    .verifications.create({
      to: "+" + req.body.verifyValue,
      channel: req.query.type,
    })
    .then(() => {
      res.send({ response: "success" });
    })
    .catch(() => {
      res.send({ response: "not successful" });
    });
}
