const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  pipe_type:        { type: String, required: true },
  quantity:         { type: Number, required: true },
  region:           { type: String, required: true },
  status:           { type: String, default: "Pending" },
  requires_approval:{ type: Boolean, default: false },

  // AI pricing snapshot — captured at time of order
  approved_price:   Number,   // per-coil AI price before discount
  final_price:      Number,   // per-coil after bulk discount
  discount_percent: Number,
  total_ex_gst:     Number,
  total_gst:        Number,
  total_with_gst:   Number,
  gst_rate:         { type: Number, default: 12 },

  // ML context snapshot
  season:           String,
  zone:             String,
  predicted_demand: Number,

  session_id:       String,
  payment_id:       String,   // Razorpay payment ID
  razorpay_order_id: String,  // Razorpay order ID
  created_at:       { type: Date, default: Date.now },

  // Customer + delivery details captured at checkout
  customer_name:    String,
  customer_email:   String,
  delivery_address: String,
  phone:            String,
  pincode:          String,

  // Payment — Razorpay is in test mode, so real money never actually moves.
  // payment_status stays "Pending" regardless of method until fulfilled manually.
  payment_method:   { type: String, enum: ["Cash", "Online"], default: "Cash" },
  payment_status:   { type: String, default: "Pending" },
});

module.exports = mongoose.model("Order", orderSchema);
