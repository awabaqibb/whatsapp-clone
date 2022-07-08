import db from "../../firebase.config";
import {useParams} from 'react-router-dom'
import "./Chat.css";
import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import {
  MoreVert,
  AttachFile,
  SearchOutlined,
  InsertEmoticon,
  MicOutlined,
} from "@mui/icons-material";
import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import { IconButton } from "@mui/material";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const {roomId} = useParams()
  const [roomName, setRoomName] = useState("")
  const [messages, setMessages] = useState("")

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));

    if(roomId){
      console.log(roomId)
      const colRef = doc(db, "rooms", roomId)
      onSnapshot(colRef, (snapshot) => (
        setRoomName(snapshot.data().name)
      ))
      
      colRef.collection("messages").orderBy("timestamp", "asc").onSnapshot(
        (snapshot)=> setMessages(snapshot.docs.map((doc) => doc.data()))
      )
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault()
    console.log(input)
    setInput('')
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message)=>(
          <p className={`chat__message ${true && "chat__receiver"}`}>
          <span className="chat__name"> {message.name} </span>
          {message.message}
          <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
        </p>
        ))}
        
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message..."
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicOutlined />
      </div>
    </div>
  );
}

export default Chat;
