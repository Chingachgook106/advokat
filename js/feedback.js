function sendFile() {
    const message = document.getElementById('message').value.trim();
    if (!message) {
        alert("Поле сообщения не может быть пустым!");
        return;
    }

    // Создаем Blob из текста
    const blob = new Blob([message], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', blob, 'message.txt'); // Имя поля должно быть 'file'

    fetch('https://advokat-2indy.vercel.app/send-email', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        console.log('Ответ сервера:', result);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке!');
    });
    }