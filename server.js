import 'dotenv/config';
import { app, server } from './app.js';
import { db } from './config/database.config.js';
import { initModel } from './models/initModels.js';

const PORT = process.env.PORT || 3031;
const PORT2 = 3032;

// Realiza las operaciones de inicialización y sincronización de la base de datos
db.authenticate()
  .then(() => {
    console.log(`Database Authenticated! 👍`);
    return initModel();
  })
  .then(() => {
    return db.sync();
  })
  .then(() => {
    console.log(`Database Synced 💪`);
    server.listen(PORT, () => {
      console.log(`App Running on Port ${PORT}`);
    });
  })
  // .then(() => {
  //   console.log(`Database Synced 💪`);
  //   server.listen(PORT2, () => {
  //     console.log(`Socket io Running on Port ${PORT2}`);
  //   });
  // })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
