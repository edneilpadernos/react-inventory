const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'client','build')))


app.get('/api',(req,res)=>{
    res.send('inventory api')
})
app.use('/api/auth',require('./routes/users'))
app.use('/api/products',require('./routes/products'))

app.get("/*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})

app.listen(process.env.port || 3000)