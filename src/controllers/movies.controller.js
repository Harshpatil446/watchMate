const axios = require("axios")


async function getMovies(req, res) {
    try {
        const response = await axios.get(
            "https://api.themoviedb.org/3/movie/popular",
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

module.exports = { getMovies }