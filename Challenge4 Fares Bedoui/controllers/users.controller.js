const { form } = require("../lib/form");
const {nodeMailer} = require("../lib/nodeMailer")

module.exports = {
  Send: async (req, res) => {
    try {
      const result = await nodeMailer("faresmig29@gmail.com", "test mail", form()); // Appel de la méthode nodeMailer pour envoyer l'e-mail
      res.send("result");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
      res.status(500).send("Erreur lors de l'envoi de l'e-mail");
    }
  },
};