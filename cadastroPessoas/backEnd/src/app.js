import express from 'express'
import cors from 'cors'
import userRouter from './route/userRoute.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRouter)

export{app}