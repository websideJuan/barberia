import { Cliente } from "../modelo/cliente.js";
import { Pagos } from "../modelo/pagos.js";
import { GestorEvento } from "./gestorEvento.js";
import BD from "../utils/local.js";

export class GestorPeluqueria {
    constructor() {
      this.eventos = [];
      this.clientes = [];
      this.evento = new GestorEvento();
    }

    agregar({ nombre, apellido, edad, diaAgendado, email, corteId }) {
      const [dia, horario] = diaAgendado.split('/');
      const cliente = new Cliente(nombre, apellido, edad, diaAgendado);
      const pago = new Pagos(cliente.ID, 0, new Date().toISOString().split('T')[0], corteId);
      this.evento.agregar({ clienteID: cliente.ID, barberoID: 0, dia, horario: horario });
     
      if (edad < 18) {
        return false;
      }

      if (!nombre || !apellido || !edad || !diaAgendado) {
        return false;
      }
      
      
      this.clientes.push(cliente);
      BD.save('cliente', JSON.stringify(this.clientes));
      BD.save('pagos', JSON.stringify(pago));
      return cliente;
    }

    agregarEvento(evento) {
      this.eventos.push(evento);
    }

    
}