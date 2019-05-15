const { app } = require('electron');
const Window = require('./src/Window');

const mainWindow = null;

function createWindow() {
  // eslint-disable-next-line
  (new Window());
}

app.on('ready', createWindow);


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
