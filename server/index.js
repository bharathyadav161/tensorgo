// index.js

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT ||5000;

const POSTMARK_API_KEY = 'bb51e43f-3d88-46fe-ad20-efeaf6f9e3cc';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.postmarkapp.com/messages/outbound', {
      headers: {
        'X-Postmark-Server-Token': POSTMARK_API_KEY,
      },
    });

    const communicationHistory = response.data;
    res.json(communicationHistory);
  } catch (error) {
    console.error('Error fetching communication history:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
