import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socketService";
import { addUsername } from "../../actions/userActions";

// const LoginPage = () => {
export function LoginPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const checkUsername = (event) => {
  //     event.preventDefault();

  //     // Connect to the server using socket.io
  //     const socket = io("http://localhost:8080");

  //     // Check if the username is available
  //     socket.emit("adduser", username, (available) => {
  //     if (available) {
  //         // Set the username in the Redux store and navigate to the chat room
  //         console.log("username: ", username)
  //         dispatch(addUsername(username))
  //         // dispatch(addUsername(username));
  //         navigate("/chat");

  //     } else {
  //         alert("This username is already taken, please choose another one");
  //     }
  //     });
  // };

  function onSubmit() {
    setError("");
    socket.emit("adduser", username, (success) => {
      if (success) {
        // This could be another route, but in this example we are redirecting to a page where you will see all rooms
        console.log("username: ", username);
        dispatch(addUsername(username));
        // dispatch(addUsername(username));
        navigate("/chat");
      } else {
        setError("The username is occupied!");
        alert(error);
      }
    });
  }

  return (
    <div>
      <h1>Login Page</h1>

      <div className="container">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
      {/* <form onSubmit={checkUsername}>
            <label>
            Username:
            <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            </label>
            <button type="submit">Login</button>
        </form> */}
    </div>
  );
}

// export default LoginPage;
