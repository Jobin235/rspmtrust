const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()

const userRoute = require("./routes/userRoutes")
const errorHandler = require("./handlers/errorHandler")

const app = express ();

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

//Routes Middleware
app.use("/api/users", userRoute)

//Routes
app.get ("/", (req, res) => {
    res.send("Home Page");
});

//Error Handler
app.use(errorHandler);

//connect to DB and start server
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL)
    .then( () => {
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))