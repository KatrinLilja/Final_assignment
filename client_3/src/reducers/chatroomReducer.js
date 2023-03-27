// import { Socket } from 'socket.io';
import * as constants from '../constants';

const initialState = {
    roomname: "",
  };
  
  const chatroomReducer = (state = initialState, action) => {
    switch (action.type) {
      case constants.ADD_CHAT_ROOM:
        return {
          ...state,
          roomname: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default chatroomReducer;