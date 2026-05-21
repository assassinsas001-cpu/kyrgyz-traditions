// ===== DOM Elements =====
const header = document.querySelector('.header');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const cultureItems = document.querySelectorAll('.culture-item');
const contactForm = document.getElementById('contactForm');
const traditionCards = document.querySelectorAll('.tradition-card');
const galleryItems = document.querySelectorAll('.gallery-item');

// ===== Header Scroll Effect =====
function handleScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// ===== Mobile Menu =====
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Culture Items Accordion =====
cultureItems.forEach(item => {
    item.addEventListener('click', () => {
        // Close other items
        cultureItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===== Contact Form =====
// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();
    
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const message = document.getElementById('message').value;
    
//     // Create and show modal
//     showModal('Рахмат!', `${name}, кабарыңыз жөнөтүлдү. Биз сиз менен жакында байланышабыз.`);
    
//     // Reset form
//     contactForm.reset();
// });

// ===== Modal Functions =====
function showModal(title, text) {
    // Create modal if it doesn't exist
    let modal = document.querySelector('.modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3 class="modal-title"></h3>
                <p class="modal-text"></p>
                <button class="modal-btn">Жабуу</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal events
        modal.querySelector('.modal-btn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    // Update content and show
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-text').textContent = text;
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ===== Tradition Cards Click =====
traditionCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.tradition-title').textContent;
        const desc = card.querySelector('.tradition-desc').textContent;
        showModal(title, desc);
    });
});

// ===== Gallery Lightbox =====
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('.gallery-overlay span').textContent;
        
        // Create lightbox
        let lightbox = document.querySelector('.lightbox');
        
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox modal';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="" alt="">
                    <p class="lightbox-title"></p>
                </div>
            `;
            lightbox.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            `;
            
            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                text-align: center;
            `;
            
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 80vh;
                border-radius: 8px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            `;
            
            const lightboxTitle = lightbox.querySelector('.lightbox-title');
            lightboxTitle.style.cssText = `
                color: white;
                font-size: 1.25rem;
                margin-top: 1rem;
            `;
            
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });
        }
        
        lightbox.querySelector('img').src = imgSrc;
        lightbox.querySelector('.lightbox-title').textContent = title;
        
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
    });
});

// ===== Scroll Animation =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.tradition-card, .stat-item, .culture-item, .gallery-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-on-scroll', 'visible');
        }
    });
}

// Add animation class to elements
document.querySelectorAll('.tradition-card, .stat-item, .culture-item, .gallery-item').forEach(el => {
    el.classList.add('animate-on-scroll');
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Close modal on Escape
    if (e.key === 'Escape') {
        closeModal();
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) lightbox.classList.remove('active');
    }
});

// ===== Console Welcome =====
console.log('%c Кыргыз салттары ', 'background: #8B4513; color: white; font-size: 20px; padding: 10px;');
console.log('Сайтка кош келиңиз! Welcome to the site!');
