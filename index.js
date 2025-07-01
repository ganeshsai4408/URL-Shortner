const express = require('express');
const path = require('path');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const staticRouter = require('./routes/staticRouter');
const { connectToMongoDB } = require('./connect');

const app = express();
require('dotenv').config();
const port = process.env.PORT || 10000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("Connected to MongoDB")).catch((err) => console.error("Failed to connect to MongoDB", err));

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
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
app.use("/url", urlRoute);
app.listen(port, ()=> console.log(`Server is running on port ${port}`));