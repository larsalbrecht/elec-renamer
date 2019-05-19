const { app, protocol } = require('electron');
const fs = require('fs');
const pathJoin = require('path').join;

const es6Path = __dirname;

protocol.registerSchemesAsPrivileged([{
  scheme: 'es6',
  privileges: {
    standard: true,
    secure: true,
  },
}]);

const Window = require('./Window');

const mainWindow = null;

function createWindow() {
  // eslint-disable-next-line
  (new Window());
}

function registerProtocol() {
  protocol.registerBufferProtocol('es6', (req, cb) => {
    fs.readFile(
      pathJoin(es6Path, req.url.replace('es6://', '')),
      (e, b) => {
        cb({
          mimeType: 'text/javascript',
          data: b,
        });
      },
    );
  });
}

app.on('ready', async () => {
  registerProtocol();
  await createWindow();
});

// Verlassen, wenn alle Fenster geschlossen sind.
app.on('window-all-closed', () => {
  // Unter macOS ist es üblich, für Apps und ihre Menu Bar
  // aktiv zu bleiben, bis der Nutzer explizit mit Cmd + Q die App beendet.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // Unter macOS ist es üblich ein neues Fenster der App zu erstellen, wenn
  // das Dock Icon angeklickt wird und keine anderen Fenster offen sind.
  if (mainWindow === null) {
    createWindow();
  }
});
