
const express = require('express');
const path = require('path');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const { connectToMongoDB } = require('./connect');
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly} = require('./middleware/auth');

const app = express();

const mongoose = require("mongoose");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("Connected to MongoDB")).catch((err) => console.error("Failed to connect to MongoDB", err));


const port = 8001;



app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.get('/test', async(req,res)=>{
    return res.render("home")
});
app.use("/",staticRouter);


app.get('/url/:shortId', async (req,res) =>{
    const shortId = req.params.shortId;
   const entry = await URL.findOneAndUpdate({
        shortId,
    }, {$push:{
        visitHistory: {timestamp: Date.now()}
    },
    }
);
res.redirect(entry.redirectUrl);
});

app.listen(port, ()=> console.log(`Server is running on port ${port}`));