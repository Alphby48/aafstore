// Setup multer
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const aafSchema = require("../model/aaf");

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
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, setFile(file));
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
      if (fs.existsSync(filepath) && req.file) {
        fs.unlinkSync(filepath);
      }
    } catch (err) {
      console.log("gak ada data. jadi langsung tambah");
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const filePath = `${req.file.filename}`;
    // res.json({ imageUrl: filePath });
    try {
      const up = await aafSchema.updateOne(
        { _id: req.body.id },
        { $set: { imageUrl: filePath } }
      );
      console.log(`--------------------------------`);
      console.log(`UPLOAD IMAGE ${req.body.id} ${new Date()}`);
      console.log(`--------------------------------`);
      res.send(`Photo sudah diupload`);
    } catch (err) {
      return res.status(500).send("Error updating database.");
    }
  },
];

module.exports = { Uploaded };
