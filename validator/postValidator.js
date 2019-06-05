exports.createPostValidator = (req,res,next)=>{
    req.check('title', "Title is Empty!!").notEmpty();
    req.check('title',"Title should be between 4 to 150 characters").isLength({
        min:4 , 
        max:150
    });


    req.check('body', "Body is Empty!!").notEmpty();
    req.check('body',"Body should be between 4 to 1500 characters").isLength({
        min:4 , 
        max:1500
    });


    //rest of the errors

    const errors = req.validationErrors();

    if(errors) {
        const firstError = errors.map((error)=>error.msg)[0];
        return res.json({
            "error": firstError
        });

        
    }

    next();
}