import { config } from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../interfaces/error'

const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 5000
  let message = 'Something went wrong !'
  let errorMessage: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
