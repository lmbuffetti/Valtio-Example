import Base from '../config/Base';

import ep from '../../endPoints.constant';

class Property extends Base {
  getToken(data) {
    const url = ep.user.getToken();
    return this.apiClient.post(url, {}, data);
  }

  getSingleUser(id) {
    const url = ep.user.singleUser(id);
    return this.apiClient.get(url);
  }
}

export default Property;
