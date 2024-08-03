const mongoose = require("mongoose");

const aafSchema = mongoose.model("dataUser", {
  ip: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = aafSchema;
