import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema({
  title: String,
  description: String,
  isCompleted: { type: Boolean, default: false },
  user_id: mongoose.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
})

export default new mongoose.model("Transaction", transactionSchema);