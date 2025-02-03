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
    const btnMenu = document.querySelector(".header-user-submenu-icon");

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


    btnMenu.addEventListener("click", () => {
      btnMenu.classList.toggle("active");
      btnMenu.innerHTML = btnMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      this.showMenu();
    });

    this.listCortesRender();
    this.listClientesRender();
    this.rednderStadistics();
  }

  rednderStadistics () {
    const chartContex = document.querySelector('#myChart')

    const colors = ['#FF6633', '#00B3E6', '#E6B333', '#3366E6', '#999966']

    const stadistics = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
      datasets: [{
        label: 'Cortes de pelo',
        data: [65, 59, 80, 81, 56] ,
        backgroundColor: colors[0]
      }, {
        label: 'Cortes de barba',
        data: [28, 48, 40, 19, 86],
        backgroundColor: colors[1]
      }, {
        label: 'Corte de cabello y barba',
        data: [15, 34, 54, 10, 67],
        backgroundColor: colors[2]
      }, {
        label: 'Afeitado',
        data: [10, 12, 34, 9, 45],
        backgroundColor: colors[3]
      }, {
        label: 'Corte de cabello y barba',
        data: [20, 34, 64, 89, 34],
        backgroundColor: colors[4]
      }]
    }

    const ctx = chartContex.getContext('2d');

    stadistics.datasets.forEach((dataset, i) => {
      ctx.fillStyle = dataset.backgroundColor
      
      dataset.data.forEach((data, j) => {
        ctx.fillRect((j * 45),145 - dataset.data[j], 30, dataset.data[j])

      })
    })



    chartContex.addEventListener('contextrestored', (e) => {
      console.log(e)
    })
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
              </div>
              <p class="eventos__item--name">${cliente.nombre}</p>
              <p class="eventos__item--lastname">${
                cliente.apellido
              }</p>
              <p class="eventos__item--edad">${cliente.edad}</p>
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

  showMenu() {
    const menu = document.querySelector(".main-admin");
    menu.classList.toggle("active");
  }
}

new Admin();
