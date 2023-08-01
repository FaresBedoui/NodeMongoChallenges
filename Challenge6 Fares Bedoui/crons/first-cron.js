const cron = require('node-cron');

cron.schedule('*/2 * * * *', () => {
  console.log('Ceci est un message qui s\'affiche toutes les deux minutes.');
});
