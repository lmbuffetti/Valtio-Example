import axios from 'axios';
import queryString from 'query-string';
import httpAdapter from 'axios/lib/adapters/http';
import Cookies from 'universal-cookie';
import get from 'lodash/get';
import {
  failureHandler, successHandler,
} from '../utils/api.helper';

const cookies = new Cookies();

// Axios instance setUp
axios.defaults.adapter = httpAdapter;

// Add a request interceptor
axios.interceptors.request.use(
  (request) => request,
  (error) => Promise.reject(error),
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

class ApiClient {
  constructor({
    baseURL
  }) {
    this.baseURL = baseURL;
    this.token = cookies.get('token') || window.localStorage.getItem('token');
  }

  get(requestUrl, options = {}, params = {}, headers = {}, payload = {}) {
    const baseUrlType = options.baseUrlType ? options.baseUrlType : 'baseUrl';
    const type = options.type ? options.type : 'data';
    this.token = options.token || this.token || window.localStorage.getItem('token');
    return this.request({
      url: requestUrl,
      method: 'get',
      data: payload,
      params,
      headers,
      type,
      baseUrlType,
      options,
    });
  }

  put(requestUrl, options = {}, payload = {}, headers = {}) {
    const baseUrlType = options.baseUrlType ? options.baseUrlType : 'baseUrl';
    const type = options.type ? options.type : 'data';
    this.token = options.token || this.token || window.localStorage.getItem('token');
    return this.request({
      url: requestUrl,
      method: 'put',
      data: payload,
      headers,
      type,
      baseUrlType,
      options,
    });
  }

  post(requestUrl, options = {}, payload = {}, headers = {}) {
    const baseUrlType = options.baseUrlType ? options.baseUrlType : 'baseUrl';
    const type = options.type ? options.type : 'data';
    this.token = options.token || this.token || window.localStorage.getItem('token');
    return this.request({
      url: requestUrl,
      method: 'post',
      data: payload,
      headers,
      type,
      baseUrlType,
      options,
    });
  }

  patch(requestUrl, options, payload = {}, headers = {}) {
    return this.request({
      url: requestUrl,
      method: 'patch',
      data: payload,
      headers,
      options,
    });
  }

  delete(requestUrl, options = {}, payload = {}, headers = {}) {
    const baseUrlType = options.baseUrlType ? options.baseUrlType : 'baseUrl';
    const type = options.type ? options.type : 'data';
    this.token = options.token || this.token || window.localStorage.getItem('token');
    return this.request({
      url: requestUrl,
      method: 'delete',
      data: payload,
      headers,
      type,
      baseUrlType,
      options,
    });
  }

  request({
    url, options, method, params = {}, headers, data, type = 'data', baseUrlType = 'baseUrl',
  }) {
    let head;
    const id = get(options, 'id', null);
    if (type === 'login') {
      const auth = btoa(`${data.username}:${data.password}`);
      head = {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${auth}`,
        ...headers,
      };
    } else if (type === 'data') {
      head = {
        'token': this.token || '',
        ...headers,
      };
    } else if (headers['Content-Type']) {
      head = {
        ...headers,
      };
    } else {
      head = {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
      };
    }
    let baseUrl = this.baseURL;

    const config = {
      url,
      method,
      baseURL: baseUrl,
      params,
      validateStatus: false,
      paramsSerializer(p) {
        return queryString.stringify(p, {
          encode: true,
        });
      },
      headers: head,
      withCredentials: false,
      data,
    };
    return axios(config)
      .then((res) => successHandler(res, id))
      .catch(failureHandler);
  }
}

export default ApiClient;
