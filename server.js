const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs"); // calling ejs

app.use(express.static("public")); // calling public files

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); // using bodyparser

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
