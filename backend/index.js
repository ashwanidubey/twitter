const express=require('express')
const {router}=require('./router/router')
const app=express();
require("dotenv").config()

const mongoose = require("mongoose");
const {connectToMongo}=require('./db')


//connecting to mongodb
connectToMongo();

// Middleware for parsing JSON
app.use(express.json());

app.use(router)

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("i am running at port 3000")
})

/**
 * install mongodb
 * install mongodb compass
 * create account on mongodb atlas
 */