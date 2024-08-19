const express = require("express");
const { Uploaded } = require("./controllers/upoadImage.js");
const { deleteAccount } = require("./controllers/deleteAccount.js");
const { register } = require("./controllers/registrasiAccount.js");
const { login } = require("./controllers/loginAccount.js");
const { getProducts } = require("./controllers/getProducts.js");
const { getProfile } = require("./controllers/getProfile.js");
const { putProfile } = require("./controllers/putProfile.js");
const { changePassword } = require("./controllers/changePassword.js");
const { cartUp } = require("./controllers/cartUp.js");
const { cartDel } = require("./controllers/cartDel.js");
const { getCart } = require("./controllers/getCart.js");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodeOverride = require("method-override");

// Access Database
require("./utils/database");
const cartSchema = require("./model/cart");
const adminSchema = require("./model/admin");
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
  res.send("daripada liatin API orang. Mending liat JKT48");
});

// register

app.post("/auth", register);

// login

app.post("/login", login);

// products

app.get("/products/:us", getProducts);

// delete profile

app.delete("/profile", deleteAccount);

// profile

app.get("/profile/:us", getProfile);

// edit profile

app.put("/profile", putProfile);

// change password

app.put("/change-password", changePassword);

// post img

app.put("/upload", Uploaded);

// add cart

app.put("/cart", cartUp);

// delete cart

app.delete("/cart", cartDel);

// get cart

app.get("/cart/:us", getCart);

// admin login

app.post("/auth-admin", async (req, res) => {
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
});

// get admin

app.get("/admin/:id", async (req, res) => {
  try {
    const admin = await adminSchema.findOne({ _id: req.params.id });
    res.send(admin._id);
  } catch (error) {
    res.send(`Tidak Ada Data`);
  }
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
