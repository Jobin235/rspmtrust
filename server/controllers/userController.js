const asyncHanler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

const registerUser = asyncHanler(async(req, res) => {
    const {name, email, password} = req.body;

    //validations
    if(!name || !email || !password) {
        res.status(400)
        throw new Error ("Please fill in all required fields")
    }
    if(password.length < 6) {
        res.status(400)
        throw new Error ("Password must be atleast 6 characters")
    }

    // check if user email already exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error ("Email has already been registered")
    }

    //Encrypt password before saving to db
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    // create new user
    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email:user.email,
            password: user.password
        })
    }
    else {
        res.status(400)
        throw new Error ("Invalid user data")
    }

});

module.exports = {
    registerUser
}