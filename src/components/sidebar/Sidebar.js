import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useState } from "react";
import { useEffect } from "react";
import {
  doc,
  getDocs,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";

import db from "../../firebase.config";

function Sidebar() {
  //state
  const [rooms, setRooms] = useState([]);

  //firestore reader
  const reader = async () => {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  ////////////////////////////////////////////////////////////////

  useEffect(() => {
    reader();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="siderbar_headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or Start a new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat={true} />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}

        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
