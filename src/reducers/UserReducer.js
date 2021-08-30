import { proxy } from 'valtio'

const defaultState = {
  userTypes: '',
  loggedInUser: {},
};

export const userReducer = () => proxy({...defaultState});
