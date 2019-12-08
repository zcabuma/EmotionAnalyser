require('dotenv').config({ path: 'variables.env' });
const processMessage = require('./process-message');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log("hi455555555");

app.listen(5000, () => console.log('Express server is listening on port 5000'));

const verifyWebhook = require('./verify-webhook');

app.get('/', verifyWebhook);

const messageWebhook = require('./message-webhook');

app.post('/', messageWebhook);

const sentimentWebhook = require('./message-webhook-MLalgo');

// app.post('/sentiment', sentimentWebhook);

// app.post('/sentiment', function (req, res) {
//     console.log("testing111111");
//     var value = req.body['queryResult']['parameters']['MessageText'];
//     var parameter = value.substring(4);
//     console.log(req.eventNames.toString);
//     console.log(parameter);
//     var result = "neha";
//     res.send("hi");


//     console.log("======process-message-MLalgo=====");
//     console.log(req.body);
//     let body = req.body;
//     let response = body.queryResult.fulfillmentText;

//     let requestBody = {
//       recipient: {
//         id: this.user.psid
//       },
//       message: response,
//     };

//     GraphAPi.callSendAPI(requestBody);
//     res.status(200).send("DIALOG_FLOW_RECEIVED");
//   })

