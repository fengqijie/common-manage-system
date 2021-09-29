import { request } from "../index";

// get 请求
export function getInterface(params) {
  return request.get('/api/getInterface', { params });
}

// post 请求
export function postInterface(params) {
  return request.post('/api/postInterface', params);
}

