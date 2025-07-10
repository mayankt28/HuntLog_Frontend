import API from './index'

export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const requestPasswordReset = (data) => API.post('/auth/forgot-password', data);
export const resetPassword = (token, data) => API.post(`/auth/reset-password/${token}`, data);
export const logoutUser = () => API.post('/auth/logout');

