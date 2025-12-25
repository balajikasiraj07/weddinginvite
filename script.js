// JavaScript for Balaji & Krithika's Wedding Invitation
// This file handles all the interactive features of the website

// Wait for the DOM to fully load before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions when page loads
    initializeCountdown();
    initializeNavigation();
    initializeScrollEffects();
    initializeBackToTop();
    initializeParallax();
    createBackgroundParticles();
    initialize3DTilt();
    initializeGalleryLightbox();
    initializeTouchSwipe();
    
    // Add entrance animation to hero content
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('animate-in');
    }, 500);
});

// ========== COUNTDOWN TIMER ==========
function initializeCountdown() {
    // Set the wedding date (change this to your actual wedding date)
    // Format: Year, Month (0-11), Day, Hour, Minute, Second
    const weddingDate = new Date('2025-05-15T09:00:00').getTime();
    
    // Update countdown every second
    const countdownInterval = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Calculate the time difference
        const distance = weddingDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the countdown values
        // Add leading zeros for single digits
        document.getElementById('days').innerText = formatNumber(days);
        document.getElementById('hours').innerText = formatNumber(hours);
        document.getElementById('minutes').innerText = formatNumber(minutes);
        document.getElementById('seconds').innerText = formatNumber(seconds);
        
        // If countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<h2>The Wedding Day is Here! 🎉</h2>';
        }
    }, 1000); // Run every 1000 milliseconds (1 second)
}

// Helper function to add leading zero to single digit numbers
function formatNumber(num) {
    return num < 10 ? '0' + num : num;
}

// ========== NAVIGATION MENU ==========
function initializeNavigation() {
    // Get hamburger menu and nav menu elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu when hamburger is clicked
    hamburger.addEventListener('click', function() {
        // Toggle 'active' class for animation
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove 'active' class to close menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll navigation for all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            
            // Get the target section from href attribute
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Scroll to target section with offset for navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== SCROLL EFFECTS ==========
function initializeScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow to navbar on scroll
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        // Optional: Hide/show navbar on scroll (uncomment if needed)
        /*
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
        */
    });
    
    // Animate elements when they come into view
    observeElements();
}

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
function observeElements() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Offset from bottom
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element is visible
                entry.target.classList.add('animate-in');
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToObserve = document.querySelectorAll('.event-card, .timeline-item, .gallery-item');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// ========== BACK TO TOP BUTTON ==========
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
}

// Function to scroll to top (called from HTML onclick)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to scroll to a specific section (called from HTML onclick)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ========== ADD TO CALENDAR FUNCTION ==========
function addToCalendar() {
    // Wedding details for calendar event
    const eventDetails = {
        title: 'Balaji & Krithika Wedding',
        details: 'We are getting married! Join us for our special day.',
        location: 'Sri Venkateswara Temple, Chennai',
        // Set your actual wedding date here
        startDate: '2025-05-15T09:00:00',
        endDate: '2025-05-15T22:00:00'
    };
    
    // Create Google Calendar URL
    const googleCalendarUrl = createGoogleCalendarUrl(eventDetails);
    
    // Open in new window
    window.open(googleCalendarUrl, '_blank');
}

// Helper function to create Google Calendar URL
function createGoogleCalendarUrl(event) {
    // Format dates for Google Calendar (YYYYMMDDTHHmmss)
    const startDate = formatDateForCalendar(event.startDate);
    const endDate = formatDateForCalendar(event.endDate);
    
    // Build the URL with parameters
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const params = [
        `text=${encodeURIComponent(event.title)}`,
        `dates=${startDate}/${endDate}`,
        `details=${encodeURIComponent(event.details)}`,
        `location=${encodeURIComponent(event.location)}`,
        'sf=true',
        'output=xml'
    ];
    
    return `${baseUrl}&${params.join('&')}`;
}

// Helper function to format date for calendar URL
function formatDateForCalendar(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

// ========== FORM VALIDATION (if you add a custom form later) ==========
function validateRSVPForm(formData) {
    // Basic validation example
    const errors = [];
    
    if (!formData.name || formData.name.trim() === '') {
        errors.push('Please enter your name');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.guests || formData.guests < 1) {
        errors.push('Please enter number of guests');
    }
    
    return errors;
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== LAZY LOADING FOR IMAGES ==========
// This improves page load performance by loading images only when needed
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Replace data-src with src to load the image
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========== GALLERY LIGHTBOX (Optional Enhancement) ==========
function initializeGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <span class="lightbox-close">&times;</span>
                <img src="${this.src}" alt="${this.alt}">
            `;
            
            document.body.appendChild(lightbox);
            
            // Add click event to close lightbox
            lightbox.addEventListener('click', function(e) {
                if (e.target.className === 'lightbox' || e.target.className === 'lightbox-close') {
                    lightbox.remove();
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && document.querySelector('.lightbox')) {
                    document.querySelector('.lightbox').remove();
                }
            });
        });
    });
}

// ========== TOUCH SWIPE FOR MOBILE (Gallery) ==========
function initializeTouchSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const gallery = document.querySelector('.gallery-grid');
    
    if (gallery) {
        gallery.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        gallery.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        // Detect swipe direction
        if (touchEndX < touchStartX - 50) {
            console.log('Swiped left');
            // Add your left swipe logic here
        }
        if (touchEndX > touchStartX + 50) {
            console.log('Swiped right');
            // Add your right swipe logic here
        }
    }
}

// ========== CONFETTI ANIMATION (Optional Fun Feature) ==========
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    const colors = ['#D4AF37', '#4A5D4E', '#E8D4A2', '#FFF8F0'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// ========== UTILITY FUNCTIONS ==========

// Debounce function to limit how often a function can fire
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========== PARALLAX SCROLLING EFFECT ==========
function initializeParallax() {
    // Get all elements that should have parallax effect
    const parallaxElements = {
        caricatureBride: document.querySelector('.caricature-bride'),
        caricatureGroom: document.querySelector('.caricature-groom'),
        mandala: document.querySelector('.mandala-decoration'),
        hearts: document.querySelectorAll('.heart')
    };
    
    // Add scroll event listener for parallax
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5; // Adjust speed of parallax
        
        // Apply parallax to caricatures
        if (parallaxElements.caricatureBride) {
            parallaxElements.caricatureBride.style.transform = `translateY(${rate * 0.8}px) rotate(${scrolled * 0.02}deg)`;
        }
        
        if (parallaxElements.caricatureGroom) {
            parallaxElements.caricatureGroom.style.transform = `translateY(${rate * 0.6}px) rotate(${-scrolled * 0.02}deg)`;
        }
        
        // Rotate mandala based on scroll
        if (parallaxElements.mandala) {
            parallaxElements.mandala.style.transform = `rotate(${scrolled * 0.1}deg) scale(${1 + scrolled * 0.0002})`;
        }
        
        // Parallax effect for floating hearts
        parallaxElements.hearts.forEach((heart, index) => {
            const speed = 0.5 + (index * 0.1);
            heart.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// ========== DYNAMIC BACKGROUND PARTICLES ==========
function createBackgroundParticles() {
    const particleCount = 30;
    const body = document.body;
    
    for (let i = 0; i < particleCount; i++) {
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
        body.appendChild(particle);
    }
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.4;
            }
            90% {
                opacity: 0.4;
            }
            100% {
                transform: translateY(-100vh) translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========== 3D TILT EFFECT FOR CARDS ==========
function initialize3DTilt() {
    const cards = document.querySelectorAll('.event-card, .countdown-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transition = 'transform 0.1s';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function(e) {
            this.style.transition = 'transform 0.5s';
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ========== CONSOLE MESSAGE ==========
// Fun message for developers who check the console
console.log('%c💍 Balaji & Krithika\'s Wedding 💍', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cMade with ❤️ for our special day!', 'color: #4A5D4E; font-size: 14px;');
console.log('%cWe hope to see you there!', 'color: #D4AF37; font-size: 14px;');

// ========== MUSIC PLAYER FUNCTIONALITY ==========
let isPlaying = false;

function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const musicBtn = document.querySelector('.music-btn');
    const musicText = document.querySelector('.music-text');
    
    if (!isPlaying) {
        // Play music
        audio.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
            musicText.textContent = 'Pause Music';
        }).catch(error => {
            console.log('Music playback failed:', error);
            // Show user-friendly message
            alert('Please add your wedding song MP3 file to play music');
        });
    } else {
        // Pause music
        audio.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
        musicText.textContent = 'Play Music';
    }
}

// Auto-play music when user interacts with the page (browsers block autoplay)
document.addEventListener('click', function initMusic() {
    const audio = document.getElementById('backgroundMusic');
    if (audio && !isPlaying) {
        // Remove this listener after first interaction
        document.removeEventListener('click', initMusic);
    }
}, { once: true });

// ========== MAP FUNCTIONALITY ==========
function openMap() {
    // Replace with your actual venue location
    const venueLocation = 'Sri Venkateswara Temple, Chennai, Tamil Nadu';
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueLocation)}`;
    window.open(mapUrl, '_blank');
}

// ========== SMOOTH REVEAL ANIMATIONS ==========
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animation for journey events
                if (entry.target.classList.contains('journey-event')) {
                    const bubble = entry.target.querySelector('.event-bubble');
                    if (bubble) {
                        setTimeout(() => {
                            bubble.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                bubble.style.transform = 'scale(1)';
                            }, 300);
                        }, 200);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe different elements
    const animatedElements = document.querySelectorAll(
        '.journey-event, .milestone, .profile-card, .fact-card, .polaroid-item'
    );
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
}

// Add to initialization
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initializations ...
    initializeScrollAnimations();
});