const aafSchema = require("../model/aaf");
const adminSchema = require("../model/admin");
const getUsersAdmin = async (req, res) => {
  try {
    const valid = await adminSchema.findOne({ hash: req.params.id });
    if (valid) {
      const users = await aafSchema.find();
      res.send(users);
    } else {
      res.send("data tidak ditemukan");
    }
  } catch (error) {
    res.send("data tidak ditemukan");
  }
};

module.exports = { getUsersAdmin };
