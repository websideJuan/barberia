import BD from "../utils/local.js";

export class Pagos {
  constructor(clienteID, monto, fecha, corteId) {
    this.clienteID = clienteID;
    this.monto = monto;
    this.fecha = fecha;
    this.corteId = corteId;
    this.precioInical = 0;
    this.agregarPago();
  }

  async agregarPago() {
    try {
      const precios = await BD.get('precios');
      const preciosActual = precios.find((precio) => precio.ID === this.corteId);
      
      if (!preciosActual) {
        return false;
      }
  
      this.precioInical += (preciosActual.corte * 0.5);
      
    } catch (error) {
      console.log(error);
    }

   
  }
  
}