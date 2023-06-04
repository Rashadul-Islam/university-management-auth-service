import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../app/interfaces/error';

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidationError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
};

export default handleValidationError;
