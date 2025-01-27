import { Cliente } from "../modelo/cliente.js";
import { Pagos } from "../modelo/pagos.js";
import { GestorEvento } from "./gestorEvento.js";
import { Calendario } from "../modelo/calendario.js";
import BD from "../utils/local.js";

export class GestorPeluqueria {
    constructor() {
      this.eventos = [];
      this.clientes = [];
      this.evento = new GestorEvento();
    }

    async agregar({ nombre, apellido, edad, diaAgendado, email, corteId }) {
      try {
        const [dia, horario] = diaAgendado.split('/');
        const cliente = new Cliente(nombre, apellido, edad, diaAgendado);
        const pago = new Pagos(cliente.ID, 0, new Date().toISOString().split('T')[0], corteId);
        const evento = new Calendario(cliente.ID, 0, dia, horario);
        this.evento.agregar({ clienteID: cliente.ID, barberoID: 0, dia, horario: horario });
      

        await this.agregarEvento(evento);
        await this.agregarCliente(cliente);
      

        BD.save('eventos', JSON.stringify(this.eventos));
        BD.save('clientes', JSON.stringify(this.clientes));
        BD.save('pagos', JSON.stringify(pago));

      } catch (error) {
        console.error(error);
      }
    }

    async agregarCliente(cliente) {
      this.clientes = await BD.get('clientes');
      this.clientes.push(cliente);
    }

    async agregarEvento(evento) {
      this.eventos = await BD.get('eventos');
      this.eventos.push(evento);
    }

    
}