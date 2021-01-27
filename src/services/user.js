import client from '../core/client';

export function getCurrentUser() {
  return client.request('http://localhost:5000/user');
}
