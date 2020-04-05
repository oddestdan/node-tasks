const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const { generateWeatherApiUrl } = require('../../utils');

router.post('/weather', (req, res) => {
  // locationType = ['name' OR 'zipcode']
  // locationData = ['kyiv' OR '04086'  ]

  const { locationType, locationData } = req.body;
  const apiUrl = generateWeatherApiUrl(locationType, locationData);

  fetch(apiUrl)
    .then((res) => res.json())
    .then((weatherData) =>
      res.json({ status: 'Retrieved current weather data', weatherData })
    )
    .catch((err) => {
      res.status(500).json({ status: err.message });
    });
});

module.exports = router;
