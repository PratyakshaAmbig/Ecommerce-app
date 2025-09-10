const express = require("express");
const cors = require("cors");
require('dotenv/config');

// App Config
const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
// we can acces the backend from any IP address
app.use(cors());

// api endpoints
app.get('/', (req, res)=>{
    res.send('API working')
})

app.listen(PORT, ()=>{
    console.log(`Server started on PORT : ${PORT}`)
})