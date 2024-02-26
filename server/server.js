const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
const port = 4000;

app.use(bodyParser.json());

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/schedule', (req, res) => {
  const { endpoint, time } = req.body;

setTimeout(() => {
    console.log(`Sending request to ${endpoint} after ${time} seconds`);
    https.get(endpoint, (response) => {
      let data = '';
  
      response.on('data', (chunk) => {
        data += chunk;
      });
  
      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log('Received JSON response:', jsonData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });
    }).on('error', (error) => {
      console.error('Error making request:', error);
    });
  }, time * 1000); 

  res.json({ message: "Request scheduled successfully!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
