import { Calendario } from "../modelo/calendario.js";
import Bd from "../utils/local.js";

export class GestorEvento {
  constructor() {
    this.eventos = [];
    this.dias = {};
    this.crearCalendario();
  }

  crearCalendario () {
    const mesActual = ( new Date().getMonth()+1);
    const anioActual = new Date().getFullYear();

    const horas = [
      {hora: '8:30', disponible: true},
      {hora: '9:30', disponible: true},
      {hora: '10:30', disponible: true},
      {hora: '11:30', disponible: true},
      {hora: '12:30', disponible: true},
      {hora: '13:30', disponible: true},
      {hora: '14:30', disponible: true},
      {hora: '15:30', disponible: true},
      {hora: '16:30', disponible: true},
      {hora: '17:30', disponible: true}
    ];

    for (let i = 0; i < new Date(anioActual, mesActual, 0).getDate(); i++) {
      this.dias[i+1] = JSON.parse(JSON.stringify(horas));
    }
  }

  async agregar({ clienteID, barberoID, diaAgendado, horario }) {
    try {
      const evento = new Calendario(clienteID, barberoID, diaAgendado, horario);
      const dias = await Bd.get('horas');

      if (dias === null) {
        return Bd.save('horas', JSON.stringify(this.dias));
      }

      const diaFounded = dias[parseInt(diaAgendado.split('-')[0])];
      const horaIndex = diaFounded.findIndex(hora => hora.hora === horario.split(' ')[0]);
      diaFounded[horaIndex].disponible = false;
  
            
      this.eventos.push(evento);
      Bd.save('horas', JSON.stringify(dias));
      Bd.save('eventos', JSON.stringify(this.eventos));
    } catch (error) {
      console.log(error);
    }
  }

  async getCalendario() {
    try {
      const horas = await Bd.get('horas');
      
      if (horas === null) {
        return this.dias;
      } else {
        return horas;
      }
    } catch (error) {
      console.log(error);
    }

  }
}