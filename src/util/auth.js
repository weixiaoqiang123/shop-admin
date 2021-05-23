const token = 'me'

export function getToken(){
  return JSON.parse(localStorage.getItem(token));
}

export function setToken(user){
  localStorage.setItem(token, JSON.stringify(user));
}

export function removeToken(){
  localStorage.removeItem(token);
}