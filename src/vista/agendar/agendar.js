import { GestorPeluqueria } from "../../funcionalidad/gestorPeluqueria.js";
import { Precios } from "../../modelo/precios.js";
import { Barbero } from "../../modelo/barbero.js";
import { GestorEvento } from "../../funcionalidad/gestorEvento.js";
import BD from "../../utils/local.js";

class agendar {
  constructor() {
    this.root = document.querySelector('#root');
    this.precios = new Precios();
    this.barbero = new Barbero('Juan', 30, 5, 'Corte de pelo');
    this.init();
  }

  init() {
    const dias = new Date(2025, 0, 0).getDate();
    const div = document.querySelector('.calendario');
    const form = document.querySelector('.form');
    const popUp = document.createElement('div');
    popUp.className = 'popUp';
    const selectHorario = document.createElement('div');
    selectHorario.className = 'horario';

    // Crear calendario
    for (let i = 0; i < dias; i++) {
      const p = document.createElement('p');
      const dia = i+1
      p.className = 'diasCalendario';

      if ((i+1) < (new Date().getDate()+1)) {
        p.classList.add('inActive');
      }

      p.textContent = dia;
      p.setAttribute('data-dia', dia);
      div.appendChild(p);
    }
    
    // Evento para seleccionar el dia
    document.body.querySelector('.calendario')
      .addEventListener('click', async (e) => {
        e.stopPropagation();
        if (e.target.tagName === 'P') {
          const dia = parseInt(e.target.getAttribute('data-dia'));
          const mes = new Date().getMonth()+1;
          const horas = await new GestorEvento().getCalendario();
          const horasActual = horas[dia]; 
          
          const calendario = document.querySelector('input[name="calendario"]')
        
          selectHorario.innerHTML = `
            <select name="horario" id="horario" class="horario_select">
              ${horasActual.map((hora) =>`<option class="${hora.disponible?"dia-active":"dia-inactive"}" value="${hora.hora}">${hora.hora} - ${hora.disponible ? 'Disponible':'Ocupada'}</option>`)}
            </select>
          `;

          document.body.appendChild(selectHorario);
          
          document.body.querySelector('select[name="horario"]')
            .addEventListener('change', (e) => {
              const hora = e.target.value;
              calendario.value = `${dia}-${mes}/${hora} ${hora < 12 ? 'AM' : 'PM'}`;
              selectHorario.remove();
              div.classList.add('inactive');
              form.classList.add('active');
            }
          );
        }
      }
    );
    

    // Evento para enviar el formulario
    this.root.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = e.target[0].value;
      const apellido = e.target[1].value;
      const edad = parseInt(e.target[2].value);
      const RUT = e.target[3].value;
      const diaAgendado = e.target[4].value;
      const email = e.target[5].value;
      const corteId = parseInt(e.target[6].value);

     
      const cliente = new GestorPeluqueria().agregar({ nombre, apellido, edad, diaAgendado, email, corteId });
      this.render(this.root, 'p', `Evento agregado con éxito.`);

      
      if (cliente) {
        this.render(this.root, 'p', `Cliente ${nombre} ${apellido} agregado con éxito.`);
      } else {
        this.render(this.root, 'p', `Error al agregar cliente.`);
      }


      popUp.innerHTML = `
        <div class="popUp-content">
          <p>
            <strong>Resumen de la cita:</strong>
            <br>
            <span>Dia agendado: ${diaAgendado}</span>
            <span>Horario: ${diaAgendado.split('/')[1]}</span>
            <span>Cliente: ${nombre} ${apellido}</span>
          </p>
          <div class="popUp-btns">
            <button class="cancelar">Cancelar</button>
            <button class="aceptar">Aceptar</button>
          </div>
        </div>
      `
      document.body.appendChild(popUp)

      // Evento para aceptar o cancelar la cita
      document.body.querySelector('.popUp')
        .addEventListener('click', (e) => {
          if (e.target.tagName === 'BUTTON') {
            if (e.target.className === 'cancelar') {
              popUp.remove();
              BD.clear();
              window.location.reload();
              return;
            }
            new GestorEvento().agregar({ clienteID:RUT, barberoID: 1, diaAgendado: diaAgendado.split('/')[0], horario: diaAgendado.split('/')[1]});
            popUp.remove();
            this.barbero.setNotificaciones(`Nuevo cliente agendado para el dia ${diaAgendado.split('/')[0]} a las ${diaAgendado.split('/')[1]}`);
            BD.save('barbero', JSON.stringify(this.barbero));

         
            // window.location.href = '../pagar/pagar.html';
          }
        }
      );
    });
  }

  render(container, tag, textContent) {
    const newTag = document.createElement(tag);

    if (textContent !== '') {
      newTag.textContent = textContent;
    }
    container.appendChild(newTag);

    setTimeout(() => {
      newTag.remove();
    }, 100);
  }
}

new agendar();
