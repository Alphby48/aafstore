const express = require("express");
// const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { body, validationResult, check } = require("express-validator");
const methodeOverride = require("method-override");

// Access Database
require("./utils/db");
const aafSchema = require("./model/aaf");
const productSchema = require("./model/products");

// connection

const app = express();
const port = 3000;
app.use(
  cors({
    origin: ["http://192.168.1.80:5173", "http://192.168.1.80:3000"],
  })
);
app.use(express.json());

// Setup method override
app.use(methodeOverride("_method"));

// Setup engine

app.set("view engine", "ejs");
// app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// setup flash

app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//

app.get("/", async (req, res) => {
  const data = await aafSchema.find();
  res.send("ngapain?....");
});

// register

app.post(
  "/auth",
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
  }
);

// login
app.post("/login", async (req, res) => {
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
});

// products

app.get("/products", async (req, res) => {
  const product = await productSchema.find();
  res.send(product);
});

// profile

app.get("/profile", async (req, res) => {
  const profile = await aafSchema.find();
  res.send(profile);
});

// edit profile
app.put(
  "/profile",
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
        throw new Error("nama contact sudah terdaftar");
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
  }
);

// change password

app.put(
  "/change-password",
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
  }
);

//404

app.use((req, res) => {
  res.status(404);
  res.send("404 not found");
});

// run
app.listen(port, "0.0.0.0", () => {
  console.log(`listening at http://localhost:${port}`);
  console.log(`listening at http://192.168.1.80:${port}`);
});
