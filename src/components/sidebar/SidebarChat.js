import { Avatar } from "@mui/material";
import db from "../../firebase.config";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import "./SidebarChat.css";
import {
    doc,
    getDocs,
    onSnapshot,
    collection,
    query,
    where,
    addDoc,
  } from "firebase/firestore";

function SidebarChat({ addNewChat, id, name }) {
    const [seed, setSeed] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () => {
        const roomName = prompt("Enter chat room name: ")
        if(roomName){
            const colRef = collection(db, "rooms")
            addDoc(colRef, {
                name: roomName,
            })
        }
    };

    return !addNewChat ? ( 
        <Link to={`/rooms/${id}`}> 
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2> 
                <p> Last message ... </p>
            </div>
        </div>
        </Link>
     ):
     (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add New Chat</h2>
        </div>

     );
}

export default SidebarChat;