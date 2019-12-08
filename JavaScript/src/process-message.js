const fetch = require('node-fetch');
const MlAPI = require('./ml-api');

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
      const message = event.message.text;
      console.log(userId);
      console.log(event.sender);
      console.log(message);


      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: languageCode,
          },
          contexts: [
            {
              user_id: userId
            }
          ],
        },
      };

      sessionClient
        .detectIntent(request)
        .then(responses => {
          const result = responses[0].queryResult;
          let response = result.fulfillmentText;
          let action = result.action;

          let dialogflowContent = response;
          // Action parse response from DIALOGFLOW
          console.log("=======DIALOGFLOW RESPONSE======");
          console.log(result);
          console.log("THIS IS ACTIUONNNN");
          console.log(action);


          response = MlAPI.getMlAPIResponse(message, dialogflowContent).then(MlResponse => {
            // Getting response from MODEL
            console.log("=======MODEL RESPONSE======");
            console.log(MlResponse.answer);
            return sendTextMessage(userId, MlResponse.answer);
          })
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
    }