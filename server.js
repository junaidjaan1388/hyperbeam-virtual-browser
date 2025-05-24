const express = require('express');
const puppeteer = require('puppeteer');
const ngrok = require('ngrok');

const app = express();
app.use(express.json());

let browser;
let page;

app.post('/start', async (req, res) => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized'
    ]
  });
  page = await browser.newPage();
  await page.goto(req.body.url || 'https://google.com');
  res.send({ status: 'Browser started' });
});

// Add more endpoints for control...

(async () => {
  const server = app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
  
  // Ngrok tunnel
  const url = await ngrok.connect({
    proto: 'http',
    addr: 3000,
    authtoken: process.env.NGROK_AUTH_TOKEN
  });
  console.log('Ngrok URL:', url);
})();
