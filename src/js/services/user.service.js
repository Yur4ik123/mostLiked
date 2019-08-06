import Http from "../core/http.service";
import { ENV } from "../config/env";
export default class UserService {
  getUser(id) {
    const http = new Http();
    return new Promise((resolve, reject) => {
      http
        .get(`${ENV.apiUrl}/public/users/get-info/${id}`)
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }
  getUserImages(id) {
    const http = new Http();
    return new Promise((resolve, reject) => {
      http
        .get(`${ENV.apiUrl}/public/users/my-images/${id}`)
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
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
          if (!response.auth) return reject(response);
          localStorage.setItem("most_liked_user_id", response.id);
          localStorage.setItem("most_liked_user_token", response.token);
          resolve(response);
        })
        .catch(error => {
          console.error(error);
          alert(error.massage);
          reject(error);
        });
    });
  }
}
