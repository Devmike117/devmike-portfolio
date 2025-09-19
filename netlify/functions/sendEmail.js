const emailjs = require('@emailjs/nodejs');

exports.handler = async function(event) {
  const data = JSON.parse(event.body);

  try {
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        from_name: data.from_name,
        from_email: data.from_email,
        message: data.message
      },
      {
        publicKey: process.env.EMAILJS_USER_ID,
        privateKey: process.env.EMAILJS_PRIVATE_KEY
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, response })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.text })
    };
  }
};
