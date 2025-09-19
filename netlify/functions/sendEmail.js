const fetch = require("node-fetch");

exports.handler = async function(event) {
  try {
    const data = JSON.parse(event.body);

    if (!data.from_name || !data.from_email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Missing required fields" })
      };
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        template_params: {
          from_name: data.from_name,
          from_email: data.from_email,
          message: data.message
        },
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY
      })
    });

    const text = await response.text(); 

    if (!response.ok) {
      throw new Error(`EmailJS API error: ${response.status} ${response.statusText} - ${text}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, result: text })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
