const axios = require("axios")


async function getMovies(req, res) {
    try {
        const response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
            {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                    page: 1
                }
            }
        )
        const result = response.data.results
        res.json(result)

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch movies"
        })
    }
}

async function searchMovies(req, res) {
    const query = req.query.query

    if (!query) {
        return res.status(401).json({
            message: "query is not defined"
        })
    }

    try {
        const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
                api_key: process.env.TMDB_API_KEY,
                query: query
            }
        })
        const result = response.data.results
        res.json(result)
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch movie"
        })
    }
}


async function showMovie(req, res) {

    const { movieId } = req.params

    if (!movieId) {
        return res.status(400).json({
            message: "movie id is not defined"
        })
    }

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: process.env.TMDB_API_KEY
            }
        })
        const result = response.data
        res.json(result)
    } catch (error) {
        console.log(error.response?.data || error.message);
        return res.status(500).json({
            message: "Failed to fetch the movie"
        })
    }


}

module.exports = { getMovies, searchMovies, showMovie }