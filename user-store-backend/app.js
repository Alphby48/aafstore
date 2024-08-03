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
