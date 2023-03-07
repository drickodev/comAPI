const ObjectId = require("mongoose").Types.ObjectId;
const productModel = require("../models/product.model");

//Liste des produits
const getProducts = async (req, res) => {
   const products = await productModel.find();
   res.status(200).json(products);
};

//Détails d'un produit
const getProduct = async (req, res) => {
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
};

//Enregistrer d'un produit
const createProduct = async (req, res) => {
   if (!req.body.name || !req.body.description) {
      res.status(400).json({ message: "Name and description are required" });
      return;
   }

   const newProduct = await productModel.create({
      name: req.body.name,
      description: req.body.description,
   });

   res.status(200).json({ message: `Product id created`, data: newProduct });
};

//Modifier d'un produit
const updateProduct = async (req, res) => {
   if (!req.body.name || !req.body.description) {
      res.status(400).json({ message: "Name and description are required" });
      return;
   }

   if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "You provide an invalid ID" });
      return;
   }

   const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
   );

   if (!updatedProduct) {
      res.status(404).json({
         message: `Product with id = ${req.params.id} doesn't exist`,
      });
   } else {
      res.status(200).json({
         message: `Product with id = ${req.params.id} is updated`,
         data: updatedProduct,
      });
   }
};

//Supprimer un produit
const deleteProduct = async (req, res) => {
   if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "You provide an invalid ID" });
      return;
   }

   const deletedProduct = await productModel.findByIdAndDelete(req.params.id);

   if (!deletedProduct) {
      res.status(404).json({
         message: `Product with id = ${req.params.id} doesn't exist`,
      });
      return;
   } else {
      res.status(200).json({
         message: `Product with id = ${req.params.id} is deleted`,
         data: deletedProduct,
      });
   }
};

module.exports = {
   getProducts,
   getProduct,
   createProduct,
   updateProduct,
   deleteProduct,
};
