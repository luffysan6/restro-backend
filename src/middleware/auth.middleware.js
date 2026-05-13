// auth.middleware.js

import { checktoken } from "../utils/genToken.js";

// req.token - > jwt  -> decode -> extract role -> pass it to next middleware

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies;
    let JWT = token.jwt;

    const { payload } = await checktoken(JWT);

    // console.log(tokenData);
    console.log(payload);
    req.role = payload.role ? payload.role : "undefined";
    req.user = payload.id ? payload.id : "undefined";
    next(); // pass it to next controller or middleware
  } catch (error) {
    if (
      error.message == "invalid signature" ||
      error.name == "JsonWebTokenError"
    )
      return res.status(401).json({ message: "Auth Failed", success: false });

    console.log("Error At Token Check/ \t", error.message);
    console.log({ error });
    return res.status(500).json({
      message: "Error at Server",
      success: false,
      error,
    });
  }
};
export default authMiddleware;
