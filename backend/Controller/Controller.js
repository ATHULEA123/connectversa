const asyncHandler = require("express-async-handler");
const user = require('../Model/Model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json("all fields are mandatory")
    }
    const userAvailable = await user.findOne({ email })
    if (userAvailable) {
        res.status(400);
        throw new Error("user already registered!")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashPassword", hashedPassword);
    const User = await user.create({
        username,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({ _id: User.id, email: User.email });
    }
    else {
        res.status(400);
        throw new Error("user data us not valid")
    }
    res.json({ message: "register the user" })
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("all are mandatory")
    }
    const loginUser = await user.findOne({ email })
    if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
        const accesstoken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN,
            {
                expiresIn: "1m"
            })
        res.status(200).json({ accesstoken })
    }
    else {
        res.status(401);
        throw new Error("email or password not valid")
    }
    res.json({ message: "login user" })
})
module.exports = { registerUser, loginUser }