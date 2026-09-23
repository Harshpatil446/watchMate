const express = require("express")
const moviesRoute = require("../src/routes/movies.routes")

const app = express()

app.use(express.json())

app.use("/api", moviesRoute)


module.exports = app