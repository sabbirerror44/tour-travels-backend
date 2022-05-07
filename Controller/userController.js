const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const signup = async(req, res)=> {

    try {
      const user = await User.find({ mobile: req.body.mobile });

      if (user.length > 0) {
        res.status(401).json({
          error: "Mobile number already in use!",
        });
      }
      else{
        let newUser;
        const hashedPassword = await bcrypt.hash(req.body.password, 11);
        newUser = new User({
            ...req.body,
            password: hashedPassword,
        });
    
            await newUser.save();
            res.status(200).json({
                message: "User was added successfully!",
              });
       }
       } catch (err) {
          res.status(500).json({
            errors: {
              common: {
                msg: "Unknown error occurred ! ",
              },
            },
          });
        }
        
    }

const login =  async (req, res) => {
  try {
    const user = await User.find({ mobile: req.body.mobile });
    if (user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
    
      if (isValidPassword) {

        const userObject = {
          name: user[0].name,
          email: user[0].email,
          mobile: user[0].mobile,
        };
        // generate token
        const token = jwt.sign(
          {
            email: user[0].email,
            name: user[0].name,
            mobile: user[0].mobile,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2 days",
          }
        );
        res.status(200).json({
          access_token: token,
          user: userObject,
          message: "Login successful",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed!. Please try again",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed!. Please try again",
      });
    }
  } catch (err) {
    res.status(401).json({
      error: "Authentication failed!. Please try again",
    });
  }
}
   
module.exports = {
    signup,
    login
}