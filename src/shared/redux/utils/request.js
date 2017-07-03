import qs from 'qs';
import { any, forEach, prop } from 'lodash/fp';

const { File } = global;
const forEachWithKey = forEach.convert({ cap: false });

const commonRequest = (method, url, data, options) => {
  let finalData;
  let headers = {
    'content-type': 'application/json',
    ...prop('headers')(options),
  };
  if (any(item => item instanceof File)(data)) {
    finalData = new FormData();
    forEachWithKey((value, key) => {
      finalData.append(key, value);
    })(data);
    headers = {};
  } else if (data) {
    finalData = JSON.stringify(data);
  }

  return {
    ...options,
    isAPI: true,
    method,
    headers,
    data: finalData,
    url,
  };
};

export const read = (url, query, options) =>
  commonRequest('GET', query ? `${url}?${qs.stringify(query)}` : url, null, options);

export const post = (url, data, options) =>
  commonRequest('POST', url, data, options);

export const put = (url, data, options) =>
  commonRequest('PUT', url, data, options);

export const patch = (url, data, options) =>
  commonRequest('PATCH', url, data, options);

export const del = (url, data, options) =>
  commonRequest(
    'DELETE',
    data ? `${url}?${qs.stringify(data)}` : url,
    null,
    options,
  );
