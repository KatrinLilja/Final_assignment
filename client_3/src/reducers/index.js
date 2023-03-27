import { combineReducers } from 'redux';
import socket from './socketReducer';
import userReducer from './userReducer';
import chatroomReducer from './chatroomReducer';

export default combineReducers({
    socket,
    userReducer,
    chatroomReducer
});