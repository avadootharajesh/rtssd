const bcrypt = require("bcrypt");

const hashData = async (data, saltRounds = 10) => {
    try {
        return await bcrypt.hash(data, saltRounds);
    } catch(error) {
        console.log(error);
        throw new Error("Failed to hash data");
    }
}

const verifyHashedData = async (data, hashedData) => {
    try {
        return await bcrypt.compare(data, hashedData);
    } catch(error) {
        console.log(error);
        throw new Error("Failed to verify hashed data");
    }
}

module.exports = { hashData, verifyHashedData }