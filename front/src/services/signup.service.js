import http from "../http-common";

class SignupService {
  signup(username, email, password) {
    return http.post("http://localhost:6868/auth/signup", {
        username,
        email,
        password
    });
  }

}

export default new SignupService();