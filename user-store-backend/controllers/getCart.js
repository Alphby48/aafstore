const cartSchema = require("../model/cart");
const getCart = async (req, res) => {
  try {
    const valid = await cartSchema.findOne({ org: req.params.us });
    if (valid) {
      return res.send([valid]);
    } else {
      res.send("data tidak ditemukan");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getCart };
