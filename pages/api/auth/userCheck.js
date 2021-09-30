import clientClose from "@/lib/MongoClose";
import { userExists } from "@/lib/usersDB";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const response = await userExists(req.body);
    const closeConnection = await clientClose;
    if (response?._id) {
      res.status(201).send(response);
    } else {
      res.status(400).send({ res: "User not found." });
    }
  }
}
