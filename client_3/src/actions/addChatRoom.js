import * as constants from '../constants';

export const addChatRoom = (roomname) => ({
    type: constants.ADD_CHAT_ROOM,
    payload: roomname,
});