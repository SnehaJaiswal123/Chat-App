import "./App.css";
// import './style.css'
import Login from "./Components/Login";
import Main from "./Components/Main";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Components/Welcome";
import Group from "./Components/Create-grp";
import ChatArea from "./Components/Chat-Area";
import { Users } from "./Components/Users";
import { Socket, io } from "socket.io-client";
import { useMemo, useState } from "react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<Main />}>
          <Route path="chat/:id" element={<ChatArea/>} />
          <Route path="" element={<Welcome />} />
          <Route path="users" element={<Users />} />
          <Route path="creategroup" element={<Group />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
