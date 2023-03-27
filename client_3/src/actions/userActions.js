import * as constants from '../constants';

// export const addUser = adduser => ({
//     type: constants.ADD_USER,
//     payload: adduser 
// });
export const addUsername = (username) => ({
    type: constants.ADD_USER,
    payload: username,
});