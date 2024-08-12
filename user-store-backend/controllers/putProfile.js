const aafSchema = require("../model/aaf");
const { body, validationResult, check } = require("express-validator");
const putProfile = [
  [
    body("_id").custom(async (value) => {
      const valid = await aafSchema.findOne({ _id: value });
      if (!valid) {
        throw new Error("data tidak ditemukan");
      }
      return true;
    }),
    body("username").custom(async (value, { req }) => {
      const duplicat = await aafSchema.findOne({ username: value });
      if (value !== req.body.oldNama && duplicat) {
        throw new Error("username sudah terdaftar");
      }
      return true;
    }),

    check("email", "Email tidak valid!..").isEmail(),
    check("nohp", "nomor hp anda tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send(result.array());
    } else {
      aafSchema
        .updateOne(
          { _id: req.body._id },
          {
            $set: {
              username: req.body.username,
              name: req.body.name,
              gender: req.body.gender,
              email: req.body.email,
              nohp: req.body.nohp,
              birthdate: req.body.birthdate,
            },
          }
        )
        .then((result) => {
          const sending = [
            {
              msg: "Data Berhasil Diubah",
            },
          ];

          res.send(sending);
          console.log(`--------------------------------`);
          console.log(`PERUBAHAN DATA USER ${req.body.oldNama} ${new Date()}`);
          console.log(req.body);
          console.log(`--------------------------------`);
        });
    }
  },
];

module.exports = { putProfile };
