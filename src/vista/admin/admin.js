import { Auth } from "../../utils/auth.js";
import isAutenticated from "../../utils/isAutenticated.js";

class Admin {
  constructor() {
    this.auth = new Auth();
    this.isAutenticated = isAutenticated;
    this.render();
  }

  render() {
    const btnlogout = document.querySelector("#logout");
    const btnsDropDown = document.querySelectorAll("[data-dropdown='dropdown']");

    setInterval(() => {
      const redirecDOM = async () => {
        await this.isAutenticated.isAuth();
      };

      redirecDOM();
    }, 100);

    btnlogout.addEventListener("click", async () => {
      this.auth.logout();
    });

    btnsDropDown.forEach((btn, i) => {
      const menu = document.querySelectorAll(".dropdown");
      btn.addEventListener("click", () => {
        menu.forEach((item, j) => j !== i ? item.classList.remove("activate") : null);

        menu[i].classList.toggle("activate")
      });
    });

    this.listCortesRender();
    this.listClientesRender();
  }

  async listCortesRender() {
    const CONTENT_EVENT = document.querySelector(".agenda-eventos");
    const CANTIDAD_EVENT = document.querySelector(".agenda-eventos__cantidad");
    const userActive = await this.auth.getUserActive();

    CANTIDAD_EVENT.textContent = userActive.clientes.length;
    userActive.clientes.forEach((cliente) => {
    
      cliente.eventos.forEach((evento) => {
        
        CONTENT_EVENT.innerHTML += `
            <div class="agenda-eventos__item" >
              <div class="eventos__item--icon">
                ${
                  userActive.statePay === "pendiente"
                    ? '<i class="fas fa-exclamation-circle red"></i>'
                    : '<i class="fas fa-check-circle green"></i>'
                }
                <span class="eventos__item--icon--state" style="font-size: .7rem;">${
                  userActive.statePay
                }</span>
              </div>
              <p class="eventos__item--name">${cliente.nombre.split(" ")[0]}</p>
              <p class="eventos__item--lastname">${
                cliente.apellido.split(" ")[0]
              }</p>
              <p class="eventos__item--edad">${cliente.edad}</p>
              <p class="eventos__item--day">${evento.dia}</p>
              <p class="eventos__item--schedule">${evento.horario}</p>
            </div>
            `;
      });
    });
  }


  async listClientesRender() {
    document.querySelector('.table-client table tbody').innerHTML = '';
    const userActive = await this.auth.getUserActive();

    userActive.clientes.forEach(cliente => {
      document.querySelector('.table-client table tbody').innerHTML += `
        <tr>
          <td>${cliente.nombre}</td>
          <td>${cliente.apellido}</td>
          <td>${cliente.edad}</td>
          <td>${cliente.email}</td>
        </tr>
      `;
    });
  }
}

new Admin();
