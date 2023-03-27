import { createBrowserRouter, createRoutesFromElements, Route, Router } from 'react-router-dom';

import App from '../App';
import ChatRooms from '../pages/ChatRooms/ChatRooms';
import { LoginPage } from '../pages/Login/Login';
import { ChatRoom } from '../pages/ChatRoom/ChatRoom';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Router element={<App />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/chat" element={<ChatRooms/>}/>
            <Route path="/chatroom" element={<ChatRoom/>}/>
        </Router>
    )
);
