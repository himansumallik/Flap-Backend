const database = require("./database");
const users = database.users;
const isEmailValid = (email) => {
    return users.some(user => user.email === email);   
}

const getUserWithEmail = (email) => {
    const selectedUser = users.find(user => user.email === email);
    return selectedUser;
}

module.exports = {
    isEmailValid,
    getUserWithEmail
}