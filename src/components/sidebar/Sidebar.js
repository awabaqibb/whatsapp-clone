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
  getDoc,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";

import db from "../../firebase.config";
import { useStateValue } from "../../StateProvider";

function Sidebar() {
  //state
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue()

    useEffect(() => {
      const data = []
      const colRef = collection(db, "rooms")

      const unsubscribe= onSnapshot(colRef, (snapshot) => {
          snapshot.docs.forEach((doc) => {
              data.push({id: doc.id, data: doc.data()});
          })
          setRooms(data)
      })
      return() => {
        unsubscribe()
      }
  }, [])

  console.log(rooms);

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

      <div className="sidebar__ch ats">
        <SidebarChat addNewChat={true} />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
