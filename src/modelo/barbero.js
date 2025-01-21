import BD from "../utils/local.js";

export class Barbero {
  constructor(nombre, edad, experiencia, especialidad) {
    this.nombre = nombre;
    this.edad = edad;
    this.experiencia = experiencia;
    this.especialidad = especialidad;
    this.contratacion = new Date('2019', '01', '01').toISOString().split('T')[0];
    this.tipoContrato = 'plazo fijo';
    this.plazo = 0;
    this.contratos = [];
    this.notificaciones = [];
    this.numero = 33458288; 
    this.plazoContrato();
  }

  async plazoContrato() {
    try {
      const data = await BD.get('barbero');
      if (data.contratos.length > 2) {
        
        this.tipoContrato = 'Indefinido';
        this.plazo = 0;
        return;
      }
      this.plazo = 1;
    } catch (error) {
     console.log(error);
    } 
  }

  getContratos() {
    if (this.contratos.length === 0) {
      return 'No hay contratos';
    }
    return this.contratos;
  }

  setContratos(tipoContrato) {
    this.contratos.push({contrato: tipoContrato, plazo: this.plazo});
  }

  getNotificaciones() {
    if (this.notificaciones.length === 0) {
      return 'No hay notificaciones';
    }
    return this.notificaciones;
  }

  setNotificaciones(notificacion) {
    this.notificaciones.push(notificacion);
  }

}
