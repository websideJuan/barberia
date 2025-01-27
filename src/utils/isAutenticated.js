import { Auth } from "./auth.js";

class IsAuthenticated {
  constructor() {
    this.auth = new Auth();
  }

  async isAuth() {
    const response = await this.auth.isAuthenticated();
    
    if (response === null) {
      window.location.href = '/';
      return;
    } 
    
  }
}


export default new IsAuthenticated();