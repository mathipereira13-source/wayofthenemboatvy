// Navegación móvil
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    // Toggle del menú hamburguesa
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
            
            // Animación de los iconos de la hamburguesa
            if (hamburger.children.length >= 3) {
                hamburger.children[0].classList.toggle('rotate-45');
                hamburger.children[1].classList.toggle('opacity-0');
                hamburger.children[2].classList.toggle('rotate--45');
            }
        });
    }

    // Cerrar el menú al hacer clic en un enlace
    if (links.length > 0) {
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks) navLinks.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('toggle');
                    if (hamburger.children.length >= 3) {
                        hamburger.children[0].classList.remove('rotate-45');
                        hamburger.children[1].classList.remove('opacity-0');
                        hamburger.children[2].classList.remove('rotate--45');
                    }
                }
            });
        });
    }

    // Efecto de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de cambio de fondo en el navbar al hacer scroll
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Animación de aparición de elementos al hacer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fadeInUp');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Inicializar animaciones
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    document.querySelectorAll('.fadeInUp').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Efecto de hover en las tarjetas de personajes
    const personajeCards = document.querySelectorAll('.personaje-card');
personajeCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 15;
        const angleY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Validación del formulario de contacto
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name === '' || email === '' || message === '') {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        
        // Aquí iría el código para enviar el formulario
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });
}

// Validación del formulario de newsletter
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value.trim();
        
        if (email === '') {
            alert('Por favor, ingresa tu correo electrónico.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        
        // Aquí iría el código para suscribir al usuario
        alert('¡Gracias por suscribirte! Pronto recibirás noticias sobre el juego.');
        newsletterForm.reset();
    });
}

// Función para validar el formato de correo electrónico
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Efecto de carga de imágenes perezoso (lazy loading)
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Efecto de máquina de escribir para el título principal
const typewriter = () => {
    const title = document.querySelector('.hero h1');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const speed = 100; // Velocidad de la animación en milisegundos
    
    const type = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Modal functionality
function showModal() {
    const modal = document.getElementById('comingSoonModal');
    const progressBar = document.getElementById('progressBar');
    const countdown = document.getElementById('countdown');
    
    console.log('Modal element:', modal);
    console.log('Progress bar:', progressBar);
    console.log('Countdown element:', countdown);
    
    if (!modal) {
        console.error('Modal element not found!');
        return;
    }
    
    // Reset modal state
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset progress bar and countdown
    if (progressBar) progressBar.style.width = '0%';
    if (countdown) countdown.textContent = '5';
    
    // Clear any existing interval
    if (window.modalInterval) {
        clearInterval(window.modalInterval);
    }
    
    // Animate progress bar and countdown
    let width = 0;
    let timeLeft = 5;
    
    window.modalInterval = setInterval(() => {
        if (width >= 100) {
            console.log('Auto-closing modal');
            closeModal();
            return;
        }
        
        width += 0.5;
        if (progressBar) progressBar.style.width = width + '%';
        
        // Update countdown every second
        if (Math.floor(width / 20) < timeLeft) {
            timeLeft = 5 - Math.floor(width / 20);
            if (countdown) countdown.textContent = timeLeft;
        }
    }, 25);
}

function closeModal() {
    const modal = document.getElementById('comingSoonModal');
    if (!modal) return;
    
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    if (window.modalInterval) {
        clearInterval(window.modalInterval);
        window.modalInterval = null;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinksList = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    const countdown = document.getElementById('countdown');
    let modalInterval = null;

    // Toggle mobile menu
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a nav link
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Initialize typewriter effect if the function exists
    if (typeof typewriter === 'function') {
        typewriter();
    }

    // Animate hero content
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5
    });
    
    gsap.from('.hero-image', {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.8
    });

    // Initialize modal functionality
    const initModal = () => {
        // Add click event to Jugar button
        const jugarBtn = document.getElementById('jugarAhoraBtn');
        if (jugarBtn) {
            // Remove any existing event listeners to prevent duplicates
            const newJugarBtn = jugarBtn.cloneNode(true);
            jugarBtn.parentNode.replaceChild(newJugarBtn, jugarBtn);
            
            newJugarBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Jugar button clicked');
                showModal();
            });
        }
        
        // Close modal when clicking the close button
        const closeBtn = document.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        // Close modal when clicking outside the modal content
        const modal = document.getElementById('comingSoonModal');
        if (modal) {
            // Remove any existing event listeners to prevent duplicates
            const newModal = modal.cloneNode(true);
            modal.parentNode.replaceChild(newModal, modal);
            
            newModal.addEventListener('click', (e) => {
                if (e.target === newModal) {
                    closeModal();
                }
            });
            
            // Close modal when pressing Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && newModal.style.display === 'block') {
                    closeModal();
                }
            });
        }
    };
    
    // Initialize modal
    initModal();
});
