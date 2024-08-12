const aafSchema = require("../model/aaf");

const login = async (req, res) => {
  const valid = await aafSchema.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (valid) {
    res.status(200);
    res.send(valid);
    console.log(`--------------------------------`);
    console.log(`LOGIN BARU DARI ${valid.username} ${new Date()}`);
    console.log(`login berhasil`);
    console.log(`--------------------------------`);
  } else {
    res.status(401).send("login gagal");
    console.log(`--------------------------------`);
    console.log(`LOGIN GAGAL DARI ${req.body.username} ${new Date()}`);
    console.log(`login gagal`);
    console.log(`--------------------------------`);
  }
};

module.exports = { login };
