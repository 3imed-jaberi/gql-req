import axios, { AxiosRequestConfig } from 'axios';
import { parse as parseUrl, format as formatUrl} from 'url';
import qs from 'querystring';

type Variables = { [key: string]: unknown }

function getUrlForGetReq(url: string, query: string, variables?: Variables) {
  const parsedUrl = parseUrl(url);
    
  return formatUrl({
    ...parsedUrl,
    search: qs.stringify({
      ...qs.parse(parsedUrl.search || ''),
      query,
      variables: JSON.stringify(variables),
    })
  });
}

function axiosService(config: AxiosRequestConfig) {
  return axios({
    url: config.url || '',
    method: config.method || 'POST',
    data: config.data || '',
    headers: config.headers || {}
  }).then(response => response.data);
};


export { getUrlForGetReq, axiosService };