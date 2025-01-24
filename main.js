import { Precios } from "./src/modelo/precios.js";
import { Barbero } from "./src/modelo/barbero.js";
import { NavbarItem } from "./src/probando_cositas/navbar.js";
import { Carrusel } from "./src/probando_cositas/carrusel.js";

class Main {
  constructor() {
    this.root = document.querySelector('#root');
    this.precios = new Precios();
    this.barbero = new Barbero('Juan', 30, 5, 'Corte de pelo');
    this.navbar = new NavbarItem(document.querySelector('.container_navbar')).render();
    this.carrusel = new Carrusel(document.querySelector('#carrusel'));
  }

}

new Main();
