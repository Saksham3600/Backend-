// require('dotenv').config({path: './env'});

import dotenv from 'dotenv'
import { app }from './app.js';
import connectDB from './db/index.js';
dotenv.config({path: './.env'});


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => { 
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
})
     
.catch((error) => {
    console.error('Error mongo db :', error);
})
































/*
import express from "express"
const app = express()

( async () =>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        app.on("error",(error)=>{
            console.log("Error:", error);
            throw error
        })
        
        app.listen(process.env.PORT,() =>{
            console.log(`Server is running on port ${process.env.PORT}`)
        })

    } catch(error){
        console.error('Error:', error)
        throw err
    }
})()

*/  