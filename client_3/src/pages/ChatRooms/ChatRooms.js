import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "../../services/socketService";

const ChatRooms = () => {
  const username = useSelector((state) => state.userReducer.username);
  const [allusers, setAllusers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newChatroom, setNewChatroom] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (username === "") {
      navigate("/");
      return;
    }

    socket.emit("users");
    socket.on("userlist", (userList) => {
      // console.log("userList")
      setAllusers(userList);
    });

    socket.emit("rooms");

    socket.on("rooms", function () {
      socket.emit("roomlist", Object.keys(rooms));
    });

    socket.on("roomlist", (roomList) => {
      setRooms(roomList);
    });

    return () => {
      socket.off("roomlist");
    };
  });

  const enterChatroom = (room, pass) => {
    socket.emit("joinroom", { room, pass }, (success, reason) => {
      if (success) {
        navigate(`/chat/${room}`);
      }
    });
    // navigate("/chatroom");
    // const password = prompt("Enter room password (if any):");
    // socket.emit("joinroom", {room: roomName}, (accepted, reason) => {
    // if (accepted) {
    //     console.log(`Entered room ${roomName}`);
    //     // Navigate to the chatroom page or update the UI as necessary
    // } else {
    //     console.log(`Failed to enter room ${roomName} due to ${reason}`);
    //     // Display an error message or update the UI as necessary
    // }
    // });
    // console.log(roomName)
    // socket.emit("joinroom", roomName);
    // socket.emit("joinroom", { room: roomName })

    // socket.emit("joinroom", username, (available) => {
    //     console.log('joinroom')
    // });
    // navigate(`/chatroom/${roomName}`);
  };

  const whoAmI = (username) => {
    console.log("whoAmI? ", username);
  };

  const createChatroom = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>Welcome to the Chat Room, {username}!</h1>
      <h2>Chat Rooms:</h2>
      <ul>
        {Object.keys(rooms).map((room) => (
          <button key={room} onClick={() => enterChatroom(room)}>
            {room}
          </button>
        ))}
      </ul>

      <button onClick={() => whoAmI(username)}>Who Am I?</button>
      <h3>Active users</h3>
      <ul>
        {allusers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <form onSubmit={createChatroom}>
        <label>
          Create chat room:
          <input
            type="text"
            value={newChatroom}
            onChange={(event) => setNewChatroom(event.target.value)}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ChatRooms;
