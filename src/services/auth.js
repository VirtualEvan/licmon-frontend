import client from '../core/client';

export function getCurrentUser() {
  return client.request('auth/user');
}
