
require('dotenv').config();

const express=require("express")
const cors = require('cors');
const app=express();
const connectdb=require('./db/db');

const registerRoutes=require('./routes/registerRoutes')
const loginRoutes=require('./routes/loginRoutes')
const enrollmentRoutes=require('./routes/enrollmentRoutes')
const courseRoutes=require('./routes/courseRoutes')
app.use(express.json());
app.use(cors());
connectdb();
app.use('/api',registerRoutes)
app.use('/api',loginRoutes)
app.use('/api',enrollmentRoutes)
app.use('/api',courseRoutes)

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log('server is running on port 3001')
})