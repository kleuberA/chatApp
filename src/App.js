import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  

  /* Verifica se o nome de usuario e a sala estão em branco, caso não esteja, 
    o usuario e colocado na sala em qual ele informou no formulário*/
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  console.log(socket.id);

  return (
    <>
      <div className="App">
        {!showChat ? (
          <div className="entradaChatContainer">
            <h3 className="titulo-principal">Chat Aps</h3>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <TextField id="input-with-sx" className="inputNomeUsuario" label="Nome Usuario" variant="standard" onChange={(event) => {
                setUsername(event.target.value);
              }}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <TextField id="input-with-sx" label="Sala" variant="standard" onChange={(event) => {
                setRoom(event.target.value);
              }}/>
            </Box>
            <button className="buttonEntarSala" onClick={joinRoom}>Entrar na sala</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </>
  );
}

export default App;