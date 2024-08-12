const express = require("express");
const { Uploaded } = require("./controllers/upoadImage.js");
const { deleteAccount } = require("./controllers/deleteAccount.js");
const { register } = require("./controllers/registrasiAccount.js");
const { login } = require("./controllers/loginAccount.js");
const { getProducts } = require("./controllers/getProducts.js");
const { getProfile } = require("./controllers/getProfile.js");
const { putProfile } = require("./controllers/putProfile.js");
const { changePassword } = require("./controllers/changePassword.js");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodeOverride = require("method-override");

// Access Database
require("./utils/database");
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
