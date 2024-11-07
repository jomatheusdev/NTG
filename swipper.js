// swiper.js

let currentIndex = 0;
const slides = document.querySelectorAll('.coverflow-slide');
const totalSlides = slides.length;

function updateCoverflow() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next');

        if (index === currentIndex) {
            slide.classList.add('active');
        } else if (index === currentIndex - 1 || (currentIndex === 0 && index === totalSlides - 1)) {
            slide.classList.add('prev');
        } else if (index === currentIndex + 1 || (currentIndex === totalSlides - 1 && index === 0)) {
            slide.classList.add('next');
        } else {
            // Para slides que não estão imediatamente adjacentes
            slide.style.display = 'none';
            setTimeout(() => {
                slide.style.display = 'flex';
            }, 500); // Tempo para coincidir com a transição
        }
    });
}

function prevSlide() {
    currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
    updateCoverflow();
}

function nextSlide() {
    currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
    updateCoverflow();
}

// Inicializar o Coverflow
document.addEventListener('DOMContentLoaded', () => {
    updateCoverflow();
});
