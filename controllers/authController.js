const bcrypt = require("bcrypt");
const {generateAccessToken,generateRefreshToken}=require('../middlewares/createJWT')
const {Users} = require("../model/schemas");
require("dotenv").config();


//db instance

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const foundUsername = await Users.find({ email });
  if (!foundUsername) {
    res.status(401).json({ message: "unauthorized access" });
  } else {
    const refreshToken = generateRefreshToken(email)
    const accessToken = generateAccessToken(email)
    
    bcrypt.compare(password, foundUsername[0].password).then(async (e) => {
      
      console.log(Users.findOneAndUpdate({ email }, { accessToken }));
      
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
      // res.status(201).send(User.find({ email }));
      
  
    })
    


  }
}
 
module.exports = handleLogin;
