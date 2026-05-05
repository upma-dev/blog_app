import { authAPI } from "../api/api.js";

export class AuthService {
  async createAccount({ email, password, name }) {
    return authAPI.register({ name, email, password });
  }

  async login({ email, password }) {
    return authAPI.login({ email, password });
  }

  async getCurrentUser() {
    return authAPI.getCurrentUser();
  }

  async logout() {
    return authAPI.logout();
  }
}

const authService = new AuthService();
export default authService;
