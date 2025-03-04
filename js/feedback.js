function sendFile() {
  const message = document.getElementById('message').value;
  const blob = new Blob([message], { type: 'text/plain' });
  const formData = new FormData();
  formData.append('file', blob, 'message.txt');

  fetch('https://advokat-byfy.vercel.app/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
});

  .then(response => response.text())
  .then(result => {
      alert(result);
  })
  .catch(error => {
      console.error('Ошибка:', error);
  });
}