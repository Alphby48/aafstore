const crypto = require("crypto");
const adminSchema = require("../model/admin");
const changeUsernameAdmin = async (req, res) => {
  const { oldUsername, newUsername, hash } = req.body;

  try {
    const valid = await adminSchema.findOne({ hash: hash });
    if (valid) {
      const hashUss = crypto
        .createHash("sha256")
        .update(oldUsername)
        .digest("hex");

      const valid2 = valid.username === hashUss;

      if (valid2) {
        const hashUssNew = crypto
          .createHash("sha256")
          .update(newUsername)
          .digest("hex");

        const addDb = await adminSchema.updateOne(
          { hash: hash },
          { $set: { username: hashUssNew } }
        );

        const sendLog = { msg: `username telah di ubah ke ${newUsername}` };

        res.send(sendLog);
      } else {
        const senderr = { msg: "username lama salah" };
        res.send(senderr);
      }
    }
  } catch (error) {
    res.send(`Tidak Ada Data`);
  }
};

module.exports = { changeUsernameAdmin };
