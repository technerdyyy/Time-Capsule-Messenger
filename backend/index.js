const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')

const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL|| "http://localhost:5173",  
    credentials: true 
}))
app.use(cookiesParser())
app.use(express.json()) 


const PORT = process.env.PORT || 8080

app.get('/',(request, response)=>{
  response.json({
     message: "server running at" + PORT 
  })
})

//api endpoints
app.use('/api',router)

connectDB().then(() => {
  console.log("mongodb connection successful")
app.listen(PORT, ()=>{
    console.log("server running at" + PORT)
})
})
