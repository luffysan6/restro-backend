import FoodModel from "../model/Food.model.js";
import uploader from "../utils/uploader.js";
import mongoose from "mongoose";

export const Index = async (req, res) => {
  try {
    res.status(200).json({
      message: "Welcome From Food Api",
      success: true,
    });
  } catch (error) {
    console.log("Error At Food / \t", error.message);
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};

export const SaveFood = async (req, res) => {
  try {
    const { title, price, description, category, status } = req.body || {};
    let FileData = req.files || [];

    console.log(req.body);
    console.log(req.files);

    if (
      !title?.trim() ||
      !description?.trim() ||
      !category?.trim() ||
      price == null
    ) {
      return res.status(400).json({
        message: "Provide all required fields",
      });
    }

    const PhotoPathArray = FileData.length
      ? FileData.map((file) => file.path)
      : [];

    let imageResult = [];
    if (PhotoPathArray.length) {
      imageResult = await uploader(PhotoPathArray);
    }

    const foodData = new FoodModel({
      title,
      description,
      price,
      category,
      status: status ? "ACTIVE" : "DEACTIVE",
      images: imageResult,
    });

    const result = await foodData.save();

    res.json(result);
  } catch (error) {
    console.log("Error At Food / \t", error);
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};

export const GetAllFood = async (req, res) => {
  try {
    const result = await FoodModel.find();
    if (!result) {
      return res.status(404).json({
        message: "Please Add Some Menu",
        success: false,
      });
    }

    return res.status(200).json({
      data: result,
      success: true,
    });
  } catch (error) {
    console.log("Error At Food / \t", error.message);
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};

export const updateFood = async (req, res) => {
  try {
    const { id } = req.params || "";
    const updateData = req.body;
    const newImages = req.files;

    const checkid = mongoose.isValidObjectId(id);

    if (!checkid || id.length == 0 || id == undefined) {
      return res.status(404).json({
        message: "Problem With ObjectID",
        success: false,
      });
    }

    const result = await FoodModel.findById(id);

    if (!result) {
      return res.status(404).json({
        message: "Not Found",
        success: false,
      });
    }
    if (newImages.length > 0) {
      const PhotoPathArray = newImages.map((file) => file.path);

      let imageResult = await uploader(PhotoPathArray);
      let imageData = result.images;
      let images = imageResult.concat(imageData);
      // updateData.assign = images;
      Object.assign(updateData, { images: images });
    }

    const updatedMenu = await FoodModel.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });

    return res.status(200).json({
      message: "Data Update succesfully",
      success: true,
      data: updatedMenu,
    });

    // if(new)
  } catch (error) {
    console.log(error);
    console.log("Error At Food / \t", error.message);
    if (error.name == "CastError") {
      return res.status(500).json({
        message: "Invalid ObjectID",
        success: false,
      });
    }

    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const checkid = mongoose.isValidObjectId(id);

    if (!checkid || id.length == 0 || id == undefined) {
      return res.status(404).json({
        message: "Problem With ObjectID",
        success: false,
      });
    }

    const result = await FoodModel.findByIdAndDelete(id);

    return res.send(result);
  } catch (error) {
    console.log("Error At Food / \t", error.message);
    if (error.name == "CastError") {
      return res.status(500).json({
        message: "Invalid ObjectID",
        success: false,
      });
    }
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};
