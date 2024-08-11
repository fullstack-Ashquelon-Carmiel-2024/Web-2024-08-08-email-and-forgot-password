const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getResetToken } = require('./encrypt');
const { getMailTemplateWithLink, mail } = require('./mail');

module.exports = {

    generateAccessToken: function(user) {

        return jwt.sign({
            name: user.name,
            role: user.role,
            img: user.img,
            sport: user.sport,
            email: user.email
        }, process.env.JWT_ACCESS_SECRET
        )
        
    },
    /* ,{
    expiresIn: '580s'
    } */

    generateRefreshToken: function(user) {

        return jwt.sign({
            name: user.name,
            role: user.role,
            img: user.img,
            sport: user.sport,
            email: user.email
        }, process.env.JWT_REFRESH_SECRET,{
            expiresIn: '1d'
        })

    },

    login: async (req,res) => {

        try {

            let email = req.body.email;
            let password = req.body.password;
            
            // populate the field "role" only with the field "userType" 
            //      from the appropriate "role" document
            let user = await User.findOne({email}).populate('role','userType').exec();
            
            if (!user) {
                return res.status(401).json({err: `Email ${email} not found`})
            }

            let match = await bcrypt.compare(password, user.password);

            if (!match)
                return res.status(401).json({err: `Invalid password ${password}`});

            let accessToken = module.exports.generateAccessToken(user);
            let refreshToken = module.exports.generateRefreshToken(user);

            // We don't keep accessToken at the backend,
            // But we keep refreshToken:

            const updatedUser = await User.findByIdAndUpdate(user.id, 
                {refreshToken},{ new:true })
                // new:true - return the user 

            // 900000 - 15min,9000000 - 2.5hours
            res.cookie('olympics', refreshToken, { maxAge: 9000000})
            res.status(201).json({auth:true,accessToken,msg: 'Congratulations! You\'ve logged in!'});

        } catch(err) {

            console.log(`err: \n${err.message}`)
            res.status(500).json({err: err.message})

        }

    },

    // middleware - to ensure that the user is authorized
    // next() - is a function that passes req and res
    // to the next middleware or to the endpoint function

    // the token should be in the header
    verify: (req,res,next) => {

        console.log(`REQUEST HEADER:\n`,req.headers);

        let authPart = req.headers.authorization || req.headers.Authorization;

        if (!authPart || !authPart.startsWith('Bearer ')) 
            return res.status(401).json({auth:false,
             msg: `You're not authorized`})

        // In the header the token is sent in the form:
        // Bearer aA85938Bc................

        let token = authPart.split(' ')[1];

        // jwt.verify returns the decoded payload
        jwt.verify(token,process.env.JWT_ACCESS_SECRET,(err,user) => {

            if (err) 
                return res.status(403).json({auth:false,
                            msg: `The token has been expired`,
                        err:err.message});

            // for some useful case, let's add the decoded payload to the request
            // for the sake of the next function

            req.user = user;
            next();
        })
    },

    forgotPassword: async function(req,res) {
        // 1. get email - check that the user exists
        // 2. create resetToken and put it into DB
        // 3. create email with link and send
        let email = req.body.email;
        
        const user = await User.findOne({email});
        // tbd: 
        // check that the user exists

        let resetToken = getResetToken();

        // tbd: we should store the resetToken in the DB 
        // -- or add it as a new field to the User schema
        // -- or create new model ResetToken

        let message = getMailTemplateWithLink('We have recieved your request to reset your password. Please reset your password using the link below',
        `${process.env.FRONTEND_URL}/auth/reset-password?id=${user.id}&token=${resetToken}`,
        'Reset Password');

        try {
            let result = mail(email, 'Reset Olympics Password Link',message);
            res.json({message: 'Reset password link email has been sent successfully'});
        } catch(err) {
            res.status(500).json({message:err.message});
        }

    },

    resetPassword: async function(req,res) {



    },

    logout: async function(req, res) {
 
        const refreshToken = req.body.token;

        // send err if there is no token or it is invalid
        if (!refreshToken) {
            
            res.json({auth: false, message: `LOGGED OUT`});
        
        } else {

            let tokenId = await tokens.getIdByToken(refreshToken);
            if (tokenId === 'ERR' || tokenId === 'NOT FOUND') {

                return res.json({auth: false, message: `LOGGED OUT`});    

            }

            tokens.deleteToken(tokenId);

            res.json({auth: false, message: `LOGGED OUT`});

        }

        // if everything is OK create access or refresh token and send it to user
    },

}