const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config()

const app = express ();

const PORT = process.env.PORT || 5000;

//connect to DB and start server
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL)
    .then( () => {
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))