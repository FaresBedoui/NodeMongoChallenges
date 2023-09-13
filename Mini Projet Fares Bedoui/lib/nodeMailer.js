"use strict";
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config(); // Charge les variables d'environnement à partir du fichier .env

const nodeMailer = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.DB_USER, // Utilise la variable d'environnement pour le nom d'utilisateur
      pass: process.env.DB_PASS, // Utilise la variable d'environnement pour le mot de passe
    },
  });

  const message = {
    from: '"Fares Bedoui" faresmig29@gmail.com', // Adresse de l'expéditeur
    to: to, // Liste des destinataires
    subject: subject, // Objet du message
    text: subject, // Corps du message en texte brut
    html: html, // Corps du message au format HTML
    attachments: [
      {
        filename: "image.png",
        path : "https://logos-download.com/wp-content/uploads/2019/07/Olodum_Logo-628x700.png"
      },
      // {
      //   filename: "fichier.zip",
      //   path : "C:\Users\fares\OneDrive\Bureau\Test Zip.zip"
      // }
    ]
  };

  // Envoi de l'e-mail avec l'objet de transport défini
  await transporter.sendMail(message, (err, info) => {
    if (err) {
      return err
    } else {
      return "mail sent " + info.response;
    }
  });
};

module.exports = { nodeMailer };
