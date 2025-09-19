const fetch = require('node-fetch');

exports.handler = async function(event) {
  const data = JSON.parse(event.body);

  const serviceID = process.env.EMAILJS_SERVICE_ID;
  const templateID = process.env.EMAILJS_TEMPLATE_ID;
  const userID = process.env.EMAILJS_USER_ID;

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      service_id: serviceID,
      template_id: templateID,
      user_id: userID,
      template_params: {
        from_name: data.from_name,
        from_email: data.from_email,
        message: data.message
      }
    })
  });

  if (response.ok) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } else {
    const error = await response.text();
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error })
    };
  }
};
