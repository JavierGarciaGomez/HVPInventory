const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs"); // calling ejs

app.use(express.static("public")); // calling public files

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); // using bodyparser

// Mongoose
mongoose.connect("mongodb://localhost:27017/hvpInventory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: [true, "Name is required"],
  },
  urban_storage_stock: Number,
  urban_counter_stock: Number,
  urban_counter_stock_min: Number,
  urban_counter_stock_rec: Number,
  urban_stock_min: Number,
  urban_stock_rec: Number,
  harbor_storage_stock: Number,
  harbor_counter_stock: Number,
  harbor_counter_stock_min: Number,
  harbor_counter_stock_rec: Number,
  harbor_stock_min: Number,
  harbor_stock_rec: Number,
  montejo_stock: Number,
  montejo_stock_min: Number,
  montejo_stock_rec: Number,
});

// Model
// the first parameter (Product) is the individual of the collection (products)
// the second parameter is the schema
const Product = mongoose.model("Product", productSchema);

// The object
const product = new Product({
  product_name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit",
});

product.save();

// 336 save the object
// fruit.save();

////////////////// 337 Reading
Product.find((err, products) => {
  if (err) {
    console.log(err);
  } else {
    console.log(products);
  }
});

// 339 update and delete
Product.updateOne(
  {
    _id: "5ff65bb46405dc31acce533b",
  },
  {
    name: "Peach",
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("succesfully updated");
    }
  }
);

// 339 delete
Product.deleteOne(
  {
    name: "Peach",
  },
  (err) => {
    //
  }
);

// app.get("/", (req, res) => res.send("Hello"));
// to render ejs
app.get("/", (req, res) =>
  res.render("index", {
    foo: "FOO",
  })
);

app.post("/", (req, res) => {
  console.log(req.body);
  let product_name = req.body.product_name;
  console.log(product_name);
  res.render("test", {
    foo: "FOO",
  });
});

app.listen(3000, () => console.log("Server started onr port 3000"));
