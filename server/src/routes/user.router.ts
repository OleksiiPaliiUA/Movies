import { Router } from "express";

import UserController from "../controllers/user.controller";

const router = Router();

router.post("/user", UserController.createUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);
router.get("/user/:id", UserController.getUserById);
router.get("/users", UserController.getUsers);

export default router;
