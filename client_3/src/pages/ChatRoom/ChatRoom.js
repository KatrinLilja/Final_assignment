import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socketService";
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
        event.preventDefault(); // prevent the form from reloading the page
        if (message.trim() !== "") { // check if the message is not empty
            socket.emit("sendmsg", {
            roomName: currentChatroom,
            msg: message
        });
        setMessage(""); // clear the input field
        }
    }



    function kickUser(user) {
        // user.preventDefault();
        // setKickUsername(user)
        console.log("setKickUsername: ",user);
        socket.emit("kick", { user, room }, function (result) {
            if (result) {
              console.log("User kicked successfully");
            } else {
              console.log("Failed to kick user");
            }
        });
        // setKickUsername("");
    }

    function banUser(user) {
        // event.preventDefault(); 
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
        // event.preventDefault(); 
        // console.log("kickUsername: ",op)
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

        socket.on("updatechat", (roomName, messageHistory) => {
        if (roomName === currentChatroom) {
            setMessages(messageHistory);
        }
        });
        //Ekki í notkun
        socket.emit("rooms");
        socket.on("rooms", function () {
            socket.emit("roomlist", Object.keys(usersInRoom));
        });
        socket.on("roomlist", (roomList) => {
            setUsersInRoom(roomList);


        });
        
        // for (const roomName in usersInRoom) {
        //     const room = usersInRoom[roomName];
        //     const users = Object.keys(room.users);
        //     console.log(`Users in room ${roomName}: ${users.join(", ")}`);
        // }
        ////////
    }, [currentChatroom, usersInRoom]);

    // console.log("usersInRoom: ", usersInRoom)

    
    
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
                                    {ops === username && ( //laga hér, user er username, á ekki að vera þannig
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

                {/* Kick, ban, op */}
                {/* <div className="gridItems">
                    {usersInRoom[room] && Object.keys(usersInRoom[room].ops).map((user) => (
                        <div>
                            {user === username && (
                                <div>
                                    <form onSubmit={kickUser}>
                                        <label>
                                        KICK:
                                        <input
                                            type="text"
                                            value={kickUsername}
                                            onChange={(event) => setKickUsername(event.target.value)}
                                        />
                                        </label>
                                        <button type="submit">KICK</button>
                                    </form>
                                    <form onSubmit={banUser}>
                                        <label>
                                            BAN:
                                            <input
                                            type="text"
                                            value={banUsername}
                                            onChange={(event) => setBanUsername(event.target.value)}
                                            />
                                        </label>
                                        <button type="submit">BAN</button>
                                    </form>
                                    <form onSubmit={giveOp}>
                                        <label>
                                            OP:
                                            <input
                                            type="text"
                                            value={banUsername}
                                            onChange={(event) => setOp(event.target.value)}
                                            />
                                        </label>
                                        <button type="submit">OP</button>
                                    </form>
                                </div>
                            )}

                        </div>
                    ))}
                    
                    
                </div> */}
            </div>
        </div>
    );
}
