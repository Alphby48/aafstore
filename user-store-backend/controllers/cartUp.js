const cartSchema = require("../model/cart");
const cartUp = async (req, res) => {
  try {
    const valid = await cartSchema.findOne({ org: req.body.org });

    if (valid) {
      const exitingProd = valid.idCart.find((s) => s.idP === req.body.idP);

      if (exitingProd) {
        exitingProd.qty += req.body.qty;
      } else {
        valid.idCart.push({ idP: req.body.idP, qty: req.body.qty });
      }

      const updateCart = await cartSchema
        .updateOne({ org: req.body.org }, { idCart: valid.idCart })
        .then((res) => res);

      res.send("berhasil di ubah");
    } else {
      const addCart = await cartSchema.create({
        org: req.body.org,
        idCart: [
          {
            idP: req.body.idP,
            qty: req.body.qty,
          },
        ],
      });
      res.send("berhasil di tambah");
      console.log(addCart);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { cartUp };
