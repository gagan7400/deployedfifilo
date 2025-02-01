// let { Contactus, contactPageModel } = require("../models/contactModel");
// let { jobApplicant } = require("../models/jobapplicantModel");
// const { sendEmail } = require("../utils/sendEmail");

// const contactusController = async (req, res) => {
//     const { name, email, phonenumber, message } = req.body;
//     const contactus = new Contactus({ name, email, phonenumber, message });
//     try {
//         let date = new Date().toLocaleDateString();
//         await sendEmail({
//             for: "user",
//             sendemail: email,
//             subject: "Thank You for Your Submission",
//             email,
//             html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Form Submission</title>
//     <style>
//         body {
//             margin: 0;
//             padding: 0;
//             background-color: #f5f5f5;
//             font-family: Arial, sans-serif;
//         }
//         .email-container {
//             max-width: 600px;
//             margin: 20px auto;
//             background-color: #ffffff;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//             border-radius: 8px;
//             overflow: hidden;
//         }
//         .email-header {
//             background-color: #0e0e0e;
//             padding: 20px;
//             text-align: center;
//             color: #ffffff;
//         }
//         .email-header img {
//             max-width: 150px;
//             margin-bottom: 10px;
//         }
//         .email-header h1 {
//             margin: 0;
//             font-size: 24px;
//             color: #fff;
//         }
//         .email-body {
//             padding: 20px;
//             color: #505050;
//             line-height: 1.6;
//             background-color: #fff;
//         }
//         .email-body h2 {
//             font-size: 20px;
//             margin-bottom: 10px;
//             color: #0e0e0e;
//         }
//         .email-body p {
//             margin-bottom: 15px;
//         }
//         .email-footer {
//             background-color: #f5f5f5;
//             padding: 15px;
//             text-align: center;
//             font-size: 14px;
//             color: #464c5e;
//         }
//         .email-footer a {
//             color: #464c5e;
//             text-decoration: none;
//         }
//     </style>
// </head>
// <body>
//     <div className="email-container">
//         <div className="email-header">
//             <!-- Logo Section -->
//             <img src="https://www.fifilo.com/assets/img/logo.png" alt="Company Logo">
//             <h1>Thank You for Your Submission!</h1>
//         </div>
//         <div className="email-body">
//             <h2>Hi ${name},</h2>
//             <p>Thank you for submitting your form. We have received your details and our team will get back to you shortly.</p>
//             <p>If you have any questions or need further assistance, feel free to reply to this email .</p>
//            <!-- <p>Below are the details you submitted:</p>
//             <ul>
//                 <li><strong>Name:</strong> ${name}</li>
//                 <li><strong>Email:</strong> ${email}</li>
//                 <li><strong>PhoneNumber:</strong>${phonenumber}</li>
//                  <li><strong>Message:</strong>${message}</li>
//             </ul>-->
//             <p>Best Regards,<br/>The FIFILO Team 
//             <br>Web : <a href="www.fifilo.com">www.fifilo.com</a>
//             <br>Mob : +91 9669123488
//             <br>email : hello@fifilo.com </p>     
//         </div>
//         <div className="email-footer">
//             <p>&copy; 2024 FIFILO Designs. All rights reserved.</p>
//         </div>
//     </div>
// </body>
//             </html>`
//         });
//         await sendEmail({
//             for: "admin",
//             sendemail: process.env.SMPT_MAIL,
//             subject: "New Form Submission recieved", email, html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>New Form Submission</title>
//     <style>
//         body {
//             margin: 0;
//             padding: 0;
//             background-color: #f4f4f4;
//             font-family: Arial, sans-serif;
//         }
//         .email-container {
//             max-width: 600px;
//             margin: 20px auto;
//             background-color: #ffffff;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//             border-radius: 8px;
//             overflow: hidden;
//         }
//         .email-header {
//             background-color: #0e0e0e;
//             padding: 20px;
//             text-align: center;
//             color: #ffffff;
//         }
//         .email-header img {
//             max-width: 150px;
//             margin-bottom: 10px;
//         }
//         .email-header h1 {
//             margin: 0;
//             font-size: 24px;
//         }
//         .email-body {
//             padding: 20px;
//             color: #333333;
//             line-height: 1.6;
//             background-color: #fff;
//         }
//         .email-body h2 {
//             font-size: 20px;
//             margin-bottom: 10px;
//             color: #444444;
//         }
//         .email-body p {
//             margin-bottom: 15px;
//         }
//         .email-body ul {
//             list-style-type: none;
//             padding: 0;
//         }
//         .email-body ul li {
//             background-color: #f9f9f9;
//             padding: 10px;
//             margin-bottom: 10px;
//             border-radius: 4px;
//             border-left: 4px solid #1FADA1;
//         }
//         .email-footer {
//             background-color: #f6f7f9;
//             padding: 15px;
//             text-align: center;
//             font-size: 14px;
//             color: #777777;
//         }
//         .email-footer a {
//             color: #1FADA1;
//             text-decoration: none;
//         }
//     </style>
// </head>
// <body>
//     <div className="email-container">
//         <div className="email-header">
//             <!-- Logo Section -->
//             <img src="https://www.fifilo.com/assets/img/logo.png" alt="Company Logo">
//             <h1>New Form Submission Received</h1>
//         </div>
//         <div className="email-body">
//             <h2>Form Details:</h2>
//             <ul>
//                 <li><strong>Name:</strong> ${name}</li>
//                 <li><strong>Email:</strong>  ${email}</li>
//                 <li><strong>PhoneNumber:</strong>  ${phonenumber}</li>

