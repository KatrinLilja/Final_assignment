// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { socket } from "../../services/socketService";
// import { addUsername } from "../../actions/userActions";
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import AppBar from '@mui/material/AppBar';

// function emitAddUser(username) {
//     // const [username, setUsername] = useState("");
//     const [error, setError] = useState("");
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     socket.emit("adduser", username, (success) => {
//       if (success) {
//         console.log("username: ", username);
//         dispatch(addUsername(username));
//         navigate("/chat");
//       } else {
//         setError("The username is occupied!");
//         alert(error);
//       }
//     });
//   }

//   export default emitAddUser;






// socket.emit("joinroom", { room, pass }, (success, reason) => {
        // if (success) {
        //     navigate(`/chat/${room}`);
        // }
        // });
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