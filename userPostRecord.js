const fs=require("fs");
const userPostRecord = JSON.parse(fs.readFileSync("userPostRecord.json"));

module.exports = {
    userPostRecord
}