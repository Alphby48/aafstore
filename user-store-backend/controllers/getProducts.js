const aafSchema = require("../model/aaf");
const productSchema = require("../model/products");
const getProducts = async (req, res) => {
  try {
    const valid = await aafSchema.findOne({ _id: req.params.us });
    if (!valid) {
      return res.send("data tidak ditemukan");
    }
    const product = await productSchema.find();
    res.send(product);
  } catch (error) {
    res.send("data tidak ditemukan");
  }
};

module.exports = { getProducts };
