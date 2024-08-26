const mongoose = require("mongoose");

const adminSchema = mongoose.model("admin", {
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
  },
});

module.exports = adminSchema;
