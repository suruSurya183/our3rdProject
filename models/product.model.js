import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    venderId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    itemId: { type: String },
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    photos: [
      {
        type: Object,
        default: {
          fileId: "",
          url: "",
        },
      },
    ],
    quantityInStock: { type: Number, required: true },
    offers: { type: Number },
    disabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;


