import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socketService";
import PropTypes from "prop-types";
import './styles.css';

export function ChatRoom() {
    const username = useSelector((state) => state.userReducer.username);
    const { room } = useParams();
    const [message, setMessage] = useState("");
    const [currentChatroom, setCurrentChatroom] = useState(room);
    const [messages, setMessages] = useState([]);
    const [banUsername, setBanUsername] = useState("");
    const [kickUsername, setKickUsername] = useState("");
    const [op, setOp] = useState("");
    const [usersInRoom, setUsersInRoom] = useState([]);
    const navigate = useNavigate();

    function sendMessage(event) {
        event.preventDefault(); 
        if (message.trim() !== "") { 
            socket.emit("sendmsg", {
            roomName: currentChatroom,
            msg: message
        });
        setMessage("");
        }
    }



    function kickUser(user) {
        console.log("setKickUsername: ",user);
        socket.emit("kick", { user, room }, function (result) {
            if (result) {
              console.log("User kicked successfully");
            } else {
              console.log("Failed to kick user");
            }
        });
    }

    function banUser(user) {
        console.log("kickUsername: ",banUsername)
        socket.emit("ban", { user: user, room }, function (result) {
            if (result) {
              console.log("User banned successfully");
            } else {
              console.log("Failed to ban user");
            }
        });
        setBanUsername("");
    }
    function giveOp(user) {
        socket.emit("op", { user: user, room }, function (result) {
            if (result) {
              console.log("User op successfully");
            } else {
              console.log("Failed to give user op");
            }
        });
        setBanUsername("");
    }

    const partRoom = (room) => {
        console.log("partRoom: ", room)
        socket.emit("partroom", room);
        navigate(`/chat`);
    };

    useEffect(() => {
        if (username === "") {
            navigate("/");
            return;
        }
        if (usersInRoom[room] && (!Object.keys(usersInRoom[room].ops).includes(username) || !Object.keys(usersInRoom[room].users).includes(username)) ) {
            // console.log(username)
            // alert("GO AWAYyyy????", {username}, " eitthvsð")

            // navigate("/chat")
        } else {
            // alert("NOOOO")
            // navigate("/chat")
        }
        if (usersInRoom[room] && Object.keys(usersInRoom[room].banned).includes(username) ) {
            // console.log(username)
            alert("You are banned from this room :(")
            navigate("/chat")
        }

        socket.on("updatechat", (roomName, messageHistory) => {
        if (roomName === currentChatroom) {
            setMessages(messageHistory);
        }
        });
        socket.emit("rooms");
        socket.on("rooms", function () {
            socket.emit("roomlist", Object.keys(usersInRoom));
        });

        socket.on("roomlist", (roomList) => {
            setUsersInRoom(roomList);
        });

        
    }, [currentChatroom, usersInRoom]);


    return (
        <div>
            <div className="navBar">
                <h1>{username}! You are in chat room "{room}" </h1>
            </div>

            <div className="gridRoom">
                {/* Users in this chat: */}
                <div className="gridItems">
                    <ul>
                        <h3>Ops in this chat:</h3>
                        {usersInRoom[room] && Object.keys(usersInRoom[room].ops).map((ops) => (
                                <li>{ops}</li>
                                ))}

                        <h3>Users in this chat:</h3>
                        {usersInRoom[room] && Object.keys(usersInRoom[room].users).map((user) => (
                            <div>
                                <li key={user}>{user}</li>
                                {usersInRoom[room] && Object.keys(usersInRoom[room].ops).map((ops) => (
                                <div>
                                    {ops === username && (
                                        <div>
                                        
                                            <button key={kickUsername} onClick={() => kickUser(user)}>Kick</button>
                                            <button key={banUsername} onClick={() => banUser(user)}>Ban</button>
                                            <button key={op} onClick={() => giveOp(user)}>Op</button>
                                        </div>
                                )}

                                </div>
                                ))}
                                
                            </div>
                        ))}
                    </ul>
                    <button key={room} onClick={() => partRoom(room)}>Leave room D:</button>
                </div>
                
                {/* Message */}
                <div className="gridItems">
                    <div>
                        {messages.map((message) => (
                            <div key={message.timestamp}>
                                <p><b>{message.nick}:</b> {message.message}</p>
                            </div>
                        ))}
                    </div>
                        <form onSubmit={sendMessage}>
                            <label>
                                Send message:
                                <input
                                type="text"
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                />
                            </label>
                            <button type="submit">Send</button>
                        </form>
                </div>
            </div>
        </div>
    );
};

ChatRoom.propTypes = {
    username: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
  };
