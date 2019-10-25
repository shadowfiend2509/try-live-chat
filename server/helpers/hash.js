const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync(10);

function hashPassword(password){
    return bcryptjs.hashSync(password,salt)
}

function comparePassword(password,hashPassword){
    return bcryptjs.compareSync(password,hashPassword);
}

module.exports ={
    hashPassword,
    comparePassword
}