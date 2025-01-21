export class NavbarItem {
  constructor(root) {
    this.root = root;
    this.links = [
      { name: "Inicio", href: "/" },
      { name: "Servicios", href: "/about" },
      { name: "Nosotros", href: "/contact" },
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
      console.log(list.classList.contains("active"));

      if (list.classList.contains("active")) {
        list.classList.remove("active");
        list.style.height = 0 + "px";
        return;
      }

      list.classList.add("active");
      list.style.height = list.scrollHeight + "px";
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
    this.transformPosition();
    return this.root.appendChild(this.navbar);
  }

  transformPosition() {
    const heightNavbar = document.body.children;
    const navbar = heightNavbar[0];

    window.addEventListener("scroll", () => {
      if (navbar.getBoundingClientRect().bottom * -1 < window.innerHeight / 4) {
        navbar.classList.remove("navbar--fixed");
      } else {
        navbar.classList.add("navbar--fixed");
      }
    });
  }

  createList() {
    const list = document.createElement("ul");
    list.classList.add("navbar__list");
    const href = window.location.href.split("/").pop();

    this.links.forEach((link) => {
      list.innerHTML += `<li class="navbar__item"><a class="navbar__link ${
        href === link.href ? "activate" : ""
      }" href="${link.href}">${link.name}</a></li>`;
    });

    return list;
  }

  setLinks(textContent, href) {
    this.navbar.innerHTML = "";
    this.links.push({ name: textContent, href });
    this.render(this.root);
  }

  getLinks() {
    return this.links;
  }
}
