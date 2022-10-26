const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db')
const { application } = require('express')

require('dotenv').config({
    path: './config/config.env'
})



connectDB()

 


const app = express()
app.use(bodyParser.json())

if(process.env.NODE_ENV === "development"){
    console.log(process.env.CLIENT_URL)
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus:200,
    }))

    app.use(morgan('dev'))
}


const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
app.use('/api/', authRouter);
app.use('/api', userRouter)

app.use((req, res, next)=>{
    res.status(404).json({
        success: false,
        message: "Not Found"
    })
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

