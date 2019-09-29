import request from '@/services/Request';

export async function getHeaderMenus() {
  return request.get('catalog/list', null);
}
