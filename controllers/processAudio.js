'use strict';
const { IamAuthenticator } = require('ibm-watson/auth');

const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const fs = require('fs');

const handleAudioAPI = (req,res) => {
   const fileName = req.files.myFile.name
   const path = req.files.myFile.tempFilePath
   const speechToText = new SpeechToTextV1({
    authenticator: new IamAuthenticator({
      apikey: 'nkM4Ez6HEL4AUkfYiGaZUnuBa-S3HLkN9mq4kyJbNLch',
    }),
    serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/0e78f79d-4e4b-4d9d-93f6-d8f7104a993a',
  });

  const params = {
    audio: fs.createReadStream(path),
    contentType: 'audio/webm',
    objectMode: false,
    model:'en-US_ShortForm_NarrowbandModel',
  };
  speechToText.recognize(params)
  .then(speechRecResults => {
    res.json(speechRecResults)
    console.log(JSON.stringify(speechRecResults,null,2))
  })
  .catch(err => res.status(400).json(err))
}

module.exports = {
  handleAudioAPI:handleAudioAPI
};