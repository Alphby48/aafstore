const mongoose = require("mongoose");

const cartSchema = mongoose.model("cart", {
  org: {
    type: String,
    required: true,
  },
  idCart: [
    {
      idP: {
        type: String,
      },
      qty: {
        type: Number,
      },
    },
  ],
});

module.exports = cartSchema;
