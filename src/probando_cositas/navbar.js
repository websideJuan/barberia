import { Auth } from "../utils/auth.js";
export class NavbarItem {
  constructor(root) {
    this.root = root;
    this.links = [
      { name: "Inicio", href: "top" },
      { name: "Servicios", href: "servicios" },
      { name: "Nosotros", href: "nosotros" },
      { name: "Contacto", href: "contacto" },
      { name: "Testimonios", href: "testimonios" },
    ];
    this.renderUI = {
      trabajador: {
        title: 'Iniciar sesion como trabajador',
        form: `
          <form class="login__form login__form--trabajador">

            <div class="login__form-group">
              <label for="username">Username: *</label>
              <input type="text" id="username" name="username" required>
            </div>

            <div class="login__form-group">

              <label for="password">Password: *</label>
              <input type="password" id="password" name="password" required>
            </div>

            <button type="submit" class="login__form-btn">Iniciar sesion</button>
          </form>
        `
      },
      cliente: {
        title: 'Hora agendada.',
        form: `
          <form class="login__form login__form--cliente">
            <div class="login__form-group">
              <label for="IDevento"><h4>Ingresa tu EventID.</h4> <span>codigo resibido al agendar la cita.</span></label>
              <input type="text" id="IDevento" name="IDevento" required>
            </div>
            <button type="submit" class="login__form-btn">Bucar </button>
          </form>
        `,

      }
    }
    this.navButton = document.createElement("a");
    this.navLogo = document.createElement("h1");
    this.navLogo.classList.add("navbar__logo");
    this.navLogo.textContent = "Navbar";
    this.navbar = document.createElement("nav");
    this.navbar.classList.add("navbar");
    this.auth = new Auth();
  }

  createButton() {
    this.navButton.classList.add("navbar__button");
    this.navButton.innerHTML = '<i class="fa-solid fa-bars fa-xl"></i>';
    this.navButton.addEventListener("click", (e) => {
      e.preventDefault();
      const list = this.navbar.querySelector(".navbar__list");

      if (list.classList.contains("active")) {
        list.classList.remove("active");
        list.style.height = 0 + "px";
        this.navButton.innerHTML = '<i class="fa-solid fa-bars fa-xl"></i>';
        return;
      }

      list.classList.add("active");
      list.style.height = list.scrollHeight + "px";
      this.navButton.innerHTML = '<i class="fa-solid fa-x fa-xl"></i>';
    });

    return this.navButton;
  }

  render() {
    const btnReserva = document.createElement("a");
    btnReserva.classList.add("cta-reserva");
    btnReserva.textContent = "Reserva";
    this.navbar.appendChild(this.navLogo);
    this.navbar.appendChild(this.createButton());
    this.navbar.appendChild(this.createList());
    this.navbar.appendChild(btnReserva);
    const evento = document.createElement('a');
    evento.href = '#';
    evento.innerHTML = '<span>Login</span>';
    evento.classList.add('navbar__login');
    evento.addEventListener('click', (e) =>{e.preventDefault(), this.loginUI()})
    this.navbar.appendChild(evento);
    this.listenerEvent();
    return this.root.appendChild(this.navbar);
  }

  loginUI () {
    const login = document.createElement('div');

    
    login.classList.add('login');
    login.innerHTML = `
      <div class="login__content">
        <div class="login__header">
          <h2 class="login__title">Iniciar sesion</h2>
          <p>Ingresa tus datos para iniciar sesion</p>
          <div class="login__navbar">
            <a href="#" class="login__btn">Cliente</a>
            <a href="#" class="login__btn active">Trabajador</a>
          </div>
        </div>
        <div class="login__form-container">
        ${this.renderUI.cliente.form}
        </div>
      </div>
    `;
    document.body.appendChild(login);
    const loginBtns = document.querySelectorAll('.login__btn');
    const formContainer = document.querySelector('.login__form-container');
    const form = document.querySelector('.login__form');

    loginBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      loginBtns.forEach(btn => btn.classList.add('active'));

      e.target.classList.remove('active');
      const answer = e.target.textContent.toLowerCase();

      formContainer.innerHTML = this.renderUI[answer].form

      const form = document.querySelector(`.login__form.login__form--${answer}`);
      this.handlerForm(form);
    }))

    this.handlerForm(form);
  }

  handlerForm(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);

      if (e.target.classList.contains('login__form--cliente'))  {
        const evento = {
          id: data.get('IDevento')
        }
        
        return;
      }

      if (e.target.classList.contains('login__form--trabajador')) {
        const user = {
          username: data.get('username'),
          password: data.get('password')
        }

        const isLogin = await this.auth.login(user);
        
        console.log(isLogin);
        
        if (!isLogin) {
          alert('Usuario o contraseña incorrecta');
        } else {
          window.location.href = '/src/vista/admin/';
        }


        return;
      }
    })
  }

  listenerEvent() {
    document.addEventListener("DOMContentLoaded", () =>
      this.navbarIteraction()
    );
  }

  navbarIteraction() {
    const sections = document.querySelectorAll("main section");
    const navbar = document.querySelector(".container_navbar");
    const banner = document.querySelector(".banner-info");

    console.log(sections);

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const positionNavbar = (entries) =>
      entries.forEach((entry) =>
        entry.isIntersecting
          ? navbar.classList.remove("navbar--fixed")
          : navbar.classList.add("navbar--fixed")
      );
    const navbarObserver = new IntersectionObserver(positionNavbar, options);
    navbarObserver.observe(navbar);

    const showNavbarColor = (entries) =>
      entries.forEach((entry) =>
        entry.isIntersecting
          ? navbar.classList.remove("navbar--shadow")
          : navbar.classList.add("navbar--shadow")
      );
    const showNavbar = new IntersectionObserver(showNavbarColor, options);
    showNavbar.observe(banner);

    const showNavbarItem = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const links = document.querySelectorAll(".navbar__link");

        if (entry.isIntersecting) {
          links.forEach((link) => {
            if (link.href.includes(id)) {
              link.classList.add("activate");
            } else {
              link.classList.remove("activate");
            }
          });
        }
      });
    };

    options.rootMargin = "0px 0px -50% 0px";

    const sectionObserver = new IntersectionObserver(showNavbarItem, options);
    sections.forEach((section) => sectionObserver.observe(section));
  }

  createList() {
    const list = document.createElement("ul");
    list.classList.add("navbar__list");

    this.links.forEach((link) => {
      list.innerHTML += `<li class="navbar__item"><a class="navbar__link" href="#${link.href}" >${
        link.name
      }</a></li>`;
    });

    return list;
  }
}
