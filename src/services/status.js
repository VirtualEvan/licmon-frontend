import client from '../core/client';

export const getServers = () => client.request('api/servers');
export const getProduct = product => client.request(`api/product/${product}`);
export const requestRelease = (product, feature) =>
  client.request(`api/request-release/${product}/${feature}`, {
    method: 'POST',
  });
