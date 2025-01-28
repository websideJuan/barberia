
export class Cliente {
  constructor(nombre, apellido, edad, diaAgendado, email,corteId) {
    this.ID = 0;
    this.cortes = 0;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.diaAgendado = diaAgendado;
    this.email = email;
    this.corteId = corteId;
    this.crearClienteID();
  }

  crearClienteID() {
    this.ID = Math.floor(Math.random() * 10000);
  }

  cantidadDeCortesRealizados() {
    return this.cortes;
  }
}
