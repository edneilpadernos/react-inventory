const bcrypt = require('bcrypt');
const e = require('express');
const saltRounds = 10

const encrypt = (password) =>{
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash
}

const decrypt = async (password,passwordHash) =>{
    const match = await bcrypt.compare(password, passwordHash)
    return match
}

module.exports = {
    encrypt,
    decrypt
}