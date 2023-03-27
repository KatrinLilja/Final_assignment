import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function ChatRoom() {
  const username = useSelector((state) => state.userReducer.username);
  const { room } = useParams();
  return (
    <div>
      <h1>{room}</h1>
      <p>{username}</p>
    </div>
  );
}
