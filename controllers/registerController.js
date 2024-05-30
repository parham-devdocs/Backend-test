const {Users}=require('../model/schemas')
const zod = require("zod");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/createJWT");
const hashPassword = require("../middlewares/hashPassword");
const schema = zod
  .object({
    username: zod.string().min(1, "username must be "),
    password: zod.string().min(8, "password must have at least 8 charecters"),
    repeat_password: zod.string().min(8),
    email: zod.string(),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const handleNewUser = async (req, res) => {
  const { username, password, email } = req.body;
  const validationResult = schema.safeParse(req.body);

  if (!validationResult.success) {
    res.status(422).send(validationResult.error);
    return;
  } else {
    const accessToken = generateAccessToken(username);
    const refreshToken = generateRefreshToken(username);
    const hashedPassword = await hashPassword(password);
    const newUser =new Users ({
      username,
      email,
      password: hashedPassword,
      accessToken,
      
      })
    newUser.save()
      .then(e => console.log(e)) 
      .catch(e => {
      res.status(501).send('something went wrong')
    })
      
            res.cookie("jwt", refreshToken, {
              httpOnly: true,
              maxAge: 24 * 60 * 60 * 1000,
            });

    
    res.status(201).send(newUser);
  }
};

module.exports = handleNewUser;
