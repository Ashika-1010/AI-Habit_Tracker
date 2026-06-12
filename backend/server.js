import express from 'express'
import cors from 'cors'
import "dotenv/config"
import connectDB from './config/db.js'
import router from './routes/auth.js'
import habitRouter from './routes/habits.js' 
import aiRouter from './routes/ai.js'

import { notFound,errorHandler} from './middleware/errorHandler.js'
import logRouter from './routes/logs.js'

const app = express()

const allowedOrigins = (process.env.CLIENT_URL || "")
    .split(",")
    .map(s=>s.trim())
    .filter(Boolean)

app.use(cors({
    origin:allowedOrigins,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true
}))

// app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/api/health",(req,res)=>{
    res.json({status:"OK",time: new Date().toISOString()})
})

app.use("/api/auth",router)
app.use("/api/habits",habitRouter)
app.use("/api/logs",logRouter)
app.use("/api/ai",aiRouter)

app.use(notFound)
app.use(errorHandler)

const startServer = async () => {
    try{
        await connectDB()
        app.listen(process.env.PORT || 5000 , ()=>{
            console.log(`Server running on port ${process.env.PORT || 4000}`)
        })
    }
    catch(err){
        console.log("Server not started because database connection failed")
        process.exit(1)
    }
}

startServer()
export default app;