const express = require("express")
const moviesController = require("../controllers/movies.controller")
const router = express.Router()

router.get("/movies", moviesController.getMovies)
router.get("/search", moviesController.searchMovies)
router.get("/movies/:movieId", moviesController.showMovie)
module.exports = router