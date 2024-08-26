const adminSchema = require("../model/admin");
const getAdmin = async (req, res) => {
  try {
    const admin = await adminSchema.findOne({ hash: req.params.id });
    res.send(admin.hash);
  } catch (error) {
    res.send(`Tidak Ada Data`);
  }
};

module.exports = { getAdmin };
