const mongoose = require("mongoose");

const Movie = require("../../api/movies/movies.models");

require("dotenv").config();

const DB_URL = process.env.DB_URL;

const movies = [
    {
        title: "The Matrix",
        director: "Hermanas Wachowski",
        year: 1999,
        genre: "Accion",
    },
    {
        title: "The Matrix Reloaded",
        director: "Hermanas Wachowski",
        year: 2003,
        genre: "Accion",
    },
    {
        title: "Buscando a Nemo",
        director: "Andrew Stanton",
        year: 2003,
        genre: "Animacion",
    },
    {
        title: "Buscando a Dory",
        director: "Andrew Stanton",
        year: 2016,
        genre: "Animacion",
    },
    {
        title: "Interestelar",
        director: "Christopher Nolan",
        year: 2014,
        genre: "Ciencia ficcion",
    },
    {
        title: "50 primeras citas",
        director: "Peter Segal",
        year: 2004,
        genre: "Comedia romantica",
    },
];

mongoose
    .connect(DB_URL)
    .then(async () => {
        const allMovies = await Movie.find();
        if (!allMovies.length) {
            console.log('No se encuentran películas');
        } else {
            console.log(`Encontradas ${allMovies.length} películas`);
            await Movie.collection.drop();
            console.log('Se ha eliminado la coleccion');
        }
    }).catch((error) => {
        console.log('no se ha podido eliminar las películas', error);
    }).then(async () => {
        await Movie.insertMany(movies);
        console.log(`Agregadas ${movies.length} películas a la coleccion`);
    }).catch((error) => console.log('error agregando las películas', error))
    .finally(() => mongoose.disconnect());