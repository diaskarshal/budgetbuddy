import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense']
  }
}, {
  timestamps: true
});

export default mongoose.model('Category', CategorySchema); 