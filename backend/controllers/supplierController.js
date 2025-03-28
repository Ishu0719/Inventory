
import Supplier from "../models/supplier.js";

export const createSupplier = async (req, res) => {
    try {
        const {  supplier_Name,
        email,
        mobile_Number,
        address,
        status
              } = req.body;
        if(!supplier_Name || !email|| !mobile_Number || !address || !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Supplier.create({ supplier_Name,
            email,
            mobile_Number,
            address,
            status})
        res.status(201).json({
            message: 'supplier created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the supplier', details: error.message });
    }
};

export const getAllSupplier = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getSupplierById = async (req, res) => {
    try {
        const supplierId = req.params.id;
        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
            return res.status(404).json({ message: 'supplier id not found' });
        }
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSupplier = async (req, res) => {
    try {
        const { supplier_Name,
            email,
            mobile_Number,
            address,
            status
            } = req.body;
        const supplierId = req.params.id; 

        const existingSupplier= await Supplier.findById(supplierId);
        if (!existingSupplier) {
            return res.status(404).json({ message: 'supplier not found' });
        }

        const updateData = {
           supplier_Name,
           email,
           mobile_Number,
           address,
           status
           
        };

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            supplierId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'supplier updated successfully',
            supplier: updatedSupplier
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteSupplier = async (req, res) => {
    try {
        const supplierId = req.params.id; 
        const deletedSuppliers = await Supplier.findByIdAndDelete(supplierId); 
        if (!deletedSuppliers) {
            return res.status(404).json({ message: 'supplier not found' });
        }
        res.json({ message: 'supplier deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};