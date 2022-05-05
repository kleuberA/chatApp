import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [mensagemAtual, setMensagemAtual] = useState("");
  const [listaDeMensagens, setListaDeMensagens] = useState([]);

  const enviarMensagem = async () => {
    if (mensagemAtual !== "") {
      const dadosDaMensagem = {
        room: room,
        autorDaMensagem: username,
        message: mensagemAtual,
        time:
          new Date(Date.now()).getHours() +
          ":" + 
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", dadosDaMensagem);
      setListaDeMensagens((lista) => [...lista, dadosDaMensagem]);
      setMensagemAtual("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setListaDeMensagens((lista) => [...lista, data]);
    });
  }, [socket]);

  return (
    <div className="janelaChatContainer">
      <div className="chatHeaderContainer">
        <p>Chat Aps</p>
      </div>
      <div className="chatBodyContainer">
        <ScrollToBottom className="containerMessage">
          {listaDeMensagens.map((conteudoDaMensagem, key) => {
            return (  
              <div
                className="mensagem"
                id={username === conteudoDaMensagem.autorDaMensagem ? "you" : "other"}
              >
                <div>
                  <div className="conteudoDaMensagem">
                    <p>{conteudoDaMensagem.message}</p>
                  </div>
                  <div className="informacaoMensagem">
                    <p id="author">{conteudoDaMensagem.autorDaMensagem} </p>
                    <p id="time"> {conteudoDaMensagem.time} </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={mensagemAtual}
          placeholder="Digite sua mensagem..."
          onChange={(event) => {
            setMensagemAtual(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && enviarMensagem();
          }}
        />
        <button onClick={enviarMensagem}><ion-icon name="paper-plane-outline"></ion-icon></button>
      </div>
    </div>
  );
}

export default Chat;