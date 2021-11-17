const express = require('express');
const app = express();
const cors = require("cors")
const data = require('../data/jobs.json')
const jobs = data['job-experience'][0]

app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Select a job!' })
})

app.get('/meli', (req, res) => {
    jobs.meli.startDate = new Date("02-08-2021").toLocaleDateString('en-GB')
    res.status(200).json( jobs.meli )
})
  
app.get('/orange', (req, res) => {
    jobs.orange.startDate = new Date("04-19-2021").toLocaleDateString('en-GB')
    jobs.orange.endDate = new Date("07-31-2021").toLocaleDateString('en-GB')
    res.status(200).json( jobs.orange )
})

app.get('/kpmg', (req, res) => {
    jobs.kpmg.startDate = new Date("05-04-2019").toLocaleDateString('en-GB')
    jobs.kpmg.endDate = new Date("01-31-2020").toLocaleDateString('en-GB')
    res.status(200).json( jobs.kpmg )
})

app.get('/thinkup', (req, res) => {
    jobs.thinkup.startDate = new Date("03-02-2020").toLocaleDateString('en-GB')
    jobs.thinkup.endDate = new Date("04-16-2021").toLocaleDateString('en-GB')
    res.status(200).json( jobs.thinkup )
})

app.listen(process.env.PORT || 3000, (a) => {
  console.log("Servidor disponible en http://localhost:3000")
});
 
module.exports = app;