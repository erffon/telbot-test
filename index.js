require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const { TOKEN, SERVER_URL } = process.env;
const TGapi = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const app = express();
app.use(bodyParser.json());

const init = async () => {
  const res = await axios.get(`${TGapi}/setWebhook`, {
    params: { url: WEBHOOK_URL },
  });
};

app.post(URI, async (req, res) => {
  console.log(req.body);

  const chat_id = req.body.message.chat.id;
  const text = req.body.message.text;

  axios.post(`${TGapi}/sendMessage`, {
    chat_id,
    text,
  });
  return res.send();
});

app.listen(process.env.PORT || 5000, async () => {
  console.log("app running on 5000 🍟");
  await init();
});
