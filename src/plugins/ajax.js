import fetch from '@/plugins/fetch';
export function getData(data) {
  let params = {
    url: '/info/alltickers',
    method: 'GET',
    params: data
  }
  return fetch(params);
};
