const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv').config();
const newsRouter = require('./routes/newsRouter')
const catgoryRouter = require('./routes/categoryRouter');
const contactRouter = require('./routes/contactRouter');
const liveRouter = require('./routes/liveRouter');
const breakingNewsRouter = require('./routes/breakingNewsRouter');
const careerRouter = require('./routes/careerRouter')
const advertiseRouter = require('./routes/advertiseRouter');
const app = express()
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());
const PORT = process.env.PORT
app.get('/', function (req, res) {
  res.send('WORKING')
})
app.use('/api/news',newsRouter)
app.use('/api/news',catgoryRouter)
app.use('/api/contact', contactRouter)
app.use('/api/news', liveRouter)
app.use('/api/news', breakingNewsRouter)
app.use('/api/career', careerRouter)
app.use('/api/advertise',advertiseRouter);
mongoose.connect(process.env.MONGO_URI).then(resp => { 
    console.log("Database Connected!")
}).catch(error => console.log("Unable to connect to DB!"));

app.listen(process.env.PORT, () => {
    console.log(`Server started at ${process.env.PORT}!`);  
})




