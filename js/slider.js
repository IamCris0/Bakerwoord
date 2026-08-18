// Motor del Slider de Héroe para Creatividad Láser
class HeroSlider {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.slide-item');
    this.prevBtn = this.container.querySelector('.slider-arrow.prev');
    this.nextBtn = this.container.querySelector('.slider-arrow.next');
    this.dotsContainer = this.container.querySelector('.slider-dots');

    this.currentIndex = 0;
    this.timer = null;
    this.intervalMs = 5000;

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    // Generar dots dinámicos
    if (this.dotsContainer) {
      this.dotsContainer.innerHTML = '';
      this.slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => this.goToSlide(index));
        this.dotsContainer.appendChild(dot);
      });
    }

    // Event listeners para botones prev/next
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Pausar al pasar el mouse por encima
    this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container.addEventListener('mouseleave', () => this.startAutoPlay());

    // Iniciar autoplay
    this.startAutoPlay();
  }

  goToSlide(index) {
    this.slides[this.currentIndex].classList.remove('active');
    
    // Actualizar dots
    const dots = this.dotsContainer ? this.dotsContainer.querySelectorAll('.dot') : [];
    if (dots[this.currentIndex]) dots[this.currentIndex].classList.remove('active');

    this.currentIndex = index;

    this.slides[this.currentIndex].classList.add('active');
    if (dots[this.currentIndex]) dots[this.currentIndex].classList.add('active');
  }

  nextSlide() {
    let nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    let prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.timer = setInterval(() => this.nextSlide(), this.intervalMs);
  }

  stopAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

// Exportar / Inicializar globalmente cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
  window.heroSlider = new HeroSlider('heroSlider');
});
