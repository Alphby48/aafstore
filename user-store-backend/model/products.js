const mongoose = require("mongoose");

const productsSchema = mongoose.model("products", {
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  for: {
    type: String,
  },
});

module.exports = productsSchema;
