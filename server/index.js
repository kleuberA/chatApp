require('dotenv').config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const app = express();

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

// CORES
let reset = '\u001b[0m';
let azul = '\u001b[34m';
let verde = '\u001b[32m';
let vermelho = '\u001b[31m';

io.on("connection", (socket) => {
  let str = '#';
  console.log(azul + str.repeat(47) + reset);
  console.log(verde + socket.handshake.time);
  console.log(`Usuario Conectado:${vermelho} ${socket.id}` + reset);
  console.log(azul + str.repeat(47) + reset);

  socket.on("join_room", (sala) => {
    socket.join(sala);
    let str = '#';
    console.log(azul + str.repeat(47) + reset);
    console.log(verde + `Usuario:${vermelho} ${socket.id} ${verde}entrou na sala:${vermelho} ${sala}` + reset);
    console.log(azul + str.repeat(47) + reset);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data)
    // console.log(`${verde}Mensagem enviada:${vermelho} ${data.message} ${verde}pelo usuario ${vermelho}${socket.id}`+ reset);
  });

  socket.on("disconnect", () => {
    let str = '#';
    console.log(vermelho + str.repeat(47) + reset);
    console.log(verde + "Usuario desconectado. " + socket.id + reset);
    console.log(vermelho + str.repeat(47) + reset);
  });
});

server.listen(process.env.PORT || 3001, () => {
  let str = '-';
  console.log(azul + str.repeat(47));
  console.log(str.repeat(15)+'SERVIDOR INICIADO'+str.repeat(15));
  console.log(str.repeat(15)+'CHAT APS'+str.repeat(24))
  console.log(str.repeat(47) + reset);
});