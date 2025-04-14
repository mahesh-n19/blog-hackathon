const jwt = require('jsonwebtoken')
const secret = require('../utils/jwt');
const result = require('../utils/result')

function authMiddleWare(req,res,next)
{
    if(req.url == '/user/login' || req.url == '/user/register')
    {
        console.log("Middleware bypassed");
        next();
    }
    else 
    {
        const token = req.headers.token;

        if(token)
        {
                try
                {
                    const payload = jwt.verify(token,secret);

                    req.headers.id = payload.id;
    
                    next();
                }
                catch(e)
                {
                    res.send(result.errorResult("Invalid jwt token"));
                }
        }
        else 
        {
            res.send(result.errorResult("Token is missing"));
        }
    }


}

module.exports = authMiddleWare;