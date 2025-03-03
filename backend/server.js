const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const upload = multer({ dest: path.join(__dirname, '../uploads') });

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email-password',
        pass: 'your-email-password',
    },
});

app.post('/send-email', upload.single('file'), (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.file.filename);

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@gmail.com',
        subject: 'Новое сообщение с сайта',
        text: 'Пользователь отправил сообщение.',
        attachments: [
            {
                filename: 'message.txt',
                path: filePath
            }
        ]
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(500).send('Ошибка отправки email.');
        }
        
        // Удаляем файл после отправки
        fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Ошибка удаления файла:', unlinkErr);
            }
        });

        res.send('Сообщение успешно отправлено.');
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
