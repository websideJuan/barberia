import { Auth } from "../../utils/auth.js";
import isAutenticated from "../../utils/isAutenticated.js";

class Admin {
    constructor() {
        this.admin = document.createElement('div');
        this.admin.className = 'admin';
        this.admin.innerHTML = 'Admin';
        this.auth = new Auth();
        this.render();
        this.isAutenticated = isAutenticated;
    }

    render() {
      const btnlogout = document.querySelector('.nav-user-logout');

      setInterval(() => {

        const redirecDOM = async () => {
          await this.isAutenticated.isAuth();
        }

        redirecDOM();
      }, 100);
  
      btnlogout.addEventListener('click', async () => {
        this.auth.logout();
      });
    }
}

new Admin();