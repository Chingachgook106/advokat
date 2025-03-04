function sendFile() {
  const message = document.getElementById('message').value;
  const blob = new Blob([message], { type: 'text/plain' });
  const formData = new FormData();
  formData.append('file', blob, 'message.txt');

  fetch('https://vercel.com/yeliseis-projects/advokat-eh2r/CWGtDRgJR6NfkSNS7LkkhQbi7Fc2/send-email', {
      method: 'POST',
      body: formData
  })
  .then(response => response.text())
  .then(result => {
      alert(result);
  })
  .catch(error => {
      console.error('Ошибка:', error);
  });
}