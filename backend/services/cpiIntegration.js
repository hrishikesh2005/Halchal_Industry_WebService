const axios = require("axios");

/**
 * Pushes an order to SAP Cloud Integration (CPI) as a fire-and-forget webhook.
 * Never throws — CPI availability must never affect the order flow.
 */
async function pushOrderToCPI(order) {
  const { CPI_ORDER_ENDPOINT, CPI_CLIENT_ID, CPI_CLIENT_SECRET } = process.env;

  if (!CPI_ORDER_ENDPOINT || !CPI_CLIENT_ID || !CPI_CLIENT_SECRET) {
    console.error("CPI push skipped: missing CPI_ORDER_ENDPOINT/CPI_CLIENT_ID/CPI_CLIENT_SECRET env vars");
    return;
  }

  // Raw order data only — no invoice numbering, HSN lookup, GST split, or
  // seller master data here. That enrichment happens in the CPI iFlow.
  const payload = {
    orderId:    order._id.toString(),
    orderDate:  order.created_at,
    status:     order.status,
    requiresApproval: order.requires_approval,

    customer: {
      name:      order.customer_name,
      email:     order.customer_email,
      phone:     order.phone,
      sessionId: order.session_id,
    },

    delivery: {
      address: order.delivery_address,
      pincode: order.pincode,
      state:   order.region,
    },

    lineItem: {
      product:           order.pipe_type,
      quantity:          order.quantity,
      unitPriceApproved: order.approved_price,
      unitPriceFinal:    order.final_price,
      discountPercent:   order.discount_percent,
    },

    amounts: {
      taxableValue: order.total_ex_gst,
      gstRate:      order.gst_rate,
      gstAmount:    order.total_gst,
      grandTotal:   order.total_with_gst,
    },

    payment: {
      method:            order.payment_method,
      status:            order.payment_status,
      razorpayPaymentId: order.payment_id,
      razorpayOrderId:   order.razorpay_order_id,
    },
  };

  try {
    await axios.post(CPI_ORDER_ENDPOINT, payload, {
      auth: {
        username: CPI_CLIENT_ID,
        password: CPI_CLIENT_SECRET,
      },
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 8000,
    });
  } catch (error) {
    console.error(`CPI push failed for order ${payload.orderId}:`, error.message);
  }
}

module.exports = { pushOrderToCPI };
