import BD from "../utils/local.js";

export class Precios {
    constructor() {
      this.precios = [{ID: 1,corte: 5000}, {ID: 2,corte: 6000}, {ID: 3,corte: 7000}];
      this.init()
    }

    init() {
      BD.save('precios', JSON.stringify(this.precios));
    }

    agregarPrecio(precio) {
      this.precios.push(precio);
    }

    obtenerPrecio() {
      return this.precios;
    }
}