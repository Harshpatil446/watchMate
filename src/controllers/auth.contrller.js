const User = require("../models/user.model.js")


async function registerUser(req, res) {
    const { username, password } = req.body

    if (username === "") {
        return res.status(400).json({
            message: "username cannot be empty"
        })
    }

    if (password === "") {
        return res.status(400).json({
            message: "password cannot be empty"
        })
    }

    const existedUser = await User.findOne({
        username
    })

    if (existedUser) {
        return res.status(409).json({
            message: "username already exist"
        })
    }

    const user = await User.create({
        username,
        password
    })

    if (!user) {
        return res.status(500).json({
            message: "something went wrong while registering"
        })
    }

    return res.status(201).json({
        message: "user created successfully"
    })

}

module.exports = { registerUser }