const express = require('express')


class Masive_sms {
    constructor(app) {
        this.Router = express.Router()
        this.twilio_url = "https://api.twilio.com/2010-04-01"
        this.client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        app.use('/twilio', this.Router)
        this.Router.post('/SMS_MASIVO', this.SmS_masive)
    }

    SmS_masive = async (req, res, next) => {

        try {
            const { Number_list, Text } = req.body

            console.log(`Enviando: "${Text}" a los numeros: ${Number_list}`)

            this.Send_Twilio(Number_list, Text).then(retu => {
                console.log(retu)
                res.status(200).json(retu)
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({ sucsess: false })
        }
    }

    Send_Twilio = async (Number_list, Text) => {
        let Resp = []
        await Number_list.forEach(Phone => {
            try {
                this.client.messages
                    .create({
                        to: Phone,
                        from: `${process.env.TWILIO_PHONE_NUMBER}`,
                        body: Text,
                    })
                    .catch(err => {
                        console.log(err)
                    })

                Resp.push({ Phone, sucsess: true })
            } catch (err) {
                console.log(err)
                Resp.push({ Phone, sucsess: false })
            }

        });

        // console.log(Resp)
        return (Resp)
    }
}

module.exports = Masive_sms