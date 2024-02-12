const express=require('express')
const router=express.Router();
const auth= require('../Middleware/auth')

const { signup, login, fetchUsers} = require('../Controller/user');

router.post('/signup',signup)
router.post('/login',login)
router.get('/fetchUsers',auth,fetchUsers)


module.exports=router