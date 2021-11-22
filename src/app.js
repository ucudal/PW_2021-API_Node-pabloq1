const express = require('express');
const app = express();
const cors = require("cors");
const data = require('../data/jobs.json');
const jobs = data["job-experience"];

app.use(cors({
  origin: true,
  credentials: true,
  sameSite: 'none'
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send( "Hello there stranger! Welcome to my resume's API." )
});

jobs.forEach((job) => {
  app.get(`/${job.id}`, (req, res) => {
    job.startDate = new Date(job.startDate).toLocaleDateString('es-UY')

    if (job.endDate !== undefined) {
      job.endDate = new Date(job.endDate).toLocaleDateString('es-UY')
    }

    res.status(200).json(job)
  })
});

app.get('*', (req, res) => {
  res.send( "Ooops! Nothing to see here." )
  res.end()
});

app.post('/', (req, res) => {
  let data = req.body.data
  if (data.name === undefined) {
    res.status(400).json({ success: false, message: "Missing contact name or company" })
  } else {
    res.cookie("PW_2021-CV_Contacto", data.name, {
      secure: process.env.NODE_ENV !== "development",
      sameSite: 'none'
    })
    res.status(200).json({
      success: true,
      message: `Thank you ${data.name} for contacting me! I'll be in touch.`
    })
  }
});

app.listen(process.env.PORT || 3001, (a) => {
  console.log("Servidor disponible en http://localhost:3001")
});

module.exports = app;