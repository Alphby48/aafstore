const bcrypt = require("bcrypt");
const crypto = require("crypto");
const adminSchema = require("../model/admin");
const saltRounds = 10;

const changePasswordAdmin = async (req, res) => {
  const { oldPassword, newPassword, hash } = req.body;

  try {
    const valid = await adminSchema.findOne({ hash: hash });
    if (valid) {
      const compare = await bcrypt.compare(oldPassword, valid.password);
      if (compare) {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPw = await bcrypt.hash(newPassword, salt);
        const output = `${oldPassword}${newPassword}`;
        const outputHash = crypto
          .createHash("sha256")
          .update(output)
          .digest("hex");

        const addDb = await adminSchema.updateOne(
          { hash: hash },
          {
            $set: {
              password: hashPw,
              hash: outputHash,
            },
          }
        );
        const sendLog = { msg: "password telah di ubah" };
        res.send(sendLog);
      } else {
        const senderr = { msg: "password lama salah" };
        res.send(senderr);
      }
    }
  } catch (error) {
    res.send(`Tidak Ada Data`);
  }
};

module.exports = { changePasswordAdmin };
