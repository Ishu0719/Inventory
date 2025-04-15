import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const stockSchema = new Schema({
    
   product_Id:{ type:String},
   quantities:{ type: Number},
   restock_Date:{ type:Date },
   reorder_Level:{ type :Number},
  

   


}, { timestamps: true }); // Correct placement of timestamps

const Stock = model('Stock', stockSchema);

export default Stock;
