// server/src/index.js
const express = require("express");
const sequelize = require("./db");
const cors = require("cors");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

sequelize
  .authenticate()
  .then(() => console.log("Connected to SQL"))
  .catch((err) => console.log("Error: " + err));

sequelize.sync({ alter: true })
  .then(() => console.log("DB sync"))
  .catch((err) => console.log("Error: " + err));

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/products", upload.single("image"), async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    const newProduct = await Product.create({
      name,
      description,
      price,
      image,
    });

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
