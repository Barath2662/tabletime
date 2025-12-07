// services/websocket.js
import { Server } from 'socket.io';

let io;

export const initWebSocket = (server) => {
  // Allow comma-separated origins in FRONTEND_URL; default to localhost and http://127.0.0.1
  const rawOrigins = process.env.FRONTEND_URL || 'https://tabletime-msc.vercel.app,http://localhost:8080';
  const originList = rawOrigins
    .split(',')
    .map((s) => s.trim().replace(/\/+$/, ''))
    .filter(Boolean);
  io = new Server(server, {
    cors: {
      origin: originList,
      methods: ['GET', 'POST']
    }
  });

  // Save instance to global so controllers using global.io.emit(...) work
  global.io = io;

  console.log('Allowed socket origins:', originList.join(', '));

  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

export const broadcast = (event, data) => {
  if (io) {
    io.emit(event, data);
  }
};