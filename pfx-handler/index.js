const { fromPfx } = require("pemutils");
const { promisify } = require("util");
const request = require("request");

const fromPfxPromise = promisify(fromPfx);

const requestFnGreenpass = certificateData => {
  const options = {
    method: "GET",
    url: "https://zeus.sandbox.taggy.com.br/api/tags/information/status-codes",
    headers: { "Content-Type": "application/json" },
    agentOptions: {
      cert: certificateData.certificate,
      key: certificateData.key
    },
    json: true
  };

  return new Promise((resolve, reject) => {
    try {
      request.get(options, function(error, response, body) {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    } catch (error) {
      reject(error);
    }
  });
};

(async function() {
  const certificateData = await fromPfxPromise({
    path: "idsrv3test.pfx",
    password: "idsrv3test"
  });

  const response = await requestFnGreenpass(certificateData);
  console.log(response);
})();

// https://www.npmjs.com/package/request

// var fs = require('fs')
//     , path = require('path')
//     , certFile = path.resolve(__dirname, 'ssl/client.crt')
//     , keyFile = path.resolve(__dirname, 'ssl/client.key')
//     , request = require('request');

// var options = {
//     url: 'https://api.some-server.com/',
//     agentOptions: {
//         cert: fs.readFileSync(certFile),
//         key: fs.readFileSync(keyFile),
//         // Or use `pfx` property replacing `cert` and `key` when using private key, certificate and CA certs in PFX or PKCS12 format:
//         // pfx: fs.readFileSync(pfxFilePath),
//         passphrase: 'password',
//         securityOptions: 'SSL_OP_NO_SSLv3'
//     }
// };

// request.get(options);
