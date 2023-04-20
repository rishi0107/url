const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl'); 
const connectDB = require('./DB/connection');                                                                                                                                                                                                                                                                                                                                                                                           
const { urlencoded } = require('express');
const app = express();  
connectDB();                                                                                                                                                                                                                                                                                                                                                                                            

app.set('view engine','ejs')
//app.use(express.json({extended: false}))
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/static'));
console.log()
//add frontend 
app.get('/',async (req,res)=>{
    console.log("website has been access!!");
    const shortUrls = await ShortUrl.find()
    res.render('index',{shortUrls: shortUrls})
})
//add to server the response
app.post('/shortUrls', async(req,res)=>{
    console.log("got a post request");
    await ShortUrl.create({ full: req.body.fullUrl})
    res.redirect('/');
})
app.get('/:shortUrl',async (req, res) =>{
    console.log('checking the url');
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if(shortUrl == null)
        return res.sendStatus(404)
    shortUrl.click++;
    shortUrl.save();
    res.redirect(shortUrl.full);
})
app.listen(process.env.PORT || 3000, ()=>{
    console.log('server is listening 3000');
})