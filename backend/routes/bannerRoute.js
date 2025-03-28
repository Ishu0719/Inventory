import express from 'express';
import { createBanner, getAllBanner, getBannerById, updateBanner, deleteBanner } from "../controllers/bannerController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createBanner", createBanner);
router.get("/getAllBanner", getAllBanner);
router.get("/getBannerById/:id", getBannerById);
router.put("/updateBanner/:id",  updateBanner);
router.delete("/deleteBanner/:id", deleteBanner);

export default router;