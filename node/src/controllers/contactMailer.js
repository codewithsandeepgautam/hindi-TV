const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')
const credentials = require('../credentials.json')
const {google} = require('googleapis')
const contactModal = require('../models/contactModal')

const contactController = asyncHandler(async (req, res) => {
    console.log(req.body)
 
    const { name, email, subject, message } = req.body || {};
  
if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Invalid request body' });
}
    const emailTemp = `
    <html>
        <head>
            <style>
                .title {
                    color: #fff;
                    font-weight: 900;
                    font-family: cursive;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: #f09f12;
                    padding: 20px;
                    text-align: center;
                }
                .button {
                    background-color: #02073b; 
                    border: none;
                    color: white;
                    padding: 15px 32px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                }
                table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }
                td, th {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                    color: #fff;
                }
                td {
                    vertical-align: top;
                }
                tr th:first-child {
                    width: 80px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1 class="title">My Hindi TV</h1>
                <h2 class="title">Contact Form Submission</h2>
                <table>
                    <tr>
                        <td>Name</td>
                        <td>${name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><a href='mailto:${email}'>${email}</a></td>
                    </tr>
                    <tr>
                        <td>Subject</td>
                        <td>${subject}</td>
                    </tr>
                    <tr>
                        <td>Message</td>
                        <td>${message}</td>
                    </tr>
                </table>
            </div>
        </body>
    </html>
    
    `

    try {
        const transporter = nodemailer.createTransport({

          host: process.env.GOOGLE_HOST,
            port: 465,
            secure: true, 
            auth: {
                user: process.env.GOOGLE_MAIL,
                pass: process.env.GOOGLE_PASS
            }
        })
        
        const mailOptions = {
            from: email,
            to: process.env.GOOGLE_MAIL,
            subject: `My Hindi TV | Contact | ${subject}`,
            html: emailTemp
          };

          const status = await transporter.sendMail(mailOptions)

          if(status){
            const newContact = await contactModal.create({
                name: name,
                email:email,
                subject: subject,
                message: message
            })
            await uploadToSheet(req.body)
            res.status(200).json({message:"Email sent successfully",contact: newContact});
          }
          return status 

    } catch (error) {
        console.log(error);
    res.status(500).json(error);
    } 
})


async function uploadToSheet(body) {
    try {
      const { name, email, subject, message } = body;
      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
  
      const sheets = google.sheets({ version: 'v4', auth }); 
  
      const spreadsheetId = process.env.SPREADSHEET_ID
      const range = 'myHindi';
  
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
  
      const existingValues = response.data.values || [];
      const currentDate = await convertDate();
      const newValues = [
        ...(existingValues.length > 0 ? [] : [['Date', 'Name', 'Subject', 'Message', 'Email']]), // Add the header only if it doesn't exist
        ...existingValues, // Add existing values
        [currentDate, name, subject, message, email], // Add the new data
      ];
  
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: {
          values: newValues,
        },
      });
    } catch (error) {
      console.error('Error uploading to Google Sheets:', error);
      throw new Error('Error uploading to Google Sheets');
    }
  }
  
  async function convertDate() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate
  }

  
  

module.exports = {contactController}