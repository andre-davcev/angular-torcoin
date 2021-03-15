const express = require('express');
const rp = require('request-promise');
const app = express();

const apiKeys = require('./api-keys');

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

app.get('/prices', (req, res) => {
  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
      'start': '1',
      'limit': '100',
      'convert': 'USD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': apiKeys.coinMarketCap
    },
    json: true,
    gzip: true
  };

  rp(requestOptions).then(response => {
    console.log('API call response:', response);
    res.status(200).send(response);
  }).catch((err) => {
    console.log('API call error:', err.message);
    res.status(500).send(err.message);
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
