// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';

import ChatRooms from "./pages/ChatRooms/ChatRooms";
import { LoginPage } from "./pages/Login/Login";
import { ChatRoom } from './pages/ChatRoom/ChatRoom';
// import LoginPage from "./components/LoginPage";
// import ChatRooms from "./components/ChatRooms";

function App() {
  return (
    <Routes>
    <Route exact path="/" element={<LoginPage />} />
      <Route path="/chat" element={<ChatRooms />} />
      <Route path="/chatroom" element={<ChatRoom />} />
  </Routes>
  );
}

export default App;




// import { LoginPage } from './pages/Login/Login'
// // import { Switch, Route } from 'react-router-dom';
// import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

// function App() {
//   // <Routes>
//   //   <Route exact path="/" component={LoginPage} />
//   //   <Route exact path="/dashboard" component={DashboardView} />
//   // </Routes>

//   return (
//     <div className="App">
//       <h1>PLÍS VIRKA</h1>
//       <LoginPage/>
//     </div>
//   );
// }

// export default App;
