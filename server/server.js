const express = require('express');
const cors=require('cors');
const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const app=express();
const port =  5000;
// app.use(cors)
app.use(express.json());


const corsOptions ={
    origin:'https://65dea6dfcb3576879317ea8e--tubular-fairy-b8f431.netlify.app/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
const uri="mongodb+srv://sreerag:vaishakh@cluster0.xqc4l.mongodb.net/?retryWrites=true&w=majority&ssl=true"



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }
    );
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log("MongoDB database connection established successfully");
    })

app.get('/',(req,res)=>{
    res.send('goodday!')
})

const userRouter=require('./routes/user')

app.use('/users',userRouter)
app.listen(port , ()=>{
    console.log(`Server is running in port : ${port}`)
})



