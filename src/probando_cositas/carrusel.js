export class Carrusel {
  constructor(root) {
    this.root = root;
    this.carruselItem = this.root.querySelectorAll(".testimonio");
    this.createDot();
    this.nextItem();
  }

  createDot() {
    this.dots = document.createElement("div");
    this.dots.className = "dots";
    this.carruselItem.forEach((item) => {
      const dot = document.createElement("span");
      dot.className = "dot";
      this.dots.appendChild(dot);
    });
    this.root.appendChild(this.dots);
  }

  nextItem() {
    const carrusel = this.root.querySelector(".testimonios-body");
    const dot = this.root.querySelectorAll(".dot");
    let index = 1;
    setInterval(() => {
      if (index >= this.carruselItem.length) {
        index = 0;
        carrusel.style.transform = `translateX(0%)`;
      }

      dot.forEach((item) => item.classList.remove("active"));
      dot[index].classList.add("active");
      carrusel.style.transform = `translateX(-${
        document.querySelector(".testimonio").offsetWidth * index
      }px)`;
      index++;
    }, 3000);
  }
}
