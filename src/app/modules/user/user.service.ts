import config from '../../../config/index';
import APiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';
import httpStatus from 'http-status';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUserId();
  payload.id = id;

  // default password
  if (!payload.password) {
    payload.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(payload);

  if (!createUser) {
    throw new APiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
