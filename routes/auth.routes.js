const router = require('express').Router();
const authController = require('../controller/auth.controller');

//Register
router.post("/register",authController.register )

//get all data
router.get('/userdetails',authController.userDetails)

//signin
router.post('/login', authController.signIn);
 



module.exports = router

