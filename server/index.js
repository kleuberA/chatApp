const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        "Access-Control-Allow-Methods": "GET,POST",
        "Access-Control-Allow-Headers": "*"
      });
      res.end();
    }
  },
});

io.on("connection", (socket) => {
  console.log(`Usuario Conectado: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`ID Usuario: ${socket.id} entrou na sala: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado.", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVIDOR RODANDO.");
});