// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.ObjectId,
//     ref: "Products",
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
// });

// const orderSchema = new mongoose.Schema(
//   {
//     products: [productSchema], 
//     payment: {},
//     buyer: {
//       type: mongoose.ObjectId,
//       ref: "users",
//     },
//     status: {
//       type: String,
//       default: "Processing",
//       enum: ["Processing", "Shipped", "Delivered", "Cancelled"], // Corrected capitalization
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Processing",
      enum: ["Processing", "Shipped", "delivered", "cancelled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);