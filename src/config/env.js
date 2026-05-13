import dotenv from "dotenv";
import process from "process";

dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  DB_URI: process.env.DBURI,
  SECRETKEY: process.env.SECRETKEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default ENV;
