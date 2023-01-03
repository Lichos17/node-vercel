import { model, Schema, Document } from "mongoose";

const productCategories = ["refrescos", "galletas"] as const;
type ProductCategories = typeof productCategories[number];

export interface Product extends Document {
  name: string;
  description: string;
  category: ProductCategories;
  price: number;
  created_at: Date;
  updated_at: Date;
}

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: productCategories,
  },
  price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export default model<Product>("Product", productSchema);
