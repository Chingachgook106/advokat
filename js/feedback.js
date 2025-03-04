function sendFile() {
    const message = document.getElementById('message').value;
    const blob = new Blob([message], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', blob, 'message.txt');

    fetch('https://advokat-byfy.vercel.app/send-email', {
        method: 'POST',
        body: formData, // Не указывай Content-Type, браузер добавит его автоматически
    })
    .then(response => response.text())
    .then(result => {
        alert(result); // Выведет результат от сервера
    })
    .catch(error => {
        console.error('Ошибка:', error); // Покажет детали ошибки в консоли
    });
}