//                 <li><strong>Message:</strong>  ${message}</li>
//             </ul>
//             <p>Submitted on: <strong>${date}</strong></p>
//         </div>
//         <div className="email-footer">
//             <p>&copy; 2024 FIFILO Designs. All rights reserved.</p>
//         </div>
//     </div>
// </body>
//                </html>`
//         });
//         const data = await contactus.save();
//         res.status(200).json({
//             success: true, message: `Email sent to ${email} successfully`,
//         });
//     } catch (error) {
//         res.status(400).json({ success: false, error, message: `Email not sent ` })
//     }
// }


// const jobapplicantController = async (req, res) => {
//     let { name, email, phonenumber, message } = req.body;
//     if (name && email && phonenumber && message) {
//         try {
//             let date = new Date().toLocaleDateString();
//             let data = new jobApplicant({ name, email, phonenumber, message, date });
//             // if (req.file) {
//             //     data.resume = req.file.path
//             // } else {
//             //     return res.json({ "status": "error", "message": "pdf not found" })
//             // }
//             await sendEmail({
//                 for: "admin",
//                 sendemail: process.env.SMPT_MAIL,
//                 subject: "New Form Submission recieved",
//                 email,
//                 html: `<!DOCTYPE html>
//                 <html lang="en">
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>New Form Submission</title>
//                     <style>
//                         body {
//                             margin: 0;
//                             padding: 0;
//                             background-color: #f4f4f4;
//                             font-family: Arial, sans-serif;
//                         }
//                         .email-container {
//                             max-width: 600px;
//                             margin: 20px auto;
//                             background-color: #ffffff;
//                             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                             border-radius: 8px;
//                             overflow: hidden;
//                         }
//                         .email-header {
//                             background-color: #0e0e0e;
//                             padding: 20px;
//                             text-align: center;
//                             color: #ffffff;
//                         }
//                         .email-header img {
//                             max-width: 150px;
//                             margin-bottom: 10px;
//                         }
//                         .email-header h1 {
//                             margin: 0;
//                             font-size: 24px;
//                         }
//                         .email-body {
//                             padding: 20px;
//                             color: #333333;
//                             line-height: 1.6;
//                             background-color: #fff;
//                         }
//                         .email-body h2 {
//                             font-size: 20px;
//                             margin-bottom: 10px;
//                             color: #444444;
//                         }
//                         .email-body p {
//                             margin-bottom: 15px;
//                         }
//                         .email-body ul {
//                             list-style-type: none;
//                             padding: 0;
//                         }
//                         .email-body ul li {
//                             background-color: #f9f9f9;
//                             padding: 10px;
//                             margin-bottom: 10px;
//                             border-radius: 4px;
//                             border-left: 4px solid #1FADA1;
//                         }
//                         .email-footer {
//                             background-color: #f6f7f9;
//                             padding: 15px;
//                             text-align: center;
//                             font-size: 14px;
//                             color: #777777;
//                         }
//                         .email-footer a {
//                             color: #1FADA1;
//                             text-decoration: none;
//                         }
//                     </style>
//                 </head>
//                 <body>
//                     <div className="email-container">
//                         <div className="email-header">
//                             <!-- Logo Section -->
//                             <img src="https://www.fifilo.com/assets/img/logo.png" alt="Company Logo">
//                             <h1>New Form Submission Received</h1>
//                         </div>
//                         <div className="email-body">
//                             <h2>Form Details:</h2>
//                             <ul>
//                                 <li><strong>Name:</strong> ${name}</li>
//                                 <li><strong>Email:</strong>  ${email}</li>
//                                 <li><strong>PhoneNumber:</strong>  ${phonenumber}</li>
//                                  <li><strong>Message:</strong>  ${message}</li>
//                             </ul>
//                             <p>Submitted on: <strong>${date}</strong></p>
//                         </div>
//                         <div className="email-footer">
//                             <p>&copy; 2024 FIFILO Designs. All rights reserved.</p>
//                         </div>
//                     </div>
//                 </body>
//                                </html>`,

//             });
//             await sendEmail({
//                 for: "job applicant",
//                 sendemail: email,
//                 subject: "Thank you for Your Interest",
//                 email,
//                 html: `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Form Submission</title>
//     <style>
//         body {
//             margin: 0;
//             padding: 0;
//             background-color: #f5f5f5;
//             font-family: Arial, sans-serif;
//         }
//         .email-container {
//             max-width: 600px;
//             margin: 20px auto;
//             background-color: #ffffff;
//             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//             border-radius: 8px;
//             overflow: hidden;
//         }
//         .email-header {
//             background-color: #0e0e0e;
//             padding: 20px;
//             text-align: center;
//             color: #ffffff;
//         }
//         .email-header img {
//             max-width: 150px;
//             margin-bottom: 10px;
//         }
//         .email-header h1 {
//             margin: 0;
//             font-size: 24px;
//             color: #fff;
//         }
//         .email-body {
//             padding: 20px;
//             color: #505050;
//             line-height: 1.6;
//             background-color: #fff;
//         }
//         .email-body h2 {
//             font-size: 20px;
//             margin-bottom: 10px;
//             color: #0e0e0e;
//         }
//         .email-body p {
//             margin-bottom: 15px;
//         }
//         .email-footer {
//             background-color: #f5f5f5;
//             padding: 15px;
//             text-align: center;
//             font-size: 14px;
//             color: #464c5e;
//         }
//         .email-footer a {
//             color: #464c5e;
//             text-decoration: none;
//         }
//     </style>
// </head>
// <body>
//     <div className="email-container">
//         <div className="email-header">
//             <!-- Logo Section -->
//             <img src="https://www.fifilo.com/assets/img/logo.png" alt="Company Logo">
//             <h1>Thank You for Your Submission!</h1>
//         </div>
//         <div className="email-body">
//             <h2>Hi ${name},</h2>
//             <p>Thank you for submitting your form. We have received your details and our team will get back to you shortly.</p>
//             <p>If you have any questions or need further assistance, feel free to reply to this email .</p>
//            <!-- <p>Below are the details you submitted:</p>
//             <ul>
//                 <li><strong>Name:</strong> ${name}</li>
//                 <li><strong>Email:</strong> ${email}</li>
//                 <li><strong>PhoneNumber:</strong>${phonenumber}</li>
//                  <li><strong>Message:</strong>${message}</li>
//             </ul>-->
//             <p>Best Regards,<br/>The FIFILO Team 
//             <br>Web : <a href="www.fifilo.com">www.fifilo.com</a>
//             <br>Mob : +91 9669123488
//             <br>email : hello@fifilo.com </p>     
//         </div>
//         <div className="email-footer">
//             <p>&copy; 2024 FIFILO Designs. All rights reserved.</p>
//         </div>
//     </div>
// </body>
//             </html>`,
//             });
//             let result = await data.save();
//             res.send({ "Status": "success", "message": "your application submitted successfully" })
//         } catch (error) {
//             res.send({ "Status": "failed", "message": error })
//         }
//     } else {
//         res.send({ "status": "failed", "message": "all fields required" })
//     }
// }

// const createContactPage = async (req, res) => {
//     try {
//         const { heroSection, cardSection } = req.body;
//         const contactPage = new contactPageModel({
//             heroSection,
//             cardSection
//         });
//         await contactPage.save();
//         res.status(201).json({ success: true, data: contactPage });
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// }


// const getContactPage = async (req, res) => {
//     try {
//         const contactpage = await contactPageModel.find();
//         res.send({ data: contactpage });
//     } catch (err) {
//         res.status(400).send(err);
//     }
// };
// const getPublishedContactPage = async (req, res) => {
//     try {
//         const contactpage = await contactPageModel.findOne({ published: true });;
//         res.send({ data: contactpage });
//     } catch (err) {
//         res.status(400).send(err);
//     }
// };
// const publishContactPage = async (req, res) => {
//     try {
//         const newPublishedId = req.params.id;
//         await contactPageModel.updateMany({ published: true }, { $set: { published: false } });
//         const publishedData = await contactPageModel.findByIdAndUpdate(newPublishedId, { $set: { published: true } }, { new: true });
//         res.send(publishedData);
//     } catch (err) {
//         res.status(400).send(err);
//     }

// };

// const deleteContactPage = async (req, res) => {
//     try {
//         const result = await contactPageModel.findOneAndDelete({ _id: req.params.id });
//         res.send({ data: result._id, message: "deleted successfully" });
//     } catch (err) {
//         res.status(400).send({ error: err, msg: "no delete" });
//     }
// };
// const updateContactPage = async (req, res) => {
//     try {
//         const updatedData = await contactPageModel.findByIdAndUpdate(req.params.id, { $set: req.body });
//         res.send({ data: updatedData });
//     } catch (err) {
//         res.status(400).send(err);
//     }
// };



// module.exports = { contactusController, jobapplicantController, createContactPage, publishContactPage, getPublishedContactPage, getContactPage, deleteContactPage, updateContactPage }


let { Contactus, contactPageModel } = require("../models/contactModel");
let { jobApplicant } = require("../models/jobapplicantModel");
const { sendEmail } = require("../utils/sendEmail");

