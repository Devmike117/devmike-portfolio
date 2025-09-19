const btn = document.getElementById('send-button');

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  btn.textContent = 'Enviando...';

  const data = {
    from_name: document.getElementById('from_name').value,
    from_email: document.getElementById('from_email').value,
    message: document.getElementById('message').value
  };

  fetch('/.netlify/functions/sendEmail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})

  .then(res => res.json())
  .then(result => {
    btn.textContent = 'Enviar mensaje';
    if (result.success) {
      alert('¡Mensaje enviado con éxito!');
    } else {
      alert('Error al enviar: ' + result.error);
    }
  })
  .catch(err => {
    btn.textContent = 'Enviar mensaje';
    alert('Error inesperado: ' + err.message);
  });
});

