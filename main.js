document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const productCards = document.querySelectorAll('.product-card');

    // Função de busca
    function searchProducts(query) {
        productCards.forEach(card => {
            const productName = card.getAttribute('data-name').toLowerCase();
            if (productName.includes(query.toLowerCase())) {
                card.style.display = 'block';  // Exibe o produto
            } else {
                card.style.display = 'none';  // Oculta o produto
            }
        });
    }

    // Ao clicar no botão de busca
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        searchProducts(query);
    });

    // Opcional: Adicionar funcionalidade para pressionar Enter no campo de busca
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
});



// Header Scroll Effect



const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Typewriter Effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

const heroTitle = document.querySelector('.hero h1');
typeWriter(heroTitle, 'Explore o equilíbrio perfeito entre frescor e sofisticação');

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark/Light Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    document.body.classList.toggle('dark-theme', isDark);
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Set initial theme based on user's system preference
setTheme(prefersDarkScheme.matches);

themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark-theme'));
});

// Countdown Timer
function updateCountdown() {
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');
    
    let h = parseInt(hours.textContent);
    let m = parseInt(minutes.textContent);
    let s = parseInt(seconds.textContent);
    
    if (s > 0) {
        s--;
    } else {
        s = 59;
        if (m > 0) {
            m--;
        } else {
            m = 59;
            if (h > 0) {
                h--;
            } else {
                // Timer finished
                return;
            }
        }
    }
    
    hours.textContent = h.toString().padStart(2, '0');
    minutes.textContent = m.toString().padStart(2, '0');
    seconds.textContent = s.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);

// Form Validation and Animation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const isValid = Array.from(formData.values()).every(value => value.trim() !== '');
    
    if (isValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('.submit-btn');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        setTimeout(() => {
            showToast('Mensagem enviada com sucesso!', 'success');
            contactForm.reset();
            submitButton.textContent = 'Enviar Mensagem';
        }, 1500);
    } else {
        showToast('Por favor, preencha todos os campos.', 'error');
    }
});

// Toast Notification
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Add to Cart Animation
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const card = button.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        
        button.innerHTML = '<i class="fas fa-check"></i> Adicionado';
        button.style.backgroundColor = 'var(--emerald)';
        
        setTimeout(() => {
            button.textContent = 'Adicionar ao Carrinho';
            button.style.backgroundColor = '';
        }, 2000);
        
        showToast(`${productName} adicionado ao carrinho!`, 'success');
    });
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.feature-card, .testimonial, .promo-card').forEach(element => {
    observer.observe(element);
});

// Testimonials Carousel Auto-scroll
const testimonialCarousel = document.querySelector('.testimonials-carousel');
let scrollPosition = 0;
const scrollAmount = 400;

function autoScrollTestimonials() {
    scrollPosition += scrollAmount;
    if (scrollPosition >= testimonialCarousel.scrollWidth) {
        scrollPosition = 0;
    }
    testimonialCarousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

setInterval(autoScrollTestimonials, 5000);