import { createUserFunc } from "@/lib/usersDB";
import clientClose from "@/lib/MongoClose";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const createUser = await createUserFunc(req.body);
    const closeConnection = await clientClose;
    if (createUser?._id) {
      res.status(201).send({ res: "successfully create!", data: createUser });
    } else {
      res.status(400).send({ res: "Cannot Create User" });
    }
  }
}
