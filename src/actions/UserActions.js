import { proxy, useSnapshot } from 'valtio';
import Cookies from 'universal-cookie';
import { rootReducer } from '../reducers/index';
import api from '../controllers/api/config';

const cookie = new Cookies();

const store = proxy(rootReducer());

export const getUser = (id = 2) => {
  api.user.getSingleUser(id)
    .then((usr) => {
      store.user.loggedInUser = usr.data;
    });
};

export const loggedInUser = (data) => {
  api.user.getToken(data)
    .then((res) => {
      getUser(2);
      cookie.set('token', res.data.token);
    });
};

export const getLoggedInUser = () => {
  const snapShot = useSnapshot(store);
  return snapShot.user.loggedInUser;
};
