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
    this.navButton = document.createElement("a");
    this.navLogo = document.createElement("h1");
    this.navLogo.classList.add("navbar__logo");
    this.navLogo.textContent = "Navbar";
    this.navbar = document.createElement("nav");
    this.navbar.classList.add("navbar");
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
    this.listenerEvent();
    return this.root.appendChild(this.navbar);
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
      list.innerHTML += `<li class="navbar__item"><a class="navbar__link" href="#${link.href.trim()}" >${
        link.name
      }</a></li>`;
    });

    return list;
  }
}
