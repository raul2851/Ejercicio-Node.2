const express = require('express');

const Cinema = require('./cinema.models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const allCinemas = await Cinema.find().populate('movies');
        console.log(allCinemas);
        return res.status(200).json(allCinemas);
    } catch (error) {
        return next(error);

    }
})
router.post('/create', async (req, res, next) => {
    try {
        const newCinema = new Cinema({
            name: req.body.name,
            location: req.body.location,
            movies: []
        });
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    } catch (error) {
        return next(error);
    }
});

router.put('/add-movie', async (req, res, next) => {
    try {
        const { cinemaId } = req.body;
        const { movieId } = req.body;
        const updatedCinema = await Cinema.findByIdAndUpdate(
            cinemaId,
            { $push: { movies: movieId } },
            { new: true }
        );
        return res.status(200).json(updatedCinema);
    } catch (error) {
        return next(error);
    }
});

router.delete('/delete-movie', async (req, res, next) => {
    try {
        const { cinemaId } = req.body;
        const { movieId } = req.body;
        const cinema = await Cinema.findById(cinemaId)
        const movieToDelete = cinema.movies.indexOf(movieId)
        const deletedMovie = cinema.movies.splice(movieToDelete, 1)
        const cinemaToUpdated = await Cinema.findByIdAndUpdate(cinemaId, cinema);

        console.log(cinema);

        return res.status(201).json('Película eliminada correctamente')

    } catch (error) {
        return next(error);

    }
})

module.exports = router;