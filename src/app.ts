import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'

const app: Application = express()

//using cors
app.use(cors())

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application route
app.use('/api/v1/users', UserRoutes)

//call global error handler
app.use(globalErrorHandler)

export default app
