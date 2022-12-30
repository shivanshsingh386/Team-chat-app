import React, { useEffect, useState } from "react";
import {io} from 'socket.io-client';
import "./Chat.css"

const Chat = () => {
  const [messageList, setMessageList] = useState([])

  const [inputText, setInputText] = useState("");

  const [socket, setSocket] = useState(io('http://localhost:5000', {autoConnect: false}));

  useEffect(() => {
    socket.connect();
  }, [])

  socket.on('recmsg', (data) => {
    setMessageList([...messageList, data])
  })
  

  const sendMessage = () => {
    if (!inputText.trim()) return
    const temp = { text: inputText, sent: true }
    socket.emit('sendmsg', temp);
    setMessageList([...messageList, temp])
    setInputText("");
  }

  return (
    <div style={{ backgroundColor: "#ccc", minHeight: "100vh" }}>
      <div className="container pt-5">
        <div className="card">
          <div className="card-header">
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img src="https://www.shutterstock.com/image-vector/talk-logo-design-template-260nw-1334076377.jpg" height={100} width={100} alt="MDB Logo" loading="lazy" />
            </a>
          </div>
          <div
            className="card-body chat-body"
            style={{
              height: "70vh",
              backgroundImage: "url('https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Background.max-1000x1000.jpg')",
            }}>
            {messageList.map((obj) => (
              <div className={obj.sent ? "msg-sent" : "msg-rec"}>
                <p className="m-0">{obj.text}</p>
              </div>
            ))}
          </div>
          <div className="card-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setInputText(e.target.value)
                }}
                value={inputText}
              />
              <button className="btn btn-success" onClick={sendMessage}>
                <i class="fas fa-paper-plane"></i> &nbsp; Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat