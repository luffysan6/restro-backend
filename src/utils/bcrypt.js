import bcrypt from "bcryptjs";

export const genHashPassword = async (pass) => {
  const genSalt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(pass, genSalt);
  return hashpassword;
};

export const comparePassword = async (pass, hashpassword) => {
  return await bcrypt.compare(pass, hashpassword);
};

