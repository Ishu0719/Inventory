import Stock from "../models/stock.js";

export const createStock = async (req, res) => {
    try {
        const { product_Id, quantities, restock_Date, reorder_Level } = req.body;

        if (!product_Id|| !quantities || !restock_Date ||  !reorder_Level) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        const newStock = await Stock.create({ product_Id, quantities, restock_Date, reorder_Level });

        res.status(201).json({
            success: true,
            message: 'Stock created successfully',
            stock: newStock
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving the stock', error: error.message });
    }
};

export const getAllStock = async (req, res) => {
    try {
        const stocks = await Stock.find();
       res.json({ success: true, stocks });   
     
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving stocks', error: error.message });
    }
};

export const getStockById = async (req, res) => {
    try {
        const stockId = req.params.id;
        const stock = await Stock.findById(stockId);

        if (!stock) {
            return res.status(404).json({ success: false, message: 'Stock not found' });
        }

        res.json({ success: true, stock });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving the stock', error: error.message });
    }
};

export const updateStock = async (req, res) => {
    try {
        const {product_Id,quantities,restock_Date,reorder_Level} = req.body;
        const stockId = req.params.id;

        const existingStock = await Stock.findById(stockId);
        if (!existingStock) {
            return res.status(404).json({ success: false, message: 'Stock not found' });
        }

        const updatedStock = await Stock.findByIdAndUpdate(
            stockId,
            { product_Id, quantities, restock_Date, reorder_Level },
            { new: true }
        );

        res.json({ success: true, message: 'Stock updated successfully', stock: updatedStock });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating the stock', error: error.message });
    }
};

export const deleteStock = async (req, res) => {
    try {
        const stockId = req.params.id;
        const deletedStock = await Stock.findByIdAndDelete(stockId);

        if (!deletedStock) {
            return res.status(404).json({ success: false, message: 'Stock not found' });
        }

        res.json({ success: true, message: 'Stock deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting the stock', error: error.message });
    }
};
