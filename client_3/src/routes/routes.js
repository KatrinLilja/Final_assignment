import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ChatRooms from "../pages/ChatRooms/ChatRooms";
import { LoginPage } from "../pages/Login/Login";
import { ChatRoom } from "../pages/ChatRoom/ChatRoom";

export default createBrowserRouter(
createRoutesFromElements(
    <>
    <Route path="/" element={<LoginPage />} />
    <Route path="/chat" element={<ChatRooms />} />
    <Route path="/chat/:room" element={<ChatRoom />} />
    </>
)
);
