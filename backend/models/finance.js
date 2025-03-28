import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const financeSchema = new Schema({
   name:{ type:String},
   amount:{ type: Number},
   transaction:{ type:String },
   category:{ type :String},
   payment_Mode:{ type :String},
   status:{type:String},

   


}, { timestamps: true }); // Correct placement of timestamps

const finance = model('finance', financeSchema);

export default finance;
