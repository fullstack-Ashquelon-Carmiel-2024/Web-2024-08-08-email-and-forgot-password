const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            let user = await User.findOne({email});
            
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

            res.status(201).json({auth:true,accessToken,refreshToken,msg: 'Congratulations! You\'ve logged in!'});

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
    }

}