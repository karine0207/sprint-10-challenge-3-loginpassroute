const middlewares = require('./middlewares');

const configurarRutas = (app) => {

  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1'
          ? 'Palabra incorrecta, inténtalo de nuevo.'
          : 'No has iniciado sesión.')
      : '';

    if (req.session.palabraSecreta) {
      return res.redirect('/perfil');
    }

    res.send(`
      <html>
        <body>
          <h1>Página de Inicio</h1>
          <p style="color:red;">${mensajeError}</p>
          <form method="post" action="/perfil">
            <label for="palabra">Introduce la palabra secreta:</label>
            <input type="text" name="palabra" required>
            <button type="submit">Enviar</button>
          </form>
        </body>
      </html>
    `);
  });


  app.get('/perfil', middlewares.verificarSesion, (req, res) => {
    res.send(`
      <h1>Perfil (Sesión activa)</h1>
      <form method="post" action="/cerrar-sesion">
        <button type="submit">Cerrar Sesión</button>
      </form>
    `);
  });

  app.post('/perfil', middlewares.validarPalabra, (req, res) => {
    res.send(`
      <h1>¡Has accedido correctamente!</h1>
      <form method="post" action="/cerrar-sesion">
        <button type="submit">Cerrar Sesión</button>
      </form>
    `);
  });


  app.post('/cerrar-sesion', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
      }
      res.redirect('/');
    });
  });
};

module.exports = {
  configurarRutas
};
