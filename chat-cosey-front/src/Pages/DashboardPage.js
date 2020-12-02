import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardPage = (props) => {
  const [chatrooms, setChatrooms] = React.useState([]);
  const [chatroomName, setChatroomName] = React.useState("");
  const [addChatError, setAddChatError] = React.useState("");
  const getChatrooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  const addNewChatroom = () => {
    axios
      .post(
        "http://localhost:8000/chatroom",
        { name: chatroomName },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("CC_Token"),
          },
        }
      )
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setAddChatError(err.response);
      });
  };

  React.useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="ChatterBox Nepal"
            onChange={(e) => setChatroomName(e.target.name)}
          />
        </div>
      </div>
      <button onClick={addNewChatroom(chatroomName)}>Create Chatroom</button>
      <div className="chatrooms">
        {chatrooms.map((chatroom) => (
          <div key={chatroom._id} className="chatroom">
            <div>{chatroom.name}</div>
            <Link to={"/chatroom/" + chatroom._id}>
              <div className="join">Join</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
