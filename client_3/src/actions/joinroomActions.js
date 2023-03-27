import * as constants from '../constants';


export const joinChatRoom = (roomname) => ({
    type: constants.ADD_USER,
    payload: roomname,
});