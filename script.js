// JavaScript for Balaji & Krithika's Wedding Invitation
// This file handles all the interactive features of the website

document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    initializeNavigation();
    initializeScrollEffects();
    initializeBackToTop();
    initializeParallax();
    createBackgroundParticles();
    initialize3DTilt();
    initializeGalleryLightbox();
    initializeTouchSwipe();
    initializeScrollAnimations();
    
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('animate-in');
    }, 500);
});

// ========== COUNTDOWN TIMER ==========
function initializeCountdown() {
    const weddingDate = new Date('2026-06-25T09:00:00').getTime();
    
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = formatNumber(days);
        document.getElementById('hours').innerText = formatNumber(hours);
        document.getElementById('minutes').innerText = formatNumber(minutes);
        document.getElementById('seconds').innerText = formatNumber(seconds);
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<h2>The Wedding Day is Here! 🎉</h2>';
        }
    }, 1000);
}

function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

// ========== NAVIGATION MENU ==========
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// ========== SCROLL EFFECTS ==========
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    observeElements();
}

function observeElements() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.event-card, .timeline-item, .gallery-item').forEach(el => observer.observe(el));
}

// ========== BACK TO TOP BUTTON ==========
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        window.scrollTo({ top: section.offsetTop - navbarHeight, behavior: 'smooth' });
    }
}

// ========== ADD TO CALENDAR ==========
function addToCalendar() {
    const eventDetails = {
        title: 'Balaji & Krithika Wedding',
        details: 'We are getting married! Join us for our special day.',
        location: 'Sri Venkateswara Temple, Chennai',
        startDate: '2026-06-25T09:00:00',
        endDate: '2026-06-25T22:00:00'
    };
    window.open(createGoogleCalendarUrl(eventDetails), '_blank');
}

function createGoogleCalendarUrl(event) {
    const startDate = formatDateForCalendar(event.startDate);
    const endDate = formatDateForCalendar(event.endDate);
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const params = [
        `text=${encodeURIComponent(event.title)}`,
        `dates=${startDate}/${endDate}`,
        `details=${encodeURIComponent(event.details)}`,
        `location=${encodeURIComponent(event.location)}`,
        'sf=true', 'output=xml'
    ];
    return `${baseUrl}&${params.join('&')}`;
}

function formatDateForCalendar(dateString) {
    const d = new Date(dateString);
    return `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}${String(d.getSeconds()).padStart(2,'0')}`;
}

// ========== PARALLAX SCROLLING ==========
function initializeParallax() {
    const caricatureBride = document.querySelector('.caricature-bride');
    const caricatureGroom = document.querySelector('.caricature-groom');
    const mandala = document.querySelector('.mandala-decoration');
    const hearts = document.querySelectorAll('.heart');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (caricatureBride) caricatureBride.style.transform = `translateY(${rate * 0.8}px) rotate(${scrolled * 0.02}deg)`;
        if (caricatureGroom) caricatureGroom.style.transform = `translateY(${rate * 0.6}px) rotate(${-scrolled * 0.02}deg)`;
        if (mandala) mandala.style.transform = `rotate(${scrolled * 0.1}deg) scale(${1 + scrolled * 0.0002})`;
        hearts.forEach((heart, i) => { heart.style.transform = `translateY(${rate * (0.5 + i * 0.1)}px)`; });
    });
}

// ========== BACKGROUND PARTICLES ==========
function createBackgroundParticles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% { transform: translateY(100vh) translateX(0); opacity: 0; }
            10% { opacity: 0.4; }
            90% { opacity: 0.4; }
            100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'background-particle';
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.6), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
        `;
        document.body.appendChild(particle);
    }
}

// ========== 3D TILT EFFECT ==========
function initialize3DTilt() {
    document.querySelectorAll('.event-card, .countdown-item').forEach(card => {
        card.addEventListener('mouseenter', function() { this.style.transition = 'transform 0.1s'; });
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / 10, rotateY = (rect.width / 2 - x) / 10;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ========== GALLERY LIGHTBOX ==========
function initializeGalleryLightbox() {
    document.querySelectorAll('.gallery-item img, .polaroid-image img').forEach(item => {
        item.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:pointer;';
            lightbox.innerHTML = `<span style="position:absolute;top:20px;right:30px;color:white;font-size:40px;cursor:pointer;">&times;</span><img src="${this.src}" alt="${this.alt}" style="max-width:90%;max-height:90%;object-fit:contain;border-radius:10px;">`;
            document.body.appendChild(lightbox);
            lightbox.addEventListener('click', () => lightbox.remove());
            document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { lightbox.remove(); document.removeEventListener('keydown', esc); }});
        });
    });
}

// ========== TOUCH SWIPE ==========
function initializeTouchSwipe() {
    let touchStartX = 0, touchEndX = 0;
    const gallery = document.querySelector('.gallery-grid, .polaroid-gallery');
    if (gallery) {
        gallery.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
        gallery.addEventListener('touchend', e => { touchEndX = e.changedTouches[0].screenX; });
    }
}

// ========== SCROLL ANIMATIONS ==========
function initializeScrollAnimations() {
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('journey-event')) {
                    const bubble = entry.target.querySelector('.event-bubble');
                    if (bubble) {
                        setTimeout(() => {
                            bubble.style.transform = 'scale(1.1)';
                            setTimeout(() => { bubble.style.transform = 'scale(1)'; }, 300);
                        }, 200);
                    }
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    document.querySelectorAll('.journey-event, .milestone, .profile-card, .fact-card, .polaroid-item').forEach(el => scrollObserver.observe(el));
}

// ========== MUSIC PLAYER ==========
let isPlaying = false;

function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const musicBtn = document.querySelector('.music-btn');
    const musicText = document.querySelector('.music-text');
    
    if (!isPlaying) {
        audio.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
            musicText.textContent = 'Pause Music';
        }).catch(() => alert('Please add your wedding song MP3 file to play music'));
    } else {
        audio.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
        musicText.textContent = 'Play Music';
    }
}

// ========== MAP FUNCTION ==========
function openMap() {
    const venueLocation = 'Sri Venkateswara Temple, Chennai, Tamil Nadu';
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueLocation)}`, '_blank');
}

// ========== CONSOLE MESSAGE ==========
console.log('%c💍 Balaji & Krithika\'s Wedding 💍', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cMade with ❤️ for our special day!', 'color: #4A5D4E; font-size: 14px;');