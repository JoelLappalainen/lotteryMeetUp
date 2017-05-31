"use strict";
import members from "./testData";
import nodemailer from "nodemailer";
import config from "./meetUp.config";

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
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log("Message %s sent: %s", info.messageId, info.response);
// });

const shuffleMembersArray = members => {
  for (let i = members.arr.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [members.arr[i - 1], members.arr[j]] = [members.arr[j], members.arr[i - 1]];
  }
  return members;
};

const selectPairs = members => {
  let newPairs = [];
  const arr = members.arr;

  for (let i = 0; i < arr.length; i++) {
    let j = i + 1;
    const member = arr[i];
    const next = arr[j];

    while (j < arr.length && !member.paired) {
      if (member.team !== next.team && !member.Lounastanut.includes(next.ID)) {
        newPairs.push([member, next]);
        member.paired = true;
        next.paired = true;
        member.Lounastanut.push(next.ID);
        next.Lounastanut.push(member.ID);
      }
      j += 1;
    }
  }
  console.log(newPairs.length);
  console.log(newPairs);
};

selectPairs(shuffleMembersArray(members));
