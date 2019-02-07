const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const listUsers = (req,res,next) => {
    User.find()
    .then(users => res.json({ users }))
}

const registerUser = (req,res,next) => {
    console.log(req.file)
    const { errors,isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({email: req.body.email})
    .then(user => {
        if(user){
            res.status(400).json({ email: "Email already exists" });
        }
        else{
            const avatar = gravatar.url(req.body.email,{
                s: '200', // Size
                r: 'pg', // Rating
                default: 'mm' // Default
            });
        
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: req.file ? req.file.path : avatar,
            });
            bcrypt.genSalt(10, (err,salt) => {
                bcrypt.hash(newUser.password,salt,(err,hash) => {
                    if(err){
                        throw err;
                    }
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            })
        }
    });

}

const loginUser = (req,res,next) => {
    const { errors,isValid } = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const { email,password } = req.body;
    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(404).json({email: "Email not found"});
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    id: user.id,
                    name: user.name
                };
                jwt.sign(
                    payload,
                    process.env.SECRET,
                    {
                      expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: "Bearer " + token
                      });
                    }
                );
            }
            else{
                return res.status(400).json({ password: "Password incorrect" });
            }
        })
    })
}

const currentUser = (req,res,next) => {
    User.findById(req.user.id)
    .then(user => {
        const { name,email,avatar,bio,date,posts } = user;
        res.json({
            name,
            email,
            avatar,
            bio,
            date,
            posts
        });
    })
}

module.exports = {
    listUsers,
    registerUser,
    loginUser,
    currentUser
}