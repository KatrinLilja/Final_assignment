import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "../../services/socketService";
import './styles.css';

const ChatRooms = () => {
    const username = useSelector((state) => state.userReducer.username);
    const [allusers, setAllusers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [newChatroom, setNewChatroom] = useState("");
    const [privateMsg, setPrivateMsg] = useState("");
    const [userPrivate, setUserPrivate] = useState("");
    // const [activePrivateChat, setActivePrivateChat] = useState(null);


    const navigate = useNavigate();


    const [updated, setUpdated] = useState('');
    const [password, setPassword] = useState(undefined);
    const handleClick = () => {
        // setUpdated(updated);
        socket.emit("joinroom", { room: updated, pass: password }, (success, reason) => {
            if (rooms[updated]) {
                console.log("herbergi er til!")
                navigate(`/chat/${updated}`);
            } else {
                console.log("herbergi er ekki til!")
                navigate(`/chat/${updated}`);
            }
        // if (success) {
        //     navigate(`/chat/${updated}`);
        // }
        });
        console.log(updated)
    };

    useEffect(() => {
        if (username === "") {
        navigate("/");
        return;
        }
        
        socket.emit("users");
        socket.on("userlist", (userList) => {
            // console.log("userList: ", userList)
            setAllusers(userList);
        });

        socket.emit("rooms");

        socket.on("rooms", function () {
        socket.emit("roomlist", Object.keys(rooms));
        });

        socket.on("roomlist", (roomList) => {
        setRooms(roomList);
        });

        socket.on("recv_privatemsg", (from, message) => {
            console.log("Private message received from", from, ":", message);
            setUserPrivate(from);
            setPrivateMsg(message);
        });

        return () => {
        socket.off("roomlist");
        socket.off("recv_privatemsg");
        };

        
    });

    const enterChatroom = (room, pass) => {
        console.log("enterChatroom: ", room)
        socket.emit("joinroom", { room, pass }, (success, reason) => {
        if (success) {
            navigate(`/chat/${room}`);
        } else {
            const password = window.prompt('Please enter password:');
            socket.emit("joinroom", { room, pass: password }, (success, reason) => {
                if (success) {
                    navigate(`/chat/${room}`);
                } else {
                    alert(`Wrong password!`);
                }
                });
        }
        });
    };

    const privateMessage = (user) => {
        console.log("privateMessage: ", user);
        setUserPrivate(user)
        socket.emit("privatemsg", {nick: user, message: "HÆÆÆ!:)"}, function (success) {
            if (success) {
                setUserPrivate(user)
                console.log(username)
                console.log(userPrivate)
                console.log(privateMsg)
            } else {
                alert(`Failed to send private message to ${user}.`);
            }
            // handle acknowledgement from the server, if any
          });
    };

    return (
        <div>
            {/* Navbar */}
            <div className="navBar">
                <h1>Welcome to the Chat Room, {username}!</h1>
            </div>

            <div className="grid">
                {/* Active users */}
                <div className="gridItems">
                    <h1>Active users</h1>
                    <p>private message:</p>
                    <input
                        type="text"
                        id="message"
                        name="message"
                        onChange={(event) => setPrivateMsg(event.target.value)}
                        value={privateMsg}
                    />
                    <ul>
                        {allusers.map((user) => (
                            <div>
                                <p key={user}>{user}</p>
                                
                                <button  onClick={() => privateMessage(user)}>Private message</button>
                            </div>
                        ))}
                    </ul>
                </div>

                {/* Chat rooms */}
                <div className="gridItems">
                    <h1>Chat Rooms:</h1>
                    <ul>
                        {Object.keys(rooms).map((room) => (
                        <button key={room} onClick={() => enterChatroom(room)}>
                            {room}
                        </button>
                        ))}
                    </ul>
                </div>

                {/* Create Chat room */}
                <div className="gridItems">
                    <h1>Create chat room:</h1>
                    <label>
                        Chat room name:
                        <input
                            type="text"
                            id="message"
                            name="message"
                            onChange={(event) => setUpdated(event.target.value)}
                            value={updated}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="text"
                            id="message"
                            name="message"
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                        />
                    </label>
                    <button onClick={handleClick}>Update</button>
                </div>
                <div className="gridItems">
                    <h1>private</h1>
                    {userPrivate === username && ( 
                        <div>
                            <h4>{userPrivate}: {privateMsg}</h4>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatRooms;
