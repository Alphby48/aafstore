const multer = require("multer");
const fs = require("fs");
const path = require("path");
const productsSchema = require("../model/products");
function setFile(file) {
  const date = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Format yang dihasilkan: MM/DD/YYYY, HH:MM:SS
  const [month, day, year] = date.split(", ")[0].split("/");
  const [hours, minutes, seconds] = date.split(", ")[1].split(":");

  // Membuat nama file baru dengan format WIB
  const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  const newFilename = `${timestamp}-${file.originalname}`;

  return newFilename;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/produkImg");
  },
  filename: (req, file, cb) => {
    cb(null, setFile(file));
  },
});
const upload = multer({ storage: storage });

//
const addProductAdmin = [
  upload.single("image"),
  async (req, res) => {
    try {
      const addProd = await productsSchema.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.file.filename,
        category: req.body.category,
        date: new Date(),
      });

      res.send("product telah ditambahkan");
      console.log(`--------------------------------`);
      console.log(`PENAMBAHAN DATA BARU oleh admin ${new Date()}`);
      console.log(addProd);
      console.log(`--------------------------------`);
    } catch (err) {
      console.log(err);
    }
  },
];

module.exports = { addProductAdmin };
