const adminSchema = require("../model/admin");
const getAdmin = async (req, res) => {
  try {
    const admin = await adminSchema.findOne({ _id: req.params.id });
    res.send(admin._id);
  } catch (error) {
    res.send(`Tidak Ada Data`);
  }
};

module.exports = { getAdmin };
