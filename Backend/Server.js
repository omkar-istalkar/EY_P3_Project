const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const bcrypt = require('bcryptjs')


const app = express()
const PORT = 5000


mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log('Database connected')
).catch(
    (err)=>console.log(err)
)


app.listen(PORT,()=>console.log('Server running on Port '+PORT))