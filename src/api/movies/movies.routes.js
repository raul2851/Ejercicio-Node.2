const express = require('express');

const Movie = require('./movies.models');

const router = express.Router();



router.get('/', async (req, res, next) => {
    try {
        const allMovies = await Movie.find();
        return res.status(200).json(allMovies);
    } catch (error) {
        return next(error);

    }
})

router.get('/id/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const allMovies = await Movie.findById(id);
        return res.status(200).json(allMovies);
    } catch (error) {
        return next(error);

    }
})
router.get('/title/:title', async (req, res, next) => {
    try {
        const title = req.params.title;
        const allMovies = await Movie.find({ title: title });
        return res.status(200).json(allMovies);
    } catch (error) {
        return next(error);

    }
})
router.get('/genre/:genre', async (req, res, next) => {
    try {
        const genre = req.params.genre;
        const allMovies = await Movie.find({ genre: genre });
        return res.status(200).json(allMovies);
    } catch (error) {
        return next(error);

    }
})
router.get('/year/:year', async (req, res, next) => {
    try {
        const year = req.params.year;
        const allMovies = await Movie.find({ year: { $gte: year } });
        return res.status(200).json(allMovies);
    } catch (error) {
        return next(error);

    }
})

router.post('/create', async (req, res, next) => {
    try {
        const movie = req.body;
        const newMovie = new Movie(movie);
        const created = await newMovie.save();
        return res.status(201).json('Película creada')

    } catch (error) {
        return next(error);

    }
})
router.put('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const movie = req.body;
        const newMovie = new Movie(movie);
        newMovie._id = id;
        const edited = await Movie.findByIdAndUpdate(id, newMovie);
        return res.status(201).json('Película editada correctamente')

    } catch (error) {
        return next(error);

    }
});
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const movie = req.body;
        const deleted = await Movie.findByIdAndDelete(id);
        return res.status(201).json('Película eliminada correctamente')

    } catch (error) {
        return next(error);

    }
});



module.exports = router;