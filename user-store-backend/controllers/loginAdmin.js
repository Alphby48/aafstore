const adminSchema = require("../model/admin");
const loginAdmin = async (req, res) => {
  const valid = await adminSchema.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (valid) {
    res.status(200);
    res.send(valid._id);
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
};

module.exports = { loginAdmin };
