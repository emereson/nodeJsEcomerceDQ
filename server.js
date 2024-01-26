import 'dotenv/config';
import { app } from './app.js';
import { db } from './config/database.config.js';
import { initModel } from './models/initModels.js';
import http from 'http'; // Importa el módulo http
import { Server as SocketServer } from 'socket.io';

const PORT = process.env.PORT || 3031;

const server = http.createServer(app);

const io = new SocketServer(server, {
  path: '/socket.io',
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`WebSocket connected: ${socket.id}`);
});

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
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
