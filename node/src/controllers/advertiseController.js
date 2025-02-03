const nodemailer = require("nodemailer");
const advertiseSchema = require("../models/advertiseModal");

const advertiseController = async(req, res) =>{
    const {businessName, businessType, email, address, message} = req.body;
    if(!businessName || !businessType || !email || !address || !message){
        return res.status(400).json({error:"Feilds are empty"})
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
                <h2 class="title">Advertisement Form Submission</h2>
                <table>
                    <tr>
                        <td>Business Name</td>
                        <td>${businessName}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><a href='mailto:${email}'>${email}</a></td>
                    </tr>
                    <tr>
                        <td>Businees Type</td>
                        <td>${businessType}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>${address}</td>
                    </tr>
                    <tr>
                        <td>Message</td>
                        <td>${message}</td>
                    </tr>
                </table>
            </div>
        </body>
    </html> `
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.GOOGLE_HOST,
            port:465,
            secure:true,
            auth:{
                user: process.env.GOOGLE_MAIL,
                pass: process.env.GOOGLE_PASS
            }
        })
        const mailOptions = {
            from: email,
            to: process.env.GOOGLE_MAIL,
            subject: `My Hindi Tv | Advertise | ${businessName}`,
            html: emailTemp
          };
          const status = await transporter.sendMail(mailOptions)
          if(status){
            const newAdv = await advertiseSchema.create({
                businessName: businessName,
                email: email,
                businessType: businessType,
                address: address,
                message: message,
            })
            res.status(200).json({message: "Query sent successfully", data: newAdv})
          }
          return status
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {advertiseController}