const express = require("express")

const moviesRoute = require("./routes/movies.routes")
const authRoute = require("./routes/auth.routes")

const app = express()

app.use(express.json())

app.use("/api/v1", moviesRoute)
app.use("/api/v1/auth", authRoute)

module.exports = app
