import { proxy, useSnapshot } from 'valtio';
import { rootReducer } from '../reducers/index';
import api from '../controllers/api/config';

const store = proxy(rootReducer());

export const loggedInUser = () => {
  const data = {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka",
  }
  api.user.getToken(data)
    .then((res) => {
      console.log(res);
      api.user.getSingleUser(2)
        .then((usr) => {
          console.log(usr);
          store.user.loggedInUser = usr.data;
        })
    })
}

export const getLoggedInUser = () => {
  const snapShot = useSnapshot(store)
  return snapShot.user.loggedInUser;
}
