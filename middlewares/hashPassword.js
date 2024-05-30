const bcrypt = require('bcrypt')

const hashedPassword = (password) => {
    return  bcrypt.hash(password, 8)
}


module.exports=hashedPassword