const { body, validationResult, check } = require("express-validator");
const aafSchema = require("../model/aaf");

const register = [
  [
    body("username").custom(async (value) => {
      const duplikat = await aafSchema.findOne({ username: value });
      if (duplikat) {
        throw new Error("Username sudah terdaftar");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(errors.array());
    } else {
      const database = {
        ip: req.ip,
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: new Date(),
      };
      aafSchema.create(database).then((result) => {
        console.log(`--------------------------------`);
        console.log(`PENAMBAHAN DATA BARU ${new Date()}`);
        console.log(result);
        console.log(`--------------------------------`);
        const sending = [
          {
            msg: "Data Berhasil di Registrasi",
          },
        ];
        res.send(sending);
      });
    }
  },
];

module.exports = { register };
