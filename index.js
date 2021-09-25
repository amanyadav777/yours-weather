const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const api_key = process.env.SECRET_KEY
module.exports = {api_key};

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"./public");
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render('index');
})

app.listen(port,()=>{
    console.log(`server is listining on port ${port}`);
});