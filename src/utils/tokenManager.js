export const setToken = (token) => {
  localStorage.setItem('mamz-token', token);
};

export const getToken = () => {
  return localStorage.getItem('mamz-token');
};

export const removeToken = () => {
  localStorage.removeItem('mamz-token');
};
