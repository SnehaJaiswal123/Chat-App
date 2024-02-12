import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

function Conversation(props) {

  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/app/chat/${props.id}`);
      }}
      className="conversation-main"
    >
      <div className="userpic">
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </div>
      <div>
        <div className="username">{props.userName}</div>
        <div className="lastmessage">{props.lastmsg}</div>
      </div>
    </div>
  );
}

export default Conversation;
