const express = require('express')
const pool = require('../db/dbutils')
const result = require('../utils/result')

const router = express.Router();

router.get('/' , (req,res)=>{

    res.send(result.successResult("API Hitt ..."))

})

module.exports = router;