import { Auth } from "../../utils/auth.js";
import isAutenticated from "../../utils/isAutenticated.js";

class Admin {
    constructor() {
      this.auth = new Auth();
      this.isAutenticated = isAutenticated;
      this.render();
    }

    render() {
      const btnlogout = document.querySelector('#logout');
      const btnMenuUser = document.querySelector('.header-user-image')

      setInterval(() => {

        const redirecDOM = async () => {
          await this.isAutenticated.isAuth();
        }

        redirecDOM();
      }, 100);
  
      btnlogout.addEventListener('click', async () => {
        this.auth.logout();
      });

      btnMenuUser.addEventListener('click', (e) => {
        console.log(e.target.parentElement);
        
        const menu = document.querySelector('.dropdown');
        menu.classList.toggle('activate');
      })

      this.listCortesRender();
    }

    async listCortesRender() {
      const CONTENT_EVENT = document.querySelector('.agenda-eventos');
      const CANTIDAD_EVENT = document.querySelector('.agenda-eventos__cantidad');
      const evento = await this.auth.getUserActive()
      
      CANTIDAD_EVENT.textContent = evento.clientes.length;
      evento.clientes.forEach(cliente => {
        cliente.eventos.forEach(evento => {
          CONTENT_EVENT.innerHTML += `
            <div class="agenda-eventos__item" style="display: flex; align-items: center; justify-content: space-between;">
              <p>${cliente.nombre.split(' ')[0]}</p>
              <p>${cliente.apellido.split(' ')[0]}</p>
              <p>${cliente.edad}</p>
              <p>${evento.dia}</p>
              <p>${evento.horario}</p>
            </div>
            `
        })
      })

      // CONTENT_EVENT.innerHTML += `
      //   <div class="agenda-eventos__item">
      //     <h3>${evento.nombre}</h3>
      //     <p>${evento.edad}</p>
      //     <p>${evento.diaAgendado}</p>
      //     <p>${evento.horario}</p>
      //   </div>
      //   `



    }
}

new Admin();