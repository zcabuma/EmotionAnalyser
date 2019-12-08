console.log("here");

const processMessage = require('./process-message-MLalgo');

    module.exports = (req, res) => {
      console.log("======process-message-MLalgo=====");
      console.log(req.body);
      let body = req.body;
      let response = body.queryResult.fulfillmentText;

      GraphAPi.callSendAPI(requestBody);

      
    };