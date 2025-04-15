
import Purchase from "../models/purchase.js";


export const createPurchase = async (req, res) => {
    try {
        const { supplier_Id,order_Date,expected_Date,status } = req.body;
        if(!supplier_Id || !order_Date || !expected_Date ||  !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Purchase.create({ supplier_Id,order_Date,expected_Date,status})
        res.status(201).json({
            success: true,
            message: 'Purchase created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the order', details: error.message });
    }
};

export const getAllPurchase= async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getPurchaseById = async (req, res) => {
    try {
        const purchaseId = req.params.id;
        const purchase = await Purchase.findById(purchaseId);
        if (!purchase) {
            return res.status(404).json({
                success:false,
                message: 'purchaseid not found' });
        }
        res.json(purchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePurchase = async (req, res) => {
    try {
        const { supplier_Id,order_Date,expected_Date,status
             } = req.body;
        const purchaseId = req.params.id; 

        const existingPurchase= await Purchase.findById(purchaseId);
        if (!existingPurchase) {
            return res.status(404).json({ 
                success:false,
                message: 'Branch not found' });
        }

        const updateData = {
            supplier_Id,order_Date,expected_Date,status
        };

        const updatedPurchase = await Purchase.findByIdAndUpdate(
            purchaseId,
            updateData,
            { new: true } 
        );

        res.json({
            success: true,  
            message: 'purchase updated successfully',
            product: updatedPurchase
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deletePurchase = async (req, res) => {
    try {
        const purchaseId = req.params.id; 
        const deletedPurchase = await Purchase.findByIdAndDelete(purchaseId); 
        if (!deletedPurchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.json({
            success: true,
            message: 'Purchase deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};