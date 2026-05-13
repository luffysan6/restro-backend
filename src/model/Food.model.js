import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "DEACTIVE"],
      required: true,
    },
  },
  {
    timeStamps: true,
  },
);

const FoodModel = mongoose.model("food", foodSchema);

export default FoodModel;
