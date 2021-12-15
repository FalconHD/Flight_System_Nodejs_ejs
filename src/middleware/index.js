import bcrypt from 'bcrypt'
import nodemailer from "nodemailer";


export const isAdmin = ({ role }) => role == "admin" ? true : false



export const checkUser = async (password, passwordHash) => {
    const match = await bcrypt.compare(password, passwordHash);
    console.log("match", match);
    if (match) {
        return true
    }
    return false
}


export const hashPassword = async (password) => await bcrypt.hash(password, 10);


export const sendEmail = async (to, url) => {


    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    let info = await transporter.sendMail({
        from: 'SAFI AIRLINE <checker.safiairline@gmail.com>',
        to: "youssbak.2015@gmail.com",
        subject: "Ticket Ready You Can Download it now ",
        text: "the link to download your ticket is here : ",
        html: `<b>the link to download your ticket is here :  <a href="${url}" >DOWNLOAD</a></b>`,
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


}