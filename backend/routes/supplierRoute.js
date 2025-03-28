import express from 'express';
import { createSupplier, getAllSupplier, getSupplierById, updateSupplier, deleteSupplier } from "../controllers/supplierController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createSupplier", createSupplier);
router.get("/getAllSupplier", getAllSupplier);
router.get("/getSupplierById/:id", getSupplierById);
router.put("/updateSupplier/:id",  updateSupplier);
router.delete("/deleteSupplier/:id", deleteSupplier);

export default router;