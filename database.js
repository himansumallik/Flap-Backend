const fs=require("fs");
const users = JSON.parse(fs.readFileSync("users.json"));

module.exports = {
    users
}