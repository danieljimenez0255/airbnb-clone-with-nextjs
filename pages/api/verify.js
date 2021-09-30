const accountSid = process.env.TWILIO_VERIFY_SID;
const authToken = process.env.TWILIO_VERIFY_TOKEN;
const twilioService = process.env.TWILIO_VERIFY_SERVICES;
const client = require("twilio")(accountSid, authToken);

export default async function handler(req, res) {
  await client.verify
    .services(twilioService)
    .verificationChecks.create({
      to: "+" + req.body.verifyValue,
      code: req.body.code,
    })
    .then((verification_check) => {
      if (verification_check?.status === "approved") {
        res.send({
          response: "successful verification",
        });
      } else {
        res.send({ response: "not successful" });
      }
    })
    .catch((err) => {
      res.send({ err });
    });
}
