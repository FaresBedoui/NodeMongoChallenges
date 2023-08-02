const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const { findByEmail } = require('../users');

passport.use(new BearerStrategy(async (token, done) => {
  try {
    const user = await findByEmail(token);
    if (user) {
      return done(null, user); // Token valide, renvoyer l'utilisateur.
    } else {
      return done(null, false); // Token invalide, renvoyer false.
    }
  } catch (error) {
    return done(error); // Erreur lors de la validation du token.
  }
}));
