const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const processAudio =require('./controllers/processAudio')
const fileupload = require('express-fileupload')



process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 


const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use(fileupload({useTempFiles : true,tempFileDir : '/tmp/',debug :true}))
app.use(express.static('uploads'));

app.get('/',(req,res) => {
  res.json('success')
})

app.post('/audio',(req,res) => {processAudio.handleAudioAPI(req,res)})

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
})