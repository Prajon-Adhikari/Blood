import { Router } from "express";
import { signin, signup } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", signin);

export default router;
