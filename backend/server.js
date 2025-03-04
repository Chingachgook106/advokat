const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path'); 
const cors = require('cors'); // Подключение cors

const app = express();
// const PORT = process.env.PORT || 3000; 
const PORT = 3000;
app.use(cors()); 
app.use(express.static(path.join(__dirname, '/')));

const upload = multer({ dest: 'upload/' });

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send-email', upload.single('file'), (req, res) => {
    const filePath = path.join(__dirname, 'upload', req.file.filename);

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
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
