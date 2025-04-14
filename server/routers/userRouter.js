const express = require('express')
const pool = require('../db/dbutils')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const result = require('../utils/result')

const secret = require('../utils/jwt')

const router = express.Router();


router.post('/login', (req,res)=>{


    const {email,password} = req.body;

    const encryptedPass = cryptoJs.SHA256(password).toString();

    const sql = `SELECT id,fullname,email,phone_no,created_time FROM user WHERE email = ? and password = ?`;

    pool.query(sql, [email,encryptedPass], (error,data)=>{

        if(data)
        {
            console.log(data);

            if(data.length == 0)
            {
                console.log("User not found");
                res.send(result.errorResult("User not found"));
            }
            else 
            {

                const token = jwt.sign(data[0].id , secret);
                
                const obj = {
                                "token" : token,
                                "fullname" : data[0].fullname,
                                "email" : data[0].email,
                                "phone_no" : data[0].phone_no
                }
                
                res.send(result.successResult(obj));

            }

        }
        else 
        {
            res.send(result.errorResult(error));
        }

    })

});


router.post('/register', (req,res)=>{

    const {fullname,email,password,phone_no} = req.body;

    const encryptedPass = cryptoJs.SHA256(password).toString();

    const sql = `INSERT INTO user (fullname,email,password,phone_no) VALUES(?,?,?,?)`;

    pool.query(sql,[fullname,email,encryptedPass,phone_no] , (error,data)=>{


        if(data)
        {
            res.send(result.successResult("User registered successfully"));
        }
        else 
        {
            res.send(result.errorResult(error));
        }

    }) 

})

module.exports = router;