const express = require('express')
const pool = require('../db/dbutils')
const result = require('../utils/result')

const router = express.Router();

router.get('/categories' , (req,res)=>{

    const sql = `SELECT * FROM categories`;

    pool.query(sql , (error,data)=>{

        if(data)
        {
            res.send(result.successResult(data));
        }
        else 
        {
            res.send(result.errorResult(error));
        }

    });

})

router.post('/add-category', (req,res)=>{

    const {title, description} = req.body;

    const sql = 'INSERT INTO categories(title,description) VALUES(?,?)';

    pool.query(sql, [title,description], (error,data)=>{

        if(data)
        {
            res.send(result.successResult("Category added successfully "));
        }
        else 
        {
            res.send(result.errorResult(data));
        }

    })

});

router.post('/add-blog', (req,res)=>{

    const {title,contents,user_id,category_id} = req.body ;

    const sql = `INSERT INTO blogs(title,contents,user_id,category_id) VALUES(?,?,?,?)`;


    pool.query(sql, [title,contents,user_id,category_id], (error,data)=>{

        if(data)
        {
            res.send(result.successResult("Blog added successfully"));
        }
        else 
        {
            res.send(result.errorResult(error));
        }

    })

});

router.get('/', (req,res)=>{

    const sql = `SELECT B.id,B.title,C.id as category_id ,C.title,U.id as user_id,U.fullname,B.created_time 
                FROM blogs B 
                inner join categories C ON 
                B.category_id = C.id 
                inner join user U ON  
                B.user_id = U.id  `;

    pool.query(sql, (error,data)=>{

        if(data)
        {
            res.send(result.successResult(data));
        }
        else 
        {
            res.send(result.errorResult(error));
        }

    })

})

router.get('/my-blogs', (req,res)=>{

    const userId = req.headers.id;

    console.log("User Id : ",userId);

    const sql = `
                    SELECT B.id,B.title,C.id as category_id ,C.title,U.id as user_id,U.fullname,B.created_time 
                    FROM blogs B 
                    inner join categories C ON 
                    B.category_id = C.id 
                    inner join user U ON  
                    B.user_id = U.id
                    WHERE B.user_id = ?`;

    pool.query(sql, [userId], (error,data)=>{

        if(data)
        {
            res.send(result.successResult(data));
        }
        else 
        {
            res.send(result.errorResult(error));
        }

    })

})

module.exports = router;