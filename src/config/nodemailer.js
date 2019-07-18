
const nodemailer = require("nodemailer");

const transporter =nodemailer.createTransport({
    service:'sendgrid',
    auth:{
        user:"apikeyofficiel",
        pass:'Canada2018_.'
    }
})





export default transporter