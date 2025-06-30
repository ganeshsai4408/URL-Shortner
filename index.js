const express = require('express');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const { connectToMongoDB } = require('./connect');

const app = express();
const port = 8001;
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("Connected to MongoDB")).catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(express.json());
app.get('/:shortId', async (req,res) =>{
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