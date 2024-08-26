const adminSchema = require("../model/admin");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const saltRounds = 10;

const loginAdmin = async (req, res) => {
  try {
    const hashUss = crypto
      .createHash("sha256")
      .update(req.body.username)
      .digest("hex");

    const valid = await adminSchema.findOne({
      username: hashUss,
    });

    const compare = await bcrypt.compare(req.body.password, valid.password);

    if (compare) {
      res.status(200);
      res.send(valid.hash);
      console.log(`--------------------------------`);
      console.log(`LOGIN ADMIN ${valid.username} ${new Date()}`);
      console.log(`login berhasil`);
      console.log(`--------------------------------`);
    } else {
      res.status(401).send("login gagal");
      console.log(`--------------------------------`);
      console.log(`LOGIN ADMIN GAGAL ${req.body.username} ${new Date()}`);
      console.log(`login gagal`);
      console.log(`--------------------------------`);
    }
  } catch (error) {
    return res.status(401).send("login gagal");
  }
};

module.exports = { loginAdmin };
