import http from "../http-common";

class TestDataService {
  getAll() {
    return http.get("/test/all");
  }

}

export default new TestDataService();