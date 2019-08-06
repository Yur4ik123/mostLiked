import Http from "../core/http.service";
import { ENV } from "../config/env";
export default class AuthService {
  get userId() {
    return localStorage.getItem("most_liked_user_id");
  }
  get token() {
    return localStorage.getItem("most_liked_user_token");
  }
  async login(email, password) {
    try {
      const http = new Http();
      let response = await http.post(`${ENV.apiUrl}/public/auth/login`, {
        email,
        password
      });
      if (!response.auth) return new Error(response);
      localStorage.setItem("most_liked_user_id", response.id);
      localStorage.setItem("most_liked_user_token", response.token);
      return response;
    } catch (error) {
      console.error(error);
    }

    /* return new Promise((resolve, reject) => {
      http
        .post(`${ENV.apiUrl}/public/auth/login`, { email, password })
        .then(response => {
          if (!response.auth) return reject(response);
          localStorage.setItem("most_liked_user_id", response.id);
          localStorage.setItem("most_liked_user_token", response.token);
          resolve(response);
        }) */
    /*  .catch(error => {
          console.error(error);
          reject(error);
        }); */
  }
  logout() {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("most_liked_user_id");
      localStorage.removeItem("most_liked_user_token");
      resolve();
    });
  }

  registration(registrationData) {
    const http = new Http();
    return new Promise((resolve, reject) => {
      http
        .post(`${ENV.apiUrl}/public/auth/signup`, {
          registrationData
        })
        .then(response => {
          if (response.error) return reject(response);
          resolve(response);
        })
        .catch(error => {
          console.error(error);
          alert(error.message);
          reject(error);
        });
    });
  }
}
