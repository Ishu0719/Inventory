

import Discount from "../models/discount.js";

export const createDiscount = async (req, res) => {
    try {
        const { code,
        discount_Value,
        description,
       valid_From,
       valid_To,
        status } = req.body;
        if(!code|| !discount_Value|| !description || !valid_From||!valid_To || !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Discount.create( { code,
            discount_Value,
            description,
           valid_From,
           valid_To,
            status
            })
        res.status(201).json({
            message: 'discount created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the discount', details: error.message });
    }
};

export const getAllDiscount = async (req, res) => {
    try {
        const discounts = await Discount.find();
        res.json(discounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getDiscountById = async (req, res) => {
    try {
        const discountId = req.params.id;
        const discount = await discount.findById(discountId);
        if (!discount) {
            return res.status(404).json({ message: 'discount id not found' });
        }
        res.json(discount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDiscount = async (req, res) => {
    try {
        const {  code,
            discount_Value,
            description,
           valid_From,
           valid_To,
            status
             
            } = req.body;
        const discountId = req.params.id; 

        const existingDiscount= await Discount.findById(discountId);
        if (!existingDiscount) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        const updateData = {
             code,
                discount_Value,
                description,
               valid_From,
               valid_To,
                status
           
        };

        const updatedDiscount = await Discount.findByIdAndUpdate(
            discountId,
            updateData,
            { new: true } 
        );

        res.json({
            message: 'discount updated successfully',
            discount: updatedDiscount
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteDiscount = async (req, res) => {
    try {
        const discountId = req.params.id; 
        const deletedDiscount = await Discount.findByIdAndDelete(discountId); 
        if (!deletedDiscount) {
            return res.status(404).json({ message: 'discount not found' });
        }
        res.json({ message: 'discount deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};