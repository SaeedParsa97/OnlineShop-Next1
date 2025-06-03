import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    image: String,
    description: String,
    category: String,
  },
  { timestamps: true }
);

export default mongoose.model.Product ||
  mongoose.model("Product", ProductSchema);
