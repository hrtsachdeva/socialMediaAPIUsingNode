exports.signupValidator = (req,res,next) =>{
    //name is not null and 4 to 150 char
    req.check('name', "Name is Empty!!").notEmpty();
    req.check('name',"Name should be between 4 to 150 characters").isLength({
        min:4 , 
        max:150
    });

    //for password
    req.check('password', "Password is Empty!!").notEmpty();
    req.check('password',"Password should be minimum 6 char")
    .matches(/\d/).withMessage("Password must contain digits!!")
    .isLength({
        min:6 
    });
    //for email
    req.check('email', "Email  is Empty!!").notEmpty();
    req.check('email',"Email is Invalid!!").matches(/.+\@.+\..+/)
    .withMessage("Email must contain @").isLength({
        min:4 , 
        max:200
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

exports.signinValidator = (req,res,next) => {

//for email
req.check('email', "Email  is Empty!!").notEmpty();
req.check('email',"Email is Invalid!!").matches(/.+\@.+\..+/)
.withMessage("Email must contain @").isLength({
    min:4 , 
    max:200
});
//for password
req.check('password', "Password is Empty!!").notEmpty();
req.check('password',"Password should be minimum 6 char")
.matches(/\d/).withMessage("Password must contain digits!!")
.isLength({
    min:6 
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