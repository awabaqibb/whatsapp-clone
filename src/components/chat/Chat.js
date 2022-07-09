import db from "../../firebase.config";
import firebase from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import useSound from "use-sound";
import { useParams } from "react-router-dom";
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
import { doc, onSnapshot, getDoc, addDoc, collection } from "firebase/firestore";

import { IconButton } from "@mui/material";

function Chat() {
  const displayName = localStorage.getItem("displayName");
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messagess, setMessages] = useState([]);
  const [issendChecked, setIssendChecked] = useState(false);

  const [playOn] = useSound(`${process.env.PUBLIC_URL}/send.mp3`, {
    volume: 0.5,
  });
  const [playOff] = useSound(`${process.env.PUBLIC_URL}/send.mp3`, {
    volume: 0.5,
  });

  const addNewUser=async()=> {
    let auth = getAuth()
    let user = auth.currentUser;

    const docRef = await addDoc(collection(db, "rooms", roomId, "messages"), {
      name: user.displayName,
      message: input
    });
    console.log("Document written with ID: ", docRef.id);

  }

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));

    if (roomId) {
      const colRef = doc(db, "rooms", roomId);
      onSnapshot(colRef, (snapshot) => setRoomName(snapshot.data().name));

      const data = [];
      let collectionRef = collection(db, "rooms", roomId, "messages");

      onSnapshot(collectionRef, (querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          data.push({ id: doc.id, data: doc.data() });
        });
        setMessages(data);
      });
      
      console.log(data);
    }
  }, [roomId]);

  const sendMessage = (e) => {    

    e.preventDefault();
    if (input.length > 0) {
      
      addNewUser()
      
      setIssendChecked(!issendChecked);
      issendChecked ? playOff() : playOn();
      setInput("");
    }
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
        {messagess.map((message)=>(
          <p key={message.id} className={`chat__message ${true && "chat__receiver"}`}>
          <span className="chat__name"> {message.data.name} </span>
          {message.data.message}
          <span className="chat__timestamp">{message.timestamp}</span>
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
