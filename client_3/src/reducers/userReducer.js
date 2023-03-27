// import { Socket } from 'socket.io';
import * as constants from '../constants';

const initialState = {
    username: "",
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case constants.ADD_USER:
        return {
          ...state,
          username: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;





// import { Socket } from 'socket.io';
// import * as constants from '../constants';


// const initialState = {
//     username: "",
//     joinedRooms: [],
//     errorMessage: null,
// };

// const userReducer = (state = {}, action) => {
//     switch (action.type) {
//         case constants.ADD_USER:
//             return {
//                 ...state,
//                 username: action.payload,
//             }
//             // Socket.emit('adduser', action.username, (available) => {
//             //     if (available) {
//             //         return { ...state, username: action.username };
//             //     }
//             //     else {
//             //         console.log('Username is not available.')
//             //     }
//             // });
//             // break;
//         default: return state;
//     }
// }

// import * as constants from '../constants';

// export default function userReducer(state = {}, action) {
//     switch (action.type) {
//         case constants.ADD_USER:
//             // const { sessionID } = action.payload;
//             // localStorage.setItem('s.id', sessionID);
//             // return action.payload;
//             console.log("action.payload: ", action.payload)
//             return {
//                 ...state,
//                 username: action.payload,
//             }
//         default: return state;
//     }
// }