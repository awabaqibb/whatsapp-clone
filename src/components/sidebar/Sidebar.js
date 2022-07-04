import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import "./Sidebar.css";
import SidebarChat from './SidebarChat';

function Sidebar() {
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
              <input
                placeholder="Search or Start a new chat"
                type="text" />
            </div>
        </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat={true}/>
        <SidebarChat />

      </div>
    </div>
  );
}

export default Sidebar;
