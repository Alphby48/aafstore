const mongoose = require("mongoose");
// const productsSchema = require("../model/products");
mongoose.connect(
  "mongodb+srv://denzuko743:elingBali573cV@cluster0.tcn8pic.mongodb.net/aafstore?retryWrites=true&w=majority&appName=Cluster0"
);

// const product = new productsSchema({
//   title: "Panci Stainless Zebra Sauce Pan 20 Cm",
//   description: "test",
//   price: "155000",
//   image:
//     "https://images.tokopedia.net/img/cache/900/VqbcmM/2021/8/21/4077fefa-01a0-4b0d-be3d-00a00c4dc33c.png",
//   category: "kitchen",
//   for: "-",
// });

// product.save().then((res) => console.log(res));
