const adminSchema = require("../model/admin");
const productsSchema = require("../model/products");
const path = require("path");
const fs = require("fs");

const deleteProduct = async (req, res) => {
  try {
    const valid = await adminSchema.findOne({ _id: req.body.idAdmin });

    if (valid) {
      const deleteProduct = await productsSchema
        .deleteOne({ _id: req.body._id })
        .then((result) => {
          res.send("data telah di hapus");
        });

      const fileImg = req.body.imageUrl;
      const filepath = path.join(__dirname, "../public/produkImg", fileImg);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }

      console.log(`--------------------------------`);
      console.log(`HAPUS DATA PRODUCT ${req.body._id} ${new Date()}`);
      console.log(`--------------------------------`);
    } else {
      res.send("data tidak ditemukan");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { deleteProduct };
