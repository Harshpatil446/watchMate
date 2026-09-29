const express = require("express")
const cookireParser = require("cookie-parser")

const moviesRoute = require("./routes/movies.routes")
const authRoute = require("./routes/auth.routes")

const app = express()

app.use(express.json())
app.use(cookireParser())

app.use("/api/v1", moviesRoute)
app.use("/api/v1/auth", authRoute)

module.exports = app
