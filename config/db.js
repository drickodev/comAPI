const mongoose = require('mongoose')

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
}

module.exports = connectDB