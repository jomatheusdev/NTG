const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
    const { name, email } = req.body;;
    console.log(`Recebido pedido de envio de email para: ${name} <${email}>`);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        debug: true, 
        logger: true
    });

    const htmlContent = fs.readFileSync('./email.html', 'utf8');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Bem-vindo à NTG',
        html: htmlContent.replace('{{name}}', name),
        attachments: [
            {
                filename: 'ntg-logo.png',
                path: './images/ntg-logo.png',
                cid: 'ntg-logo'
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email enviado com sucesso!');
        res.status(200).send('Email enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).send('Erro ao enviar email.');
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
