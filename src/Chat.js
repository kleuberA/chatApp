import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" + 
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="janelaChatContainer">
      <div className="chatHeaderContainer">
        <p>Chat Aps</p>
      </div>
      <div className="chatBodyContainer">
        <ScrollToBottom className="containerMessage">
          {messageList.map((messageContent, key) => {
            return (  
              <div
                className="mensagem"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="conteudoDaMensagem">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="informacaoMensagem">
                    <p id="author">{messageContent.author} </p>
                    <p id="time"> {messageContent.time} </p>
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
          value={currentMessage}
          placeholder="Digite sua mensagem..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}><ion-icon name="paper-plane-outline"></ion-icon></button>
      </div>
    </div>
  );
}

export default Chat;