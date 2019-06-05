const User = require('../models/user');
const _ =require('lodash');

exports.userById = (req,res,next ,id) =>{
        if(!id){
            return res.status(400).json({
                "message":"No user id entered!!"
            });
        }
    User.findById(id).exec((err, user)=>{
            if(err||!user){
                return res.status(400).json({
                    "message":"User not found!!"
                });
            }
            req.profile = user;//adds profile object in req with user info
            next();
    });
}

exports.allUsers = (req,res) =>{
    User.find((err,user) =>{
        if(err) {
            return res.status(400).json({
                "message":err
            })
        }
        res.status(200).json({
            "users":user
        });
    }).select("name email updated created");
}

//get single user details
exports.getUser = (req,res)=>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.status(200).json({
        "user":req.profile
    });
}


//used lodash to update user

exports.updateUser =(req,res) =>{
    let user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.save((err)=>{
        return res.status(400).json({
            "message":err
        })
    })
    user.salt = undefined;
    user.hashed_password=undefined;
    res.status(200).json({
        "user":user
    })
}

//lodash is used to delete user

exports.deleteUser =(req,res,next) =>{
    let user = req.profile ;
    user.remove((err,user)=>{
        if(err){
            return res.status(400).json({
                "message":err
            })
        }
        user.hashed_password=undefined;
        user.salt=undefined;
        res.status(200).json({
            "user":user
        })
    });

}
exports.hasAuthorisation = (req,res,next) => {
    const  authorise  = (req.profile) && (req.auth) && (req.profile._id === req.auth._id);

    if(!authorise) {
        return res.status(403).json({
            "message":"Unauthorised User!!!"
        });
    }
    
}