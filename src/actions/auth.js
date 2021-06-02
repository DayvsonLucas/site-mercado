import axios from 'axios'

export const TOKEN_KEY = "portal-site-mercado";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => { localStorage.setItem(TOKEN_KEY, token); };
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};


export const authentication = async (user, password) => {
  try {
    const response = await axios.post(`https://dev.sitemercado.com.br/api/login`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }, {
      auth: {
        username: user,
        password: password
      }
    }
    );
    return response.data

  } catch (err) {
    return err.response.data
  }
}
