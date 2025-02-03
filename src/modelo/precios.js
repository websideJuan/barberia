import BD from "../utils/local.js";

export class Precios {
  constructor() {
    this.precios = [
      {
        ID: 0,
        precio: 15000,
        title: 'Corte de pelo',
        descripcion: 'Corte de pelo para hombre',
        duracion: 40

      },
      { 
        ID: 1,
        precio: 25000,
        title: 'Corte de barba',
        descripcion: 'Corte de barba para hombre',
        duracion: 30
      },
      {
        ID: 2,
        precio: 45000,
        title: 'Corte de pelo y barba',
        descripcion: 'Corte de pelo y barba para hombre',
      },
      {
        ID: 3,
        precio: 35000,
        title: 'Corte de pelo',
        descripcion: 'Corte de pelo para mujer',
        duracion: 60 
      },
    ];
    this.init();
  }

  init() {
    BD.save("precios", JSON.stringify(this.precios));
  }

  agregarPrecio(precio) {
    this.precios.push(precio);
  }

  obtenerPrecio(idPrecio) {
    return this.precios.find((precio) => precio.ID === idPrecio);
  }
}
