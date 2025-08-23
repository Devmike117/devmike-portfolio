  emailjs.init("4wRnpCV-sT35bRVvF"); 

  const btn = document.getElementById('send-button');

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    btn.textContent = 'Enviando...';

    const serviceID = 'service_co9oyhn';
    const templateID = 'template_2ptdylu';

    const templateParams = {
      from_name: document.getElementById('from_name').value,
      from_email: document.getElementById('from_email').value,
      message: document.getElementById('message').value
    };

    emailjs.send(serviceID, templateID, templateParams)
      .then(() => {
        btn.textContent = 'Enviar mensaje';
        alert('¡Mensaje enviado con éxito!');
      }, (err) => {
        btn.textContent = 'Enviar mensaje';
        alert('Error al enviar: ' + JSON.stringify(err));
      });
  });
