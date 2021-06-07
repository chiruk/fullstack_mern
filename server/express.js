import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import compress from 'compression'
import cookieParser from 'cookieParser'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
const app = express()

// Add middle ware functions 

app.use(bodyParser.jsonParser())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

app.use('/', userRoutes)
app.use('/', authRoutes)

app.use((err, req, res, next) => {
    if(err.name === "Unauthorized Sign in Error"){
        res.status(401).json({
            errorMessage : "Could not be authorized correctly for some reason"
        })
    }
    
    next()
})

export default app;