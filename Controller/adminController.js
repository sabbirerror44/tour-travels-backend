const Admin = require('../Models/Admin');


const signup = async(req, res) => {
    try {
      
        const newAdmin = new Admin(req.body);
        await newAdmin.save();
        res.status(200).json({
            message: "Signup was successful!",
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        })
    }
}

const login = async(req, res) => {
    try{
        const admin = await Admin.find({username: req.body.username});
        if(admin && admin.length > 0){
           
            if(req.body.password === admin[0].password){
                res.status(200).json('true');
            }
            else {
                res.status(401).json({
                "error": "Authetication failed!"
                });
            }
        }
        else {
                res.status(401).json({
                "error": "Authetication failed!"
                });
            }
    }
    catch{
        res.status(401).json({
        "error": "Authetication failed!"
        });
        }
}

module.exports = {
    signup,
    login
}