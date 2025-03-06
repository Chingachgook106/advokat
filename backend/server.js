const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path'); 
const cors = require('cors');

const app = express(); 

const uploadDir = path.join(__dirname, 'upload');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use(cors({
    origin: process.env.CORS_ORIGIN, // Укажи URL фронтенда
    methods: ['POST', 'GET'],
    credentials: true
}));

app.use(express.static(path.join(__dirname, '/')));

const upload = multer({ dest: '/tmp/' });

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

app.post('/send-email', upload.single('file'), (req, res) => { 
    console.log('Получен POST-запрос!');
    
    if (!req.file) {
        return res.status(400).send('Файл не выбран!');
    }

const filePath = req.file.path;

const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Новое сообщение с сайта',
    text: 'Пользователь отправил сообщение.',
    attachments: [{
        filename: 'message.txt',
        path: filePath
    }]
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.error('Ошибка Nodemailer:', err);
        return res.status(500).send('Ошибка отправки email.');
    }

    fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
        console.error('Ошибка удаления файла:', unlinkErr);
        return res.status(500).send('Файл не удалён, но сообщение отправлено.');
        }
        res.send('Сообщение успешно отправлено.');
    });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});