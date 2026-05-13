import jwt from "jsonwebtoken";
import ENV from "../config/env.js";

export const gentoken = async (payload) => {
  const codedtoken = jwt.sign({ payload }, ENV.SECRETKEY, {
    expiresIn: "1d",
  });

  return codedtoken;
};

export const checktoken = async (codedtoken) => {
  const decoded = jwt.verify(codedtoken, ENV.SECRETKEY);

  return decoded;
};
