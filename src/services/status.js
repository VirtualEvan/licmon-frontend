import client from '../core/client';

export const getServers = () => client.request('http://localhost:5000/api/servers');
export const getProduct = product => client.request(`http://localhost:5000/api/product/${product}`);
