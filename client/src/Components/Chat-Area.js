import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Msgsent from "./sent-msg";
import Msgreceive from "./received-msg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function ChatArea() {
  const [messages, setMessages] = useState([]);
  const [typedMsg, setTypedMsg] = useState("");
  const [userid, setUserid] = useState("");
  const params = useParams();
  const scrollref = useRef();
  const chatId = params.id;

  const sendMsg = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/createMsg",
        {
          chatContent: typedMsg,
          chatId,
        },
        config
      );
      setMessages([...messages, { sender: userid, chatContent: typedMsg }]);
      setTypedMsg('')
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollref.current?.scrollIntoView()
  }, [messages]);

  useEffect(() => {
    const getAllMsg = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            authorization: token,
          },
        };
        const response = await axios.get(
          `http://localhost:5000/getAllMsg/${chatId}`,
          config
        );
        console.log("messages", response.data.message[0].messages);
        setMessages(response.data.message[0].messages);
        setUserid(response.data.userId);
      } catch (err) {
        console.log(err);
      }
    };
    getAllMsg();
  }, [params]);
  return (
    <div className="chat-area-main">
      <div className="chat-header">
        <div className="non-trash-chat-header">
          <div className="chat-profile">
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </div>
          <div className="user-detail">
            <p className="chat-username">Username</p>
            <p className="user-status">Online</p>
          </div>
        </div>
        <div className="chat-trash">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((m) => {
          return (
            <div ref={scrollref}>
              {m.sender === userid ? (
                <Msgsent content={m.chatContent} />
              ) : (
                <Msgreceive content={m.chatContent} />
              )}
            </div>
          );
        })}
      </div>
      <div className="chat-text">
        <input
          type="text"
          placeholder="Type.."
          value={typedMsg}
          onChange={(e) => setTypedMsg(e.target.value)}
        />
        <IconButton onClick={sendMsg}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}
export default ChatArea;
