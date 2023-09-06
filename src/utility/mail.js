// import nodemailer from 'nodemailer';
// import "@babel/polyfill"
// const transport = nodemailer.createTransport({
//     // name: 'www.3ewebapps.co.in',
//     // host: 'mail.3ewebapps.co.in',
//     // port: 465,
//     // secure: true, // use SSL
//     // auth: {
//     //     user: 'gstapp@3ewebapps.co.in',
//     //     pass: 'Gst@123#'
//     // }

//     host: "smtp.ethereal.email",
//     // name: 'LorineWeber',
//     port: 587,
//     secure: false, // upgrade later with STARTTLS
//     auth: {
//       user: "lorine82@ethereal.email",
//       pass: "8XryvGNhCkXmSGXP1K",
//     },
//     tls: {
//       ciphers:'SSLv3'
//   }
// });
// export default transport;

// https://www.npmjs.com/package/zeptomail

// For ES6
import { SendMailClient } from "zeptomail";
const url = "api.zeptomail.in/";
const token = "Zoho-enczapikey PHtE6r0PRu7q2GB9+kIG4fftQMDwN4N/qe9lJAIVtI9KDqcHG00G/94uxzfhqR14A/gUEPHOz488teyV5eKDd2fpM2tFXGqyqK3sx/VYSPOZsbq6x00etVkfckXcUYXoddJp1iTSutfYNA==";


exports.otpmailTrigger = async function (toemail, html,toName, subjectType) {
  return new Promise((resolve,reject)=>{
  let subject;
  if (subjectType == 0) {
    subject = "Otp for verify Email ID"
  } else if (subjectType == 1) {
    subject = "Otp for forget password"

  } else {
    subject = "Subuser Invitation"
  }
  let client = new SendMailClient({ url, token });
  client.sendMail({

    "from":
    {
      "address": "noreply@akum.tech",
      "name": "noreply"
    },
    "to":
      [
        {
          "email_address":
          {
            "address": toemail,
            "name": toName
          }
        }
      ],
    "subject": subject,
    "htmlbody": html,
  }).then((resp) => {
    console.log("success", resp)
    resolve(resp)
  }).catch((error) => {
    console.log("error", JSON.stringify(error))
    let errormsg = JSON.stringify(error)
    resolve(errormsg);
  });
})
}



