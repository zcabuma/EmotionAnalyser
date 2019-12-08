/**
 * Copyright 2019-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

// Imports dependencies
const request = require("request");

module.exports = class MlAPI {
  // static callSendAPI(requestBody) {
  //   // Send the HTTP request to the Messenger Platform
  //   request(
  //     {
  //       uri: 'https://tortoiseshell-vinca.glitch.me/ml-response',
  //       qs: {
  //         access_token: 'EAAGWI3t12xUBAMaFeEafmT95dnZAfrcOYrGdp7nXj3lWlXC9WobGjXYc1KETsLZABRv2bcyE5VOKiJbZBtL7p4ZA4ZCSraOLCtpdMWlXZCHDjpt1ZCIkoc9gVolrRFQYs9PGPuzSbSqe219sTPY9lZALZBi3VR9VI3wlS5p8TPzJmFgZDZD'
  //       },
  //       method: "POST",
  //       json: requestBody
  //     },
  //     error => {
  //       if (error) {
  //         console.error("Unable to send message:", error);
  //       }
  //     }
  //   );
  // }

  static getMlAPIResponse(message, dialogflowContent) {
    return new Promise(function(resolve, reject) {
      let body = [];

      // Send GET request to the ML model
      console.log(`Fetching response from ML model`);

      request({
        uri: `https://tortoiseshell-vinca.glitch.me/ml-response`,
        method: "GET",
        qs: {
          dialogflow: dialogflowContent,
          message: message,
        }
      })
        .on("response", function(response) {
          console.log(response.statusCode);

          if (response.statusCode !== 200) {
            reject(Error(response.statusCode));
          }
        })
        .on("data", function(chunk) {
          body.push(chunk);
        })
        .on("error", function(error) {
          console.error("Unable to fetch model response:" + error);
          reject(Error("Network Error"));
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          console.log("========GLITCH RESPONSE=========");
          console.log(JSON.parse(body));

          resolve(JSON.parse(body));
        });
    });
  }
};