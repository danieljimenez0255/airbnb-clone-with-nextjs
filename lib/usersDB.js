import clientPromise from "./MongoDB";

export const userExists = async (user) => {
  const dbConnect = await clientPromise;
  const userDB = dbConnect.db("airbnbclone");
  const userCollection = userDB.collection("users");
  const mainUser = userCollection.findOne(user);

  return mainUser;
};

export const createUserFunc = async (user) => {
  const dbConnect = await clientPromise;
  const userDB = dbConnect.db("airbnbclone");
  const userCollection = userDB.collection("users");
  const addUser = await userCollection.insertOne(user);
  const fetchAddedUser = await userExists(user);
  return fetchAddedUser;
};
