import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  addDonor,
  getMyDonor,
  updateDonor,
  deleteDonor,
} from "../controllers/donotController.js";

const router = Router();

// router.get("/", signup);
router.get("/mydonor", protectRoute, getMyDonor);
router.post("/add-donor", protectRoute, addDonor);
router.put("/:id", protectRoute, updateDonor);
router.delete("/:id", protectRoute, deleteDonor);

export default router;
