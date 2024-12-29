const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const multer = require("multer");
const path = require("path");

dotenv.config(); // Подключение переменных окружения

const app = express();
app.use(cors()); // Для обработки кросс-доменных запросов
app.use(express.json()); // Для обработки JSON-данных

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Простой роут для проверки
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
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
    cb(null, Date.now() + path.extname(file.originalname)); // Создаем уникальное имя файла
  },
});

const upload = multer({ storage });

// Маршрут для загрузки товара
app.post("/products", upload.single("image"), async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : ""; // Путь к изображению

  try {
    // Создаем новый товар
    const newProduct = new Product({
      name,
      description,
      price,
      image,
    });

    // Сохраняем товар в базе данных
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.use("/uploads", express.static("uploads"));

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
