import React, { useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ENDPOINT = 'https://62683b12f8b60c09e1837b2e--beautiful-vacherin-5c5d48.netlify.app/';
let socket;

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  useEffect(()=>{
    socket = io(ENDPOINT);
  })
  
  //Implementar alert success com o id do usuario.
  console.log(socket.id)

  return (
    <>
    
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3 className="titulo-principal">Chat Aps</h3>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField id="input-with-sx" className="inputNomeUsuario" label="Nome Usuario" variant="standard" onChange={(event) => {
              setUsername(event.target.value);
            }}/>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField id="input-with-sx" label="ID Sala" variant="standard" onChange={(event) => {
              setRoom(event.target.value);
            }}/>
          </Box>
          {/* <input
            type="text"
            placeholder="Nome Usuario"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          /> */}
          {/* <input
            type="text"
            placeholder="ID Sala"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          /> */}
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
