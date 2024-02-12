import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import Conversation from "./conversations";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import React from "react";
import axios from "axios";

function Sidebar() {
  const [chats, setChats] = useState([]);
  const [userid,setUserid]=useState('')
  const nav = useNavigate();

  const addUser = () => {};

  useEffect(() => {
    const getChats = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            'authorization': token,
          },
        };
        const response = await axios.get(
          "http://localhost:5000/getChats",
          config,
          {
            withCredentials: true,
          }
        );
        console.log(response.data.chats);
        setChats(response.data.chats);
        setUserid(response.data.userId)
      } catch (err) {
        console.log(err);
      }
    };
    getChats();
  }, []);

  return (
    <div className="sidebar-main">
      <div className="sb-header">
        <div>
          <IconButton onClick={addUser}>
            <AccountCircleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton onClick={() => nav("/app/users")}>
            <PersonAddAltIcon />
          </IconButton>

          <IconButton>
            <GroupAddIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="sb-search-chat">
        <div className="sb-search">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input type="text" placeholder="search" />
        </div>
        <div className="sb-chats">
          {chats.map((chat) => {
            return (
              <Conversation id={chat._id} userName={userid===chat.users[0]._id?chat.users[1].userName:chat.users[0].userName} receiverId={userid===chat.users[0]._id?chat.users[1]._id:chat.users[0]._id}/>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
