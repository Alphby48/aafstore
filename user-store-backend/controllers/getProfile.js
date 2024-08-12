const aafSchema = require("../model/aaf");
const getProfile = async (req, res) => {
  try {
    const profile = await aafSchema.findOne({ _id: req.params.us });
    if (!profile) {
      return res.send([
        { _id: "000", msg: "nyari apa sih....? mau liat API ?" },
      ]);
    }
    res.send([profile]);
  } catch (error) {
    return res.send([{ _id: "000", msg: "nyari apa sih....? mau liat API ?" }]);
  }
};

module.exports = { getProfile };
