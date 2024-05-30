const express = require('express')
const router = express.Router()
const newUserHandler = require('../../controllers/registerController')

router.post('/',newUserHandler)







module.exports=router