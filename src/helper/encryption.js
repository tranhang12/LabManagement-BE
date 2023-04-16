const bcrypt = require('bcrypt');
const saltRounds = 10;

const encrypt = (plainPassword) => {
    var hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);
    return hashedPassword;
}

const compare = (enteredPassword, savedPassword) => {
    var result = bcrypt.compareSync(enteredPassword, savedPassword);
    return result;
}

module.exports = {
    encrypt,
    compare
};