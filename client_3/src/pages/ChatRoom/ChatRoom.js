import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import io from "socket.io-client";
// const LoginPage = () => {
export function ChatRoom() {
    const username = useSelector((state) => state.userReducer.username);
    return (
        <div>
            <h1>Chat Room</h1>
            <p>{username}</p>
        </div>
    );
};

// export default LoginPage;