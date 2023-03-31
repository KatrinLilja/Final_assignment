import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socketService";
import { addUsername } from "../../actions/userActions";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import PropTypes from "prop-types";

import './styles.css';

export function LoginPage() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("The username is occupied!");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    function onSubmit() {
        setError("The username is occupied!");
        socket.emit("adduser", username, (success) => {
        if (success) {
            console.log("username: ", username);
            dispatch(addUsername(username));
            navigate("/chat");
        } else {
            
            alert(error);
        }
        });
        
    }

    return (
        <div className="center">
            <div className="navBar">
                <h1>Login Page</h1>
            </div>

            <Stack className="container">
                <label className="chooseName">Choose A Nickname!</label>
                <TextField
                type="text"
                value={username}
                variant="filled"
                className="userTextField"
                onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={onSubmit}>Submit</button>
            </Stack>
        </div>
    );
};

LoginPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  };
