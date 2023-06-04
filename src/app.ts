import express, { Application } from 'express'
import cors from 'cors'
import userRoute from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

//using cors
app.use(cors())

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application route
app.use('/api/v1/users', userRoute)

//call global error handler
app.use(globalErrorHandler)

export default app
