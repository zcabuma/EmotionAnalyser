
const fetch = require('node-fetch');

    // You can find your project ID in your Dialogflow agent settings
    const projectId = 'emotionanalyser-emqigf'; //https://dialogflow.com/docs/agents#settings
    const sessionId = '123456';
    const languageCode = 'en-US';

    const dialogflow = require('dialogflow');

    const config = {
      credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
      }
    };

    const sessionClient = new dialogflow.SessionsClient(config);

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // Remember the Page Access Token you got from Facebook earlier?
    // Don't forget to add it to your `variables.env` file.
    const { FACEBOOK_ACCESS_TOKEN } = process.env;

    const sendTextMessage = (userId, text) => {
      
      
      return fetch(
        `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            messaging_type: 'RESPONSE',
            recipient: {
              id: userId,
            },
            message: {
              text,
            },
          }),
        }
      );
    }

    module.exports = (event) => {
      const userId = event.sender.id;
      console.log(userId);
      console.log(event.sender);
      const message = event.message.text;

    
      var result = "neha";
      return sendTextMessage(userId, result);
      
    };

// module.exports = (req, res) => {

//     console.log("testing111111");
//     var valueFullJSON = req.body;
//     console.log(valueFullJSON);
//     var value = req.body['queryResult']['parameters']['MessageText'];
//     var parameter = value.substring(4);
//     console.log(parameter);
//     var result = "neha";
//     res.send("hi");
    
    
//   };



  