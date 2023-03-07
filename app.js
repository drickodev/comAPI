const express = require("express");
const productRoutes = require('./routes/product.routes')

//Connexion à la base de données
const connectDB = require('./config/db')
connectDB()

const app = express();

//Middlewares
app.use(express.json(), express.urlencoded({ extended: false }))

//Routes
app.use("/api/", productRoutes)

app.listen(5000, () => {
   console.log("Le serveur écoute sur le port 5000");
});
