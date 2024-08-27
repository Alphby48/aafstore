const adminSchema = require("../model/admin");
const getAdmin = async (req, res) => {
  try {
    const admin = await adminSchema.findOne({ hash: req.params.id });
    const sendLog = { hash: admin.hash, js: "js" };
    res.send([sendLog]);
  } catch (error) {
    const sendGagal = { hash: "gagal", js: "js" };
    res.send([sendGagal]);
  }
};

module.exports = { getAdmin };
