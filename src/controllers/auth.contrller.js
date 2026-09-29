const User = require("../models/user.model.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
        username,
        password: hash
    })


    if (!user) {
        return res.status(500).json({
            message: "something went wrong while registering"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(201).json({
        message: "user created successfully"
    })

}


async function loginUser(req, res) {
    const { username, password } = req.body

    const user = await User.findOne({
        username
    })

    if (!user) {
        return res.status(401).json({
            message: "Username is incorrect"
        })
    }

    const isPassValid = await bcrypt.compare(password, user.password)

    if (!isPassValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "Login successfull",
        user: {
            id: user._id,
            username: user.username
        }
    })


}

async function logoutUser(req, res) {
    res.clearCookie("token")
    res.status(200).json({
        message: "logout sucessfull"
    })
}

module.exports = { registerUser, loginUser, logoutUser }