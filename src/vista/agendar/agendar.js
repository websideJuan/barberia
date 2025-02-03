import { Precios } from "../../modelo/precios.js";
import { Barbero } from "../../modelo/barbero.js";
import { GestorEvento } from "../../funcionalidad/gestorEvento.js";
import { GestorPeluqueria } from "../../funcionalidad/gestorPeluqueria.js";

class agendar {
  constructor() {
    this.clienteAgendado = {};
    this.clienteServicio = document.querySelector('.calendario__footer__header')
    this.calendario = document.querySelector(".calendario");
    this.days = ["Sab", "Dom", "Lun", "Mar", "Mie", "Jue", "Vie"]
    this.selectHorario = document.createElement("div");
    this.selectHorario.className = "horario";
    this.root = document.querySelector("#root");
    this.precios = new Precios();
    this.barbero = new Barbero("Juan", 30, 5, "Corte de pelo");
    this.init();
    this.DOMContentLoaded();
  }

  init() {
    let mesActual = new Date().getMonth() + 1;
    const dias = new Date(2025, mesActual, 0).getDate();
  
    
    // Crear calendario
    for (let i = 0; i < this.days.length; i++) {
      const diaComplete = document.createElement("div"); 
      for (let j = 0; j < dias; j++) {
        const p = document.createElement("p");
        if (i === j % 7) {
          const dia = j + 1;
          p.textContent = dia;
          p.setAttribute("data-dia", dia);
          diaComplete.appendChild(p);
        }
      }

      const p = document.createElement("p");
      p.classList.add('diaOfWeek');
      p.textContent = this.days[i];
      p.setAttribute("data-dia", this.days[i]);
      diaComplete.appendChild(p);
      diaComplete.className = "diasCalendario";

      this.calendario.appendChild(diaComplete);
    }

    // Agregar clase active al dia actual
    document.querySelectorAll('.calendario__panel__header--btn')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        if(btn.classList.contains('next')) {
          this.renderDaysDOM(7);
        }
        
        if (btn.classList.contains('prev')) {
          this.renderDaysDOM(-8);
        }

      })
    })

    
   
    // Evento para seleccionar el dia
    document.body
      .querySelector(".calendario")
      .addEventListener("click", async (e) => {
        if (e.target.parentElement.classList.contains("diasCalendario")) {
          document
            .querySelectorAll(".diasCalendario")
            .forEach((dia) => dia.classList.remove("active"));
          e.target.parentElement.classList.add("active");
          this.renderHoras(parseInt(e.target.textContent));
          
          // Seleccionar servicio
          this.selecServices(parseInt(e.target.textContent));
          this.updateClienteService(e.target.textContent)
        }
      });

  }

  DOMContentLoaded() {
    document.addEventListener("DOMContentLoaded", () => {
      // Renderizar dias
      this.renderDaysDOM()


      this.selecServices(new Date().getDate());
      

      const meses = ['enero', 'Febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
      document.querySelector('.pannel-calendario').innerHTML = `
        <p>${meses[new Date().getMonth()]}</p>
      `
      
    });
  }

  updateClienteService (dia) {
    const children = this.clienteServicio.children
    const atencion = JSON.parse(sessionStorage.getItem('atencion'))
    const childrenPdate = children[0].querySelector('p').children

    console.log(atencion);
    
    children[0].querySelector('h4').textContent = atencion.precio.descripcion
    children[0].querySelector('span').textContent = atencion.precio.precio
    childrenPdate[0].textContent = dia
  }

  renderDaysDOM(acc = 0) {
    acc = acc;

    this.calendario.childNodes.forEach((dia, i) => {
      
      dia.childNodes.forEach((p) => {
        
        if (parseInt(p.getAttribute("data-dia")) !== (i+1)+acc) {
          p.classList.add("notShow");
        }
  
        dia.childNodes.forEach((p) => {
          if (p.dataset.dia === this.days[i]) {
            p.classList.remove("notShow");
          }
        });
      });

    });
    
    document.querySelectorAll(".notShow").forEach((p) => p.remove());

    const dataDia = document.querySelectorAll(".diasCalendario p[data-dia]"); 
    return dataDia.forEach((dia, i) => {

      if (parseInt(dia.textContent) === new Date().getDate()){
        dia.parentElement.classList.add('active')
        this.renderHoras(parseInt(dia.textContent));

      }
    }); 
    
  }

  async renderHoras(dia = new Date().getDate()) {
    const horas = await new GestorEvento().getCalendario();
    const horasActual = horas[dia];

    this.selectHorario.innerHTML = `      
      ${horasActual
        .map(
          (hora, i) =>
            `
          <label name="diaAgendadoCliente${i}" class="horario__item ${hora.disponible ? "dia-active" : "dia-inactive"}" >
            <input type="checkbox"
              id="diaAgendadoCliente${i}"
              value="${hora.hora}"
            />
            <p>${
              hora.hora
            }</p>
          </label> `
        )
        .join("")}
    
    `;

    document.querySelector(".horas").appendChild(this.selectHorario);
    document.body
      .querySelectorAll(".horario__item")
      .forEach((horario) => {
        horario.addEventListener("change", () => {


          this.clienteAgendado = JSON.parse(sessionStorage.getItem('atencion'));

          
          this.clienteAgendado.barbero = this.barbero.nombre
          this.clienteAgendado.servicio = this.precios.obtenerPrecio(this.clienteAgendado.servicio),
          this.clienteAgendado.hora = horario.querySelector('p').textContent,
          this.clienteAgendado.dia = dia
          

          this.renderFormDOM(this.clienteAgendado);
        });
      });
  }

  renderFormDOM(cliente) {

    const bannerCliente = document.createElement('div')
    bannerCliente.innerHTML = `
      <div class="calendario__banner__nav">
      <p>${cliente.precio.descripcion}</p>
        <div class="calendario__banner__btn">
          <i class="fa-solid fa-angle-down"></i>
        </div>
      </div>
      <div class="canlendario__banner__header">
        <p>
          <i class="fa-solid fa-calendar"></i>
          ${cliente.dia} de enero de 2025
        </p>
        <p>
          <i class="fa-solid fa-clock"></i>
          ${cliente.hora < 12 ? `${cliente.hora} PM`  : `${cliente.hora} AM`}
        </p>
        <p>
          <i class="fa-solid fa-user"></i>
          ${cliente.barbero}
        </p>
      </div>
      <div class="calendario__banner__price">
        <span> <i class="fa-solid fa-dollar-sign"></i> ${cliente.servicio.precio.toString()}</span>
      </div>
        

    `;

    document.body.querySelector('.calendario__banner').innerHTML = bannerCliente.innerHTML

    document.querySelector('.calendario__container').innerHTML = `
      <div class="form__header">
        <h4>Datos de contacto</h4>
        <p>Por favor, ingrese sus datos de contacto para agendar su cita</p>
      </div>
      <form class="form">
        <div class="form-group">
          <label for="nombre">Nombre *</label>
          <input type="text" name="nombre" placeholder="" />
        </div>

        <div class="form-group">
          <label for="apellido">Apellido *</label>
          <input type="text" name="apellido" placeholder="" />
        </div>

        <div class="form-group">
          <label for="correo">Correo *</label>
          <input type="text" name="correo" placeholder="Email" />
        </div>

        <div class="form-group form-group--telefono">
          <label for="telefono">Teléfono *</label>
          <input type="text" name="telefono" placeholder="Teléfono" />
        </div>

        <div class="form-group">
          <label for="comentario">Comentario</label>
          <textarea name="comentario" placeholder="Comentario"></textarea>
        </div>
      </form>
    `;

    


    this.clienteServicio.children[0]
      .innerHTML = `
        <button class="form__footer__btn" type="submit">Agendar</button>
      `
    const form = document.querySelector('.form')
    form.addEventListener('submit', (e) => {
      e.preventDefault()
    })
    document.querySelector('.form__footer__btn').addEventListener('click', () => {
      
      new FormData(form).forEach((value, key) => {
        const input = form.querySelector(`[name=${key}]`)
        if (value.trim() === '') {
          input.style = 'border: 1px solid red'
          return
        }

        this.clienteAgendado[key] = value.trim()
      })
      
      const cliente = new GestorPeluqueria().agregar({
        nombre: this.clienteAgendado.nombre,
        apellido: this.clienteAgendado.apellido,
        edad: 19,
        diaAgendado: `${this.clienteAgendado.dia}/${this.clienteAgendado.hora} `,
        email: this.clienteAgendado.correo,
        corteId: this.clienteAgendado.servicio.id,
      });
      
      

    })
    
  }

  selecServices(dia) {
    
    const calendarioBtns = document.querySelectorAll('.cortePelo--btn')
    const calendarioServicios = document.querySelector('.calendario__servicios')
    const calendarioContainer = document.querySelector('.calendario__container')

    calendarioBtns.forEach((btn, i) =>
      btn.addEventListener('click', () => {
        this.clienteAgendado.servicio = i
        this.clienteAgendado.precio = this.precios.obtenerPrecio(i)

        sessionStorage.setItem('atencion', JSON.stringify(this.clienteAgendado));
        calendarioServicios.classList.add('inactive')
        calendarioContainer.classList.remove('inactive')
        this.clienteServicio.classList.remove('inactive')
        this.updateClienteService(dia)
      })
    )
  }
}

new agendar();
