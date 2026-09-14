import './style.css';
document.addEventListener('DOMContentLoaded', () => {
    // EFECTO TYPEWRITER
    const textArray = [
        " Safety, Our Standard.", 
        " Trust, Our Commitment."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const el = document.querySelector('.dynamic-text');
    
    function typeEffect() {
        const currentWord = textArray[wordIndex];
        
        if (isDeleting) {
            el.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typingSpeed = isDeleting ? 30 : 70; 
        
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 3000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % textArray.length; 
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    if(el) {
        setTimeout(typeEffect, 1000);
    }

    // HERO BACKGROUND SLIDER
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    setInterval(nextSlide, 5000);

    // SLIDER DE SERVICIOS
    const track = document.getElementById('services-track');
    const btnPrev = document.getElementById('serv-prev');
    const btnNext = document.getElementById('serv-next');
    if (btnNext && track) {
        btnNext.addEventListener('click', () => track.scrollBy({ left: 320, behavior: 'smooth' }));
        btnPrev.addEventListener('click', () => track.scrollBy({ left: -320, behavior: 'smooth' }));
    }
    
    // SLIDER DE NUESTRO EQUIPO (MÓVIL)
    const teamTrack = document.getElementById('team-track');
    const teamPrev = document.getElementById('team-prev');
    const teamNext = document.getElementById('team-next');
    if (teamNext && teamTrack) {
        teamNext.addEventListener('click', () => teamTrack.scrollBy({ left: 320, behavior: 'smooth' }));
        teamPrev.addEventListener('click', () => teamTrack.scrollBy({ left: -320, behavior: 'smooth' }));
    }

    // SCROLL REVEAL
    const sr = ScrollReveal({ origin: 'bottom', distance: '50px', duration: 1000, delay: 200, reset: false });
    sr.reveal('.sr-bottom');
    sr.reveal('.sr-fade', { distance: '0px', opacity: 0 });
    sr.reveal('.sr-left', { origin: 'left' });
    sr.reveal('.sr-right', { origin: 'right' });

    // LÓGICA DEL MENÚ HAMBURGUESA
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // FLIP CARDS
    const flipButtonsFront = document.querySelectorAll('.front-flip');
    const flipButtonsBack = document.querySelectorAll('.back-flip');
    flipButtonsFront.forEach(btn => btn.addEventListener('click', (e) => e.target.closest('.service-card').classList.add('flipped')));
    flipButtonsBack.forEach(btn => btn.addEventListener('click', (e) => e.target.closest('.service-card').classList.remove('flipped')));

    // ACORDEÓN PARA "OUR PROCESS"
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            
            // Si ya está activo, no hacemos nada para que siempre haya uno abierto
            if (currentItem.classList.contains('active')) return;

            // Cerramos todos
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // Abrimos solo al que se le hizo clic
            currentItem.classList.add('active');
        });
    });

    // AUTO-POPULATE CONTACT FORM SERVICE ON "REQUEST" BUTTON CLICK
    const requestBtns = document.querySelectorAll('.btn-request');
    const serviceSelect = document.getElementById('service-needed');

    requestBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceType = btn.getAttribute('data-service');
            if (serviceType && serviceSelect) {
                serviceSelect.value = serviceType;
            }
        });
    });
});