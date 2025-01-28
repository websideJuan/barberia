import { Auth } from "./auth.js";

class IsAuthenticated {
  constructor() {
    this.auth = new Auth();
  }

  async isAuth() {
    const response = await this.auth.isAuthenticated();
    
    if (!response) {
      window.location.href = '/barberia';
      return;
    } 
    
  }
}


export default new IsAuthenticated();