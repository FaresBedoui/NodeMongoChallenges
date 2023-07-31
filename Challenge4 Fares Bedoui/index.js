require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendTextEmail() {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: 'faresmig29@gmail.com',
    subject: 'Test email (Text format)',
    text: 'Ceci est un e-mail au format texte envoyé depuis Node.js avec Nodemailer.',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé :', info.response);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
  }
}

// Appel de la fonction pour envoyer l'e-mail au format texte
sendTextEmail();
