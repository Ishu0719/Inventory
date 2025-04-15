import express from 'express';
import { createPurchase, getAllPurchase, getPurchaseById, updatePurchase, deletePurchase } from "../controllers/purchaseController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createPurchase", createPurchase);
router.get("/getAllPurchase", getAllPurchase);
router.get("/getPurchaseById/:id", getPurchaseById);
router.put("/updatePurchase/:id",  updatePurchase);
router.delete("/deletePurchase/:id", deletePurchase);

export default router;