import ApiClient from './ApiClient';

import User from '../actions/User';

function apiFactory(
  {
    baseURL,
  },
) {
  const api = new ApiClient({ baseURL });

  return {
    user: new User({ apiClient: api }),
  };
}

export default apiFactory({
  baseURL: 'https://reqres.in/api/',
});
