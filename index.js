
require('dotenv').config();

const {connection} = require("./src/db/connection")
const cors = require('cors');
const express = require('express');
const app = express();
const authRoutes = require("./src/routes/user-routes");

//use of middleware
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 4000; // PORT auto assigned by server

//mounting routes
app.use("/api/v1/auth",authRoutes)

connection().then(()=>{
    console.log("Db connection established");
    app.listen(PORT, ()=>{
        console.log('Server is running on port '+PORT);
    });
}).catch((err)=>{
    console.log(err.message);
})
//app listening on port

