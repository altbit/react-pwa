export const TOKEN_SESSION_KEY = 'authJwt';

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_SESSION_KEY);
};

export const setToken = (token) => {
  return sessionStorage.setItem(TOKEN_SESSION_KEY, token);
};
