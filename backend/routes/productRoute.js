import express from 'express';
import { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createProduct", createProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getProductById/:id", getProductById);
router.put("/updateProduct/:id",  updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;