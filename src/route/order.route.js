import { Router } from "express";
import {
  CancelOrderForUser,
  CreateOrder,
  GetAllOrderAdmin,
  GetAllOrderUser,
  updateOrderStatus,
} from "../controller/order.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", authMiddleware, roleMiddleware("admin"), GetAllOrderAdmin); // secure
router.get(
  "/user/",
  authMiddleware,
  roleMiddleware("user"),
  GetAllOrderUser,
); // secure
router.post("/", authMiddleware,roleMiddleware("user"), CreateOrder); // secure
// router.delete("/:id", authMiddleware, roleMiddleware("admin"), DeleteOrderById); // secure
router.post(
  "/order/:id",
  authMiddleware,
  roleMiddleware("user"),
  CancelOrderForUser,
);
router.post(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateOrderStatus,
); // secure
// anyone can make reqest to this api
// we need secure them
// router.post("/:id", "update order status for admin");

export default router;
