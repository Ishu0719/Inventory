import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bannerSchema = new Schema({
   banner_Name:{ type:String},
   description:{ type:String },
   img:{type:String},
   valid_From:{ type :Date},
   valid_To:{ type :Date},
   status:{type:String},


   
}, { timestamps: true }); // Correct placement of timestamps

const Banner = model('Banner', bannerSchema);

export default Banner;
