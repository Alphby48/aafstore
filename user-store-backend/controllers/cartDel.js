const cartSchema = require("../model/cart");
const cartDel = async (req, res) => {
  try {
    const valid = await cartSchema.findOne({ org: req.body.org });
    if (valid) {
      const exitingProd = valid.idCart.filter((s) => s.idP !== req.body.idP);
      const updateCart = await cartSchema.updateOne(
        { org: req.body.org },
        { idCart: exitingProd }
      );
      res.send("berhasil di hapus");
      console.log(updateCart);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { cartDel };
