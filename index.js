// "use strict";
const nodemailer = require("nodemailer");
const config = require("./meetUp.config");
import members from "./testData.js";

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: config.service,
  auth: {
    user: config.auth.user,
    pass: config.auth.pass
  }
});

// setup email data with unicode symbols
let mailOptions = {
  from: `${config.addressFrom} 👻 <foo@blurdybloop.com>`, // sender address
  to: config.addressTo, // receiver
  subject: "This is awesome", // Subject line
  text: "Hello world ?", // plain text body
  html: "<b>Jeejee</b>" // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(error);
  }
  console.log("Message %s sent: %s", info.messageId, info.response);
});

function chooseMail() {
  for (let index = 0; index < members.arr.length; index++) {
    let paired = false;

    while (!paired) {
      let rnd = Math.floor(Math.random() * members.arr.length);
      if (
        members.arr[index].team === members.arr[rnd].team &&
        !members.arr[index].Lounastanut.includes(members.arr[rnd].id)
      ) {
        paired = true;
      }
    }
  }
}

chooseMail();
