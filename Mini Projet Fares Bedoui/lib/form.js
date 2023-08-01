const form = () => {
  return `
  <!DOCTYPE html>
  <html>
  <body>
  <h1>Tutoriel HTML et CSS</h1>
<form method="post" action="form.php">
  <div class="champ">
    <label for="pseudo">Entrez un pseudonyme : </label>
    <input type="text" id="pseudo">
  </div>
  <div class="champ">
    <label for="pass">Entrez un mot de passe :</label>
    <input type="password" id="pass">
  </div>
  <div class="champ">
    <label for="mail">Entrez un mail :</label>
    <input type="email" id="mail">
  </div>
</form>
</body>
</html>`;
};
module.exports = {form,}