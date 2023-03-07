const express = require("express");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

//Fonction de connexion à la base de données
MONGO_URI = "mongodb://127.0.0.1:27017/comAPI";
const connectDB = async () => {
   try {
      const conn = await mongoose.connect(MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
   } catch (err) {
      console.log(err);
      process.exit(1);
   }
};

//Connexion à la base de données
connectDB();

//Création du model produit
const productSchema = mongoose.Schema(
   {
      name: String,
      description: String,
      img: {
         type: String,
         default: "img url",
      },
   },
   { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

const app = express();

//Middlewares
app.use(express.json()).use(express.urlencoded({ extended: false }));

//Routes
app.get("/api/products", async (req, res) => {
   const products = await productModel.find();
   res.status(200).json(products);
});

app.get("/api/products/:id", async (req, res) => {
   if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "You provide an invalid ID" });
      return;
   }

   const product = await productModel.findById(req.params.id);

   if (!product) {
      res.status(404).json({
         message: `Product with id = ${req.params.id} doesn't exist`,
      });
      return;
   }

   res.status(200).json({ product });
});

//Enregistrement d'un produit
app.post("/api/products", async (req, res) => {
   if (!req.body.name || !req.body.description) {
      res.status(400).json({ message: "Name and description are required" });
      return;
   }

   const newProduct = await productModel.create({
      name: req.body.name,
      description: req.body.description,
   });

   res.status(200).json({ message: `Product id created`, data: newProduct });
});

//Modification d'un produit
app.put("/api/products/:id", async (req, res) => {
   if (!req.body.name || !req.body.description) {
      res.status(400).json({ message: "Name and description are required" });
      return;
   }

   if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "You provide an invalid ID" });
      return;
   }

   const product = await productModel.findById(req.params.id);

   if (!product) {
      res.status(404).json({
         message: `Product with id = ${req.params.id} doesn't exist`,
      });
      return;
   }

   const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
   );

   res.status(200).json({
      message: `Product with id = ${req.params.id} is updated`,
      data: updatedProduct,
   });
});

app.delete("/api/products/:id", async (req, res) => {
   if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "You provide an invalid ID" });
      return;
   }

   const product = await productModel.findById(req.params.id);

   if (!product) {
      res.status(404).json({
         message: `Product with id = ${req.params.id} doesn't exist`,
      });
      return;
   }

   await product.deleteOne();
   res.status(200).json({
      message: `Product with id = ${req.params.id} is deleted`,
      data: product,
   });
});

app.listen(5000, () => {
   console.log("Le serveur écoute sur le port 5000");
});
