
const express = require("express");
require('dotenv').config()



const Masive_sms = require('./Masive_sms');
const app = express()
app.use(express.json());
const PORT = process.env.PORT || 3030



// Twilio console https://console.twilio.com/?frameUrl=%2Fconsole%3Fx-target-region%3Dus1

new Masive_sms(app)
app.get("/", (req, res) => {
    res.send(`Server Listen in Port ${PORT}`)
})

app.listen(PORT, () => {
    console.log("___________________________________________________")
    console.log(`Server Listen in Port ${PORT}`)
})