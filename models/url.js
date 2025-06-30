const mongose = require('mongoose');

const urlSchema = new mongose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory:[{ timestamp:{type:Number}}],
},{timestamps: true});

const Url = mongose.model('Url', urlSchema);
module.exports = Url;