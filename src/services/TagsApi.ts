import request from '@/services/Request';

export async function getTags(catalogId) {
  return request.get('tags/list/' + catalogId, null);
}

export async function getArticles(params) {
  return request.get('article/', params);
}

export async function getArticlesType(params) {
  return request.get('article/list', { type: params });
}

export async function getDetail(id) {
  return request.get('article/' + id, null);
}

export async function getProjects(params) {
  return request.get('project/', params);
}

export async function getProject(id) {
  return request.get('project/' + id, null);
}
