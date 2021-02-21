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
  urban_storage_stock: { type: Number, default: 0 },
  urban_counter_stock: { type: Number, default: 0 },
  urban_counter_stock_min: { type: Number, default: 0 },
  urban_counter_stock_rec: { type: Number, default: 0 },
  urban_stock_min: { type: Number, default: 0 },
  urban_stock_rec: { type: Number, default: 0 },
  harbor_storage_stock: { type: Number, default: 0 },
  harbor_counter_stock: { type: Number, default: 0 },
  harbor_counter_stock_min: { type: Number, default: 0 },
  harbor_counter_stock_rec: { type: Number, default: 0 },
  harbor_stock_min: { type: Number, default: 0 },
  harbor_stock_rec: { type: Number, default: 0 },
  montejo_stock: { type: Number, default: 0 },
  montejo_stock_min: { type: Number, default: 0 },
  montejo_stock_rec: { type: Number, default: 0 },
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
  const product_name = req.body.product_name;
  const urban_storage_stock = Number(req.body.urban_storage_stock);
  const urban_counter_stock = Number(req.body.urban_counter_stock);
  const urban_counter_stock_min = Number(req.body.urban_counter_stock_min);
  const urban_counter_stock_rec = Number(req.body.urban_counter_stock_rec);
  const urban_stock_min = Number(req.body.urban_stock_min);
  const urban_stock_rec = Number(req.body.urban_stock_rec);

  const harbor_storage_stock = Number(req.body.harbor_storage_stock);
  const harbor_counter_stock = Number(req.body.harbor_counter_stock);
  const harbor_counter_stock_min = Number(req.body.harbor_counter_stock_min);
  const harbor_counter_stock_rec = Number(req.body.harbor_counter_stock_rec);
  const harbor_stock_min = Number(req.body.harbor_stock_min);
  const harbor_stock_rec = Number(req.body.harbor_stock_rec);

  const montejo_stock = Number(req.body.montejo_stock);
  const montejo_stock_min = Number(req.body.montejo_stock_min);
  const montejo_stock_rec = Number(req.body.montejo_stock_rec);

  const product = new Product({
    product_name: product_name,
    urban_storage_stock: urban_storage_stock,
    urban_counter_stock: urban_counter_stock,
    urban_counter_stock_min: urban_counter_stock_min,
    urban_counter_stock_rec: urban_counter_stock_rec,
    urban_stock_min: urban_stock_min,
    urban_stock_rec: urban_stock_rec,
    harbor_storage_stock: harbor_storage_stock,
    harbor_counter_stock: harbor_counter_stock,
    harbor_counter_stock_min: harbor_counter_stock_min,
    harbor_counter_stock_rec: harbor_counter_stock_rec,
    harbor_stock_min: harbor_stock_min,
    harbor_stock_rec: harbor_stock_rec,
    montejo_stock: montejo_stock,
    montejo_stock_min: montejo_stock_min,
    montejo_stock_rec: montejo_stock_rec,
  });
  product.save();

  res.render("test", {
    foo: "FOO",
  });
});

app.listen(3000, () => console.log("Server started onr port 3000"));
