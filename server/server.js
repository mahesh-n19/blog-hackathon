const express = require('express')
const cors = require('cors')
const userRouter = require('./routers/userRouter')
const blogRouter = require('./routers/blogRouter')
const authMiddleWare = require('./middleware/authMiddleware')

const app = express();

app.use(express.json());
app.use(cors());

app.use(authMiddleWare);
app.use('/user', userRouter)
app.use('/blog',blogRouter)

app.listen(4000,'localhost',()=>{

    console.log("Server stated at port 4000");

})