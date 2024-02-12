import axios from "axios";
const { useState, useEffect } = require("react");

export function Users() {
  const [users, setUsers] = useState([]);

  const createChat=async(userId)=>{
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: token,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/createChat",
        {
          userId:userId
        },
        config,
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            authorization: token,
          },
        };
        const response = await axios.get(
          "http://localhost:5000/fetchUsers",
          config,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setUsers(response.data.users)
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <div className="users-main">
        <input
          type="text"
          className="users-search"
          placeholder="Search Username"
        />
        {users.map((u) => (
          <div className="users-list" onClick={()=>createChat(u._id)}>{u.userName}</div>
        ))}
      </div>
    </>
  );
}
