import DB from '../../utils/local.js';
import { NavbarItem } from '../../probando_cositas/navbar.js';

new NavbarItem(document.querySelector('.container_navbar')).render();

const cliente = DB.get('cliente');
const pago = DB.get('pagos');

const newCliente = cliente.map(clienteActual => ({
  ...clienteActual,
  ...pago
}))

newCliente.forEach(c => {
  document.querySelector('input[name="nombre"]').value = c.nombre;  
  document.querySelector('input[name="apellido"]').value = c.apellido;
  document.querySelector('input[name="monto"]').value = c.precioInical;

});

