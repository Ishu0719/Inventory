import express from 'express';
import { createStock, getAllStock, getStockById, updateStock, deleteStock } from "../controllers/stockController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createStock", createStock);
router.get("/getAllStock", getAllStock);
router.get("/getStockById/:id", getStockById);
router.put("/updateStock/:id",  updateStock);
router.delete("/deleteStock/:id", deleteStock);

export default router;