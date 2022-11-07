import { from } from "rxjs";

const nodemailer = require("nodemailer");


export class SendEmail {

    async  send(from:string, to:string, subject:string, text:string):Promise<any> {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: "gustavolonda@gmail.com",
              pass: "kmztoobgdvywmysa",
            },
          });
          
          const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: text,
          };
          
          return await transporter.sendMail(mailOptions);
    }

    
}
