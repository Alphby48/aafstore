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
});

module.exports = adminSchema;
