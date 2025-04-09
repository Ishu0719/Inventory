
import Banner from "../models/banner.js";

export const createBanner= async (req, res) => {
    try {
        const { banner_Name,
        description,
        img,
        valid_From,
        valid_To,
        status,
      } = req.body;
        if( !banner_Name||
            !description||
            !img||
           ! valid_From||
            !valid_To || !status) {
            return res.status(400).json({ success: false, message: 'All fields are required!' });
        }

        await Banner.create({banner_Name,
            description,
            img,
            valid_From,
            valid_To,
            status,})
        res.status(201).json({
            success: true,
            message: 'banner created successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error saving the banner', details: error.message });
    }
};

export const getAllBanner = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getBannerById = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const banner = await banner.findById(bannerId);
        if (!banner) {
            return res.status(404).json({
                success:false,
                message: 'banner id not found' });
        }
        res.json(banner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBanner = async (req, res) => {
    try {
        const { banner_Name,
            description,
            img,
            valid_From,
            valid_To,
            status, } = req.body;
        const bannerId = req.params.id; 

        const existingBanner= await Banner.findById(bannerId);
        if (!existingBanner) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        const updateData = {
            banner_Name,
        description,
        img,
        valid_From,
        valid_To,
        status,
        };

        const updatedBanner = await Banner.findByIdAndUpdate(
            bannerId,
            updateData,
            { new: true } 
        );

        res.json({
            success:true,
            message: 'banner updated successfully',
            banner: updatedBanner
        });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the branch', details: error.message });
    }
};

export const deleteBanner = async (req, res) => {
    try {
        const bannerId = req.params.id; 
        const deletedBanner = await Banner.findByIdAndDelete(bannerId); 
        if (!deletedBanner) {
            return res.status(404).json({ message: 'banner not found' });
        }
        res.json({
            success:true,
            message: 'banner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};