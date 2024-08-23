const cartSchema = require("../model/cart");
const CartDelMany = async (req, res) => {
  try {
    const valid = await cartSchema.findOne({ org: req.params.id });
    if (valid) {
      const exitingProd = valid.idCart.filter(
        (ex) => !req.body.some((s) => s.idP === ex.idP)
      );
      const updateCart = await cartSchema.updateOne(
        { org: req.params.id },
        { idCart: exitingProd }
      );

      res.send("berhasi di hapus");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { CartDelMany };
