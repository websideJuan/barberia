import { Auth } from "../../utils/auth.js";
import isAutenticated from "../../utils/isAutenticated.js";

class Admin {
    constructor() {
        this.admin = document.createElement('div');
        this.admin.className = 'admin';
        this.admin.innerHTML = 'Admin';
        this.auth = new Auth();
        this.render();
        this.isAutenticated = isAutenticated.isAuth();
    }

    render() {
      
    }
}

new Admin();