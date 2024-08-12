const aafSchema = require("../model/aaf");
const fs = require("fs");
const path = require("path");

const deleteAccount = async (req, res) => {
  try {
    const valid = await aafSchema.findOne({ _id: req.body._id });
    if (valid) {
      aafSchema
        .deleteOne({ _id: req.body._id })
        .then((result) => {
          res.send(`data telah dihapus ${valid.username}`);
          console.log(`--------------------------------`);
          console.log(`HAPUS DATA USER ${valid.username} ${new Date()}`);
          console.log(`--------------------------------`);
        })
        .catch((err) => {
          console.log(err);
        });

      const fileImg = req.body.imageUrl;
      const filepath = path.join(__dirname, "../public/uploads", fileImg);
      if (fs.existsSync(filepath)) {
        return fs.unlinkSync(filepath);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { deleteAccount };
