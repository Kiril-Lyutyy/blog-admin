import api from './config';

export const getPosts = ({
  page = 1,
  limit = 10,
  sort = 'created_at',
  order = 'desc',
} = {}) => {
  return api.get('/posts', { params: { page, limit, sort, order } });
};
export const getPostById = (id) => api.get(`/posts/${id}`);
export const createPost = (data) => api.post('/posts', data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);
