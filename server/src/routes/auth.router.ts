import { Router } from "express";

import AuthController from "../controllers/auth.controller";
import loginLimiter from "../middleware/loginLimiter";

const router: Router = Router();

router.post("/login", loginLimiter, AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/refresh", AuthController.refresh);

export default router;
