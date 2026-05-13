import OrderModel from "../model/Order.model.js";

export const CreateOrder = async (req, res) => {
  try {
    const { items, totalAmount, status } = req.body;
    const userID = req.user;

    let newOrder = new OrderModel({
      user: userID,
      items,
      totalAmount,
      status,
    });
    const result = await newOrder.save();

    res.json({ message: "Order Create SuccessFully", success: true, result });
  } catch (error) {
    console.log("Error At Order / \t", error);
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};

export const GetAllOrderAdmin = async (req, res) => {
  try {
    // const result = await OrderModel.find();
    const orders = await OrderModel.find().populate([
      { path: "user", select: "email name -_id" },
      { path: "items.food", select: "title price -_id" },
    ]);

    res.json({ orders });

    // res.json({ message: "Order Create SuccessFully", success: true, result });
  } catch (error) {
    console.log("Error At Order / \t", error);
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};

export const GetAllOrderUser = async (req, res) => {
  try {
    // const result = await OrderModel.find();

    const id = req.user;
    const orders = await OrderModel.find({ user: id }).populate([
      { path: "user", select: "email name -_id" },
      { path: "items.food", select: "title price -_id" },
    ]);

    res.json({ orders });

    // res.json({ message: "Order Create SuccessFully", success: true, result });
  } catch (error) {
    console.log("Error At Order / \t", error);
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};

export const DeleteOrderById = async (req, res) => {
  try {
    // const result = await OrderModel.find();
    const { id } = req.params;
    const orders = await OrderModel.findByIdAndDelete(id);

    res.json({ orders });

    // res.json({ message: "Order Create SuccessFully", success: true, result });
  } catch (error) {
    console.log("Error At Order / \t", error);
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};

export const CancelOrderForUser = async (req, res) => {
  try {
    // const result = await OrderModel.find();
    const { id } = req.params;
    const orders = await OrderModel.findByIdAndUpdate(
      id,
      { status: "CancelByUser" },
      {
        new: true,
      },
    );

    res.json({ orders });

    // res.json({ message: "Order Create SuccessFully", success: true, result });
  } catch (error) {
    console.log("Error At Order / \t", error);
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    // const result = await OrderModel.find();
    const status = req.body?.status || "";
    const { id } = req.params;
    // console.log(typeof status);
    if (status.length <= 0)
      return res
        .status(400)
        .json({ message: "incorrect update", success: false });
    const orders = await OrderModel.findByIdAndUpdate(
      id,
      { status: status },
      {
        returnDocument: "after",
      },
    );

    res.json({ orders });

    // res.json({ message: "Order Create SuccessFully", success: true, result });
  } catch (error) {
    console.log("Error At Order / \t", error);
    return res.status(500).json({
      message: "Error at Server",
      success: false,
    });
  }
};
