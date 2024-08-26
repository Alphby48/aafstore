const productsSchema = require("../model/products");
const adminSchema = require("../model/admin");

const getProductsAdmin = async (req, res) => {
  try {
    const valid = await adminSchema.findOne({ hash: req.params.id });
    if (valid) {
      const products = await productsSchema.find();
      return res.send(products);
    } else {
      return res.send("data tidak ditemukan");
    }
  } catch (error) {
    return res.send("data tidak ditemukan");
  }
};

module.exports = { getProductsAdmin };
