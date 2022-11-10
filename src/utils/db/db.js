const mongoose = require('mongoose');
require('dotenv').config();
const DB_URL = process.env.DB_URL;
if (!DB_URL) throw new Error('No se ha podido conectar a mi Base de Datos')



const connectDb = async () => {
    try {
        const db = await mongoose.connect(DB_URL);

        const { name, host } = db.connection;
        console.log(`Estás conectado a la base de datos ${name} en el host ${host}`);

    } catch (error) {
        console.log(`No se ha podido conectar a la base de datos por culpa de: ${error}`);

    }
}

module.exports = connectDb;