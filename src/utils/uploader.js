import cloudinary from "../config/cloudinary.js";

const uploader = async (image) => {
  let result = [];

  for (const filePath of image) {
    const path = await cloudinary.uploader.upload(filePath);

    result.push(path.secure_url);
  }

  return result;
};

export default uploader;
