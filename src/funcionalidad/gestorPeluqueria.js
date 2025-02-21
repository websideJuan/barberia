import { Cliente } from "../modelo/cliente.js";
import { Pagos } from "../modelo/pagos.js";
import { GestorEvento } from "./gestorEvento.js";
import { Calendario } from "../modelo/calendario.js";
import BD from "../utils/local.js";

export class GestorPeluqueria {
    constructor() {
      this.clientes = [];
      this.eventos = [];
      this.evento = new GestorEvento();
    }

    async agregar({ nombre, apellido, edad, diaAgendado, email, corteId }) {
      try {
        const [dia, horario] = diaAgendado.split('/');
        const cliente = new Cliente(nombre, apellido, edad, diaAgendado);
        const pago = new Pagos(cliente.ID, 0, new Date().toISOString().split('T')[0], corteId);
        new Calendario(cliente.ID, 0, dia, horario);

        this.evento.agregar({ clienteID: cliente.ID, barberoID: 0, dia: dia, horario: horario });
      

        this.clientes = await BD.get('clientes') || [];
        this.eventos = await BD.get('eventos')  || [];  
        
        const finded = this.clientes.findIndex(cliente => cliente.email === email);
        
        if (finded !== -1) {
          this.clientes[finded] = {
            ...this.clientes[finded],
            count: this.clientes[finded].count + 1,
          }
        }else {
          this.clientes.push({
            id: cliente.ID,
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            diaAgendado: diaAgendado,
            email,
          });
        }
    
        this.eventos.push({
          clienteID: cliente.ID,
          barberoID: 0,
          dia: dia,
          horario: horario,
          count: 1
        });

        BD.save('eventos', JSON.stringify(this.eventos));
        BD.save('clientes', JSON.stringify(this.clientes));
        BD.save('pagos', JSON.stringify(pago));

      } catch (error) {
        console.error(error);
    }}

   

    
}