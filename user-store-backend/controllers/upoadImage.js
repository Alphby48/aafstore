// Setup multer
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const aafSchema = require("../model/aaf");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//

const Uploaded = [
  upload.single("img"),
  async (req, res) => {
    try {
      const fileImg = req.body.image;
      const filepath = path.join(__dirname, "../public/uploads", fileImg);
      if (filepath) {
        fs.unlinkSync(filepath);
      }
    } catch (err) {
      console.log("gak ada data. jadi langsung tambah");
    }

    const filePath = `${req.file.filename}`;
    // res.json({ imageUrl: filePath });
    const up = await aafSchema.updateOne(
      { _id: req.body.id },
      { $set: { imageUrl: filePath } }
    );
    console.log(`--------------------------------`);
    console.log(`UPLOAD IMAGE ${req.body.id} ${new Date()}`);
    console.log(`--------------------------------`);
    res.send(`Photo sudah diupload`);
  },
];

module.exports = { Uploaded };
