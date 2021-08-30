import { userReducer } from './UserReducer';

export const rootReducer = () => ({
  user: userReducer(),
});
