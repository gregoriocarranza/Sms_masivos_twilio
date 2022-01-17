
const express = require("express");
require('dotenv').config()

const app = express()
app.use(express.json());
const PORT = process.env.PORT || 3030

const twilio_url = "https://api.twilio.com/2010-04-01"
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


app.get("/", (req, res) => {
    res.send(`Server Listen in Port ${PORT}`)
})

app.post("/reply", (req, res) => {
    console.log("Hola")
})

app.post("/SMS_MASIVO", (req, res) => {

    try {
        const { Number_list, Text } = req.body

        console.log(`Enviando: "${Text}" a los numeros: ${Number_list}`)
        Number_list.forEach(element => {


            Send(element, Text)

        });
        res.status(200).json({ sucsess: true, Number_list })
    } catch (error) {
        console.log(error)
        res.status(500).json({ sucsess: false })
    }



})
const Send = async (Mobile, Text) => {

    try {
        await client.messages
            .create({
                to: Mobile,
                from: `${process.env.TWILIO_PHONE_NUMBER}`,
                body: Text,
            })
            .then(message => console.log(`Enviado a: ${message.to}, Mensaje: ${message.body}, Status: ${message.status}`));
    } catch (error) {
        console.log(error)
    }
}

app.listen(PORT, () => {
    console.log("___________________________________________________")
    console.log(`Server Listen in Port ${PORT}`)
})