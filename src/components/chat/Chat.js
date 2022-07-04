import "./Chat.css";
import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { MoreVert, AttachFile, SearchOutlined, InsertEmoticon, MicOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

function Chat() {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

      <div className="chat__headerInfo">
        <h3>Room Name</h3>
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
        <p className={`chat__message ${true && "chat__receiver"}`}>
            <span className="chat__name"> Anabia Alam </span>
            Yaar neend arahi haiiii
            <span className="chat__timestamp">4:05 pm</span>
        </p>
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
            <input type='text' />
            <button>Send a message</button>
        </form>
        <MicOutlined />
      </div>
    </div>

  );
}

export default Chat;
