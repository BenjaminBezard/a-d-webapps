import http from "../http-common";

class LoginService {
    login(username, password) {
      return http.post("http://localhost:6868/auth/signin", {
          username,
          password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });;
    }
  
  }
  
  export default new LoginService();