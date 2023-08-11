const express = require('express');
const api = express.Router();
const { sendEmail } = require('../controllers/emailController');

api.post('/EnviarEmail', async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    await sendEmail(to, subject, html);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error });
  }
});

module.exports = api;
