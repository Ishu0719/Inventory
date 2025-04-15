import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const purchaseSchema = new Schema({
  supplier_Id:{type:String},
  order_Date:{type:Date},
  expected_Date:{type:Date},
  status:{type:String}
   
}, { timestamps: true }); // Correct placement of timestamps

const Purchase= model('Puchase', purchaseSchema);

export default Purchase;