const contactusController = async (req, res) => {
    const { name, email, phonenumber, message, } = req.body;
    const contactus = new Contactus(req.body);
    try {
        let date = new Date().toLocaleDateString();
        await sendEmail({
            for: "user",
            sendemail: email,
            subject: "Thank You for Your Submission",
            email,
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Submission</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            font-family: Arial, sans-serif;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .email-header {
            background-color: #0e0e0e;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .email-header img {
            max-width: 150px;
            margin-bottom: 10px;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
            color: #fff;
        }
        .email-body {
            padding: 20px;
            color: #505050;
            line-height: 1.6;
            background-color: #fff;
        }
        .email-body h2 {
            font-size: 20px;
            margin-bottom: 10px;
            color: #0e0e0e;
        }
        .email-body p {
            margin-bottom: 15px;
        }
        .email-footer {
            background-color: #f5f5f5;
            padding: 15px;
            text-align: center;
            font-size: 14px;
            color: #464c5e;
        }
        .email-footer a {
            color: #464c5e;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div className="email-container">
        <div className="email-header">
            <!-- Logo Section -->
            <img src="https://www.fifilo.com/assets/img/logo.png" alt="Company Logo">
            <h1>Thank You for Your Submission!</h1>
        </div>
        <div className="email-body">
            <h2>Hi ${name},</h2>
            <p>Thank you for submitting your form. We have received your details and our team will get back to you shortly.</p>
            <p>If you have any questions or need further assistance, feel free to reply to this email .</p>
           <!-- <p>Below are the details you submitted:</p>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>PhoneNumber:</strong>${phonenumber}</li>
                 <li><strong>Message:</strong>${message}</li>
            </ul>-->
            <p>Best Regards,<br/>The FIFILO Team
            <br>Web : <a href="www.fifilo.com">www.fifilo.com</a>
            <br>Mob : +91 9669123488
            <br>email : hello@fifilo.com </p>
        </div>
        <div className="email-footer">
            <p>&copy; 2024 FIFILO Designs. All rights reserved.</p>
        </div>
    </div>
</body>
            </html>`
        });
        await sendEmail({
            for: "admin",
            sendemail: process.env.SMPT_MAIL,
            subject: "New Form Submission recieved", email, html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Form Submission</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .email-header {
            background-color: #0e0e0e;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .email-header img {
            max-width: 150px;
            margin-bottom: 10px;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
            background-color: #fff;
        }
        .email-body h2 {
            font-size: 20px;
            margin-bottom: 10px;
            color: #444444;
        }
        .email-body p {
            margin-bottom: 15px;
        }
        .email-body ul {
            list-style-type: none;
            padding: 0;
        }
        .email-body ul li {
            background-color: #f9f9f9;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 4px;
            border-left: 4px solid #1FADA1;
        }
        .email-footer {
            background-color: #f6f7f9;
            padding: 15px;
            text-align: center;
            font-size: 14px;
            color: #777777;
        }
        .email-footer a {
            color: #1FADA1;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div className="email-container">
        <div className="email-header">
            <!-- Logo Section -->
            <img src="https://www.fifilo.com/assets/img/logo.png" alt="Company Logo">
            <h1>New Form Submission Received</h1>
        </div>
        <div className="email-body">
            <h2>Form Details:</h2>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong>  ${email}</li>
                <li><strong>PhoneNumber:</strong>  ${phonenumber}</li>
                 <li><strong>Message:</strong>  ${message}</li>
            </ul>
            <p>Submitted on: <strong>${date}</strong></p>
        </div>
        <div className="email-footer">
            <p>&copy; 2024 FIFILO Designs. All rights reserved.</p>
        </div>
    </div>
</body>
               </html>`
        });
        const data = await contactus.save();
        res.status(200).json({
            success: true, message: `Email sent to ${email} successfully`,
        });
    } catch (error) {

        res.status(400).json({ success: false, error, message: `Email not sent ` })
    }
}


const jobapplicantController = async (req, res) => {
    let { name, email, phonenumber, message, jobrole, resume } = req.body;
    if (name && email && phonenumber && message) {
        try {
            let date = new Date().toLocaleDateString();
            let data = new jobApplicant({ name, email, phonenumber, message, jobrole, date });
            if (req.file) {
                data.resume = req.file.path
            } else {
                return res.json({ "status": "error", "message": "pdf not found" })
            }
            await sendEmail({
                for: "admin",
                sendemail: process.env.SMPT_MAIL,
                subject: "New Form Submission recieved",
                email,
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Form Submission</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                            font-family: Arial, sans-serif;
                        }
                        .email-container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            border-radius: 8px;
                            overflow: hidden;
                        }
                        .email-header {
                            background-color: #0e0e0e;
                            padding: 20px;
                            text-align: center;
                            color: #ffffff;
                        }
                        .email-header img {
                            max-width: 150px;
                            margin-bottom: 10px;
                        }
                        .email-header h1 {
                            margin: 0;
                            font-size: 24px;
                        }
                        .email-body {
                            padding: 20px;
                            color: #333333;
                            line-height: 1.6;
                            background-color: #fff;
                        }
                        .email-body h2 {
                            font-size: 20px;
                            margin-bottom: 10px;
                            color: #444444;
                        }
                        .email-body p {
                            margin-bottom: 15px;
                        }
                        .email-body ul {
                            list-style-type: none;
                            padding: 0;
                        }
                        .email-body ul li {
                            background-color: #f9f9f9;
                            padding: 10px;
                            margin-bottom: 10px;
                            border-radius: 4px;
                            border-left: 4px solid #1FADA1;
                        }
                        .email-footer {
                            background-color: #f6f7f9;
                            padding: 15px;
                            text-align: center;
                            font-size: 14px;
                            color: #777777;
                        }
                        .email-footer a {
                            color: #1FADA1;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div className="email-container">
                        <div className="email-header">
                            <!-- Logo Section -->
                            <img src="https://www.fifilo.com/assets/img/logo.png" alt="Company Logo">
                            <h1>New Form Submission Received</h1>
                        </div>
                        <div className="email-body">
                            <h2>Form Details:</h2>
                            <ul>
                                <li><strong>Name:</strong> ${name}</li>
                                <li><strong>Email:</strong>  ${email}</li>
                                <li><strong>PhoneNumber:</strong>  ${phonenumber}</li>
                                 <li><strong>Message:</strong>  ${message}</li>
                            </ul>
                            <p>Submitted on: <strong>${date}</strong></p>
                        </div>
                        <div className="email-footer">
                            <p>&copy; 2024 FIFILO Designs. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                               </html>`,
                attachments: [{
                    filename: `${name}'s resume.pdf`,
                    path: req.file.path,
                    contentType: 'application/pdf'
                }]
            });
            await sendEmail({
                for: "job applicant",
                sendemail: email,
                subject: "Thank you for Your Interest",
                email,
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Submission</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            font-family: Arial, sans-serif;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .email-header {
            background-color: #0e0e0e;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .email-header img {
            max-width: 150px;
            margin-bottom: 10px;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
            color: #fff;
        }
        .email-body {
            padding: 20px;
            color: #505050;
            line-height: 1.6;
            background-color: #fff;
        }
        .email-body h2 {
            font-size: 20px;
            margin-bottom: 10px;
            color: #0e0e0e;
        }
        .email-body p {
            margin-bottom: 15px;
        }
        .email-footer {
            background-color: #f5f5f5;
            padding: 15px;
            text-align: center;
            font-size: 14px;
            color: #464c5e;
        }
        .email-footer a {
            color: #464c5e;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div className="email-container">
        <div className="email-header">
            <!-- Logo Section -->
            <img src="https://www.fifilo.com/assets/img/logo.png" alt="Company Logo">
            <h1>Thank You for Your Submission!</h1>
        </div>
        <div className="email-body">
            <h2>Hi ${name},</h2>
            <p>Thank you for submitting your form. We have received your details and our team will get back to you shortly.</p>
            <p>If you have any questions or need further assistance, feel free to reply to this email .</p>
           <!-- <p>Below are the details you submitted:</p>
            <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>PhoneNumber:</strong>${phonenumber}</li>
                 <li><strong>Message:</strong>${message}</li>
            </ul>-->
            <p>Best Regards,<br/>The FIFILO Team
            <br>Web : <a href="www.fifilo.com">www.fifilo.com</a>
            <br>Mob : +91 9669123488
            <br>email : hello@fifilo.com </p>
        </div>
        <div className="email-footer">
            <p>&copy; 2024 FIFILO Designs. All rights reserved.</p>
        </div>
    </div>
</body>
            </html>`,
            });
            let result = await data.save();
            res.send({ "Status": "success", "message": "your application submitted successfully" })
        } catch (error) {
            res.send({ "Status": "failed", "message": error })
        }
    } else {
        res.send({ "status": "failed", "message": "all fields required" })
    }
}

const createContactPage = async (req, res) => {
    try {
        const { heroSection, cardSection } = req.body;
        const contactPage = new contactPageModel({
            heroSection,
            cardSection
        });
        await contactPage.save();
        res.status(201).json({ success: true, data: contactPage });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}


const getContactPage = async (req, res) => {
    try {
        const contactpage = await contactPageModel.find();
        res.send({ data: contactpage });
    } catch (err) {
        res.status(400).send(err);
    }
};
const getPublishedContactPage = async (req, res) => {
    try {
        const contactpage = await contactPageModel.findOne({ published: true });;
        res.send({ data: contactpage });
    } catch (err) {
        res.status(400).send(err);
    }
};
const publishContactPage = async (req, res) => {
    try {
        const newPublishedId = req.params.id;
        await contactPageModel.updateMany({ published: true }, { $set: { published: false } });
        const publishedData = await contactPageModel.findByIdAndUpdate(newPublishedId, { $set: { published: true } }, { new: true });
        res.send(publishedData);
    } catch (err) {
        res.status(400).send(err);
    }

};

const deleteContactPage = async (req, res) => {
    try {
        const result = await contactPageModel.findOneAndDelete({ _id: req.params.id });
        res.send({ data: result._id, message: "deleted successfully" });
    } catch (err) {
        res.status(400).send({ error: err, msg: "no delete" });
    }
};
const updateContactPage = async (req, res) => {
    try {
        const updatedData = await contactPageModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.send({ data: updatedData });
    } catch (err) {
        res.status(400).send(err);
    }
};


module.exports = { contactusController, jobapplicantController, createContactPage, publishContactPage, getPublishedContactPage, getContactPage, deleteContactPage, updateContactPage }

