const Post = require('../models/post');
//pkg to handle file handling for image upload
const formidable = require('formidable');
//node js built in pkg for file-system
const fs = require('fs');
const _ = require('lodash');

exports.postById =(req,res,next,id)=>{
    Post.findById(id)
    .populate("postedBy","_id name")
    .exec((err,post)=>{
        if(err||!post) {
            return res.status(400).json({
                "error":err
            })
        }

        req.post =post;
        next();
    });
}

exports.getPost = (req, res)=>{
    const posts = Post.find().populate("postedBy","_id name").select("_id title body").then((post) => {
        res.status(200).json({
            "posts":post
        });
    }).catch(err =>{
        res.json({
            "error":err
        })
    });
};

exports.createPost = (req,res,next) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions =true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                "message":"Error uploading image!!"
            });
        }
        let post =new Post(fields);
        req.profile.hashed_password=undefined;
        req.profile.salt=undefined;
        post.postedBy = req.profile;

        //file handling starts
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType =files.photo.type;
        }
        post.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    "message":err
                });
            }
            res.status(200).json({
                "post":result
            });
        });
    });
    
};

exports.postByUser = (req,res,next) =>{
    Post.find({postedBy:req.profile._id}).populate("postedBy","_id name")
    .sort("_created")
    .exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                "message":"error"
            })
        }
        res.json({
            "posts":posts
        })
    })
}

exports.isPoster = (req,res,next) =>{
    let isPoster =req.post && req.auth && req.post.postedBy == req.auth._id;
    if(!isPoster){
        return res.status(403).json({
            "message":"Not a authorised user!!"
        })
    }
    next();
}

exports.deletePost = (req,res)=>{
    let post =req.post;
    post.remove((err,post)=>{
        if(err){
            return res.status(400).json({
                "error":err
            });
        }
        res.json({
            "message":"Post delete Successful!!"
        })
    })
}

exports.updatePost =(req,res,next)=>{
    let post =req.post ;
    pst =_.extend(post,req.body);
    post.updated = Date.now();
    post.save(err =>{
        if(err){
        return res.status(400).json({
            "error":err
            })
        }
        res.json({
            "message":"Post Updated!!"
        })

    })
}