const UserRegistration = require('../model/user');
const Joi = require('joi');
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";

const registrationSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  dob: Joi.date().iso().required(),
  password: Joi.string().min(8).required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});


class  authController {
 
    //Register
      register = async (req, res) => {
  try {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const savedUser = await UserRegistration.findOne({ email: req.body.email });
    if (savedUser) {
      return res.status(401).json({ error: "user already exist with that email" });
    }

    const newData = new UserRegistration(req.body);
    await newData.save();
    res.json({ message: "saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}
    //get all data
    userDetails=async(req,res) =>{
        try{
            const allData = await UserRegistration.find();
            return res.json(allData);  
           }
           catch(err){
            console.log(err.message);
           }
    }
    
    signIn = async (req, res) => {
      try {
        const { error } = signInSchema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
    
        const { email, password } = req.body;
        const user = await UserRegistration.findOne({ $or: [{ email }], password });
        if (!user) {
          return res.status(401).json({ message: 'user not found' });
        }
        
        res.json({ message: 'Sign in successful' });
      } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
      }
    }
    
  
      
}

module.exports = new authController();