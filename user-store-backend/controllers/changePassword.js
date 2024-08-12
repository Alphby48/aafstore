const aafSchema = require("../model/aaf");
const { body, validationResult, check } = require("express-validator");
const changePassword = [
  [
    body("oldPassword").custom(async (value, { req }) => {
      const valid = await aafSchema.findOne({
        _id: req.body._id,
        password: value,
      });
      if (!valid) {
        throw new Error("password lama tidak sesuai");
      }
    }),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(401).send(result.array());
    } else {
      aafSchema
        .updateOne(
          { _id: req.body._id },
          {
            $set: {
              password: req.body.password,
            },
          }
        )
        .then((result) => {
          const sending = [
            {
              msg: "Password Berhasil Diubah",
            },
          ];
          res.status(200).send(sending);
          console.log(`--------------------------------`);
          console.log(
            `PERGANTIAN PASSWORD DARI ID ${req.body._id} ${new Date()}`
          );
          console.log(req.body);
          console.log(`--------------------------------`);
        });
    }
  },
];

module.exports = { changePassword };
