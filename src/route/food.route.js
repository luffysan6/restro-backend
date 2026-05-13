import { Router } from "express";
import {
  deleteMenu,
  GetAllFood,
  SaveFood,
  updateFood,
} from "../controller/food.controller.js";
import upload from "../middleware/upload.middleware.cjs";
import authMiddleware from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = Router();

router.get("/",authMiddleware, GetAllFood);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.array("images"),
  SaveFood,
); // secure

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteMenu); // secure

router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.array("images"),
  updateFood,
); // secure

export default router;
