document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    initializeBackToTop();
    createBackgroundParticles();
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
            document.getElementById('countdown').innerHTML = '<h2>The Wedding Day is Here!</h2>';
        }
    }, 1000);
}

function formatNumber(num) {
    return num < 10 ? '0' + num : num;
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
        window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
    }
}

// ========== ADD TO CALENDAR ==========
function addToCalendar() {
    const eventDetails = {
        title: 'Balaji & Krithika Wedding',
        details: 'We are getting married! Join us for our special day at AIOBEU Swasthika. Sincerely, Balaji & Krithika',
        location: 'AIOBEU Swasthika, 10 DR Radhakrishnan Salai, 7th St, Mylapore, Chennai, Tamil Nadu 600004',
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

// ========== SCROLL ANIMATIONS ==========
function initializeScrollAnimations() {
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.event-card-clean, .venue-card').forEach(el => scrollObserver.observe(el));
}

// ========== MUSIC PLAYER ==========
let isPlaying = false;
let audioLoaded = false;

function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const musicBtn = document.querySelector('.music-btn');
    const musicText = document.querySelector('.music-text');

    if (!isPlaying) {
        if (!audioLoaded) {
            audio.load();
            audioLoaded = true;
        }

        audio.volume = 1;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                if (musicText) musicText.textContent = 'Pause';
            }).catch((error) => {
                console.log('Audio play failed:', error);
                setTimeout(() => {
                    audio.play().then(() => {
                        isPlaying = true;
                        musicBtn.classList.add('playing');
                        if (musicText) musicText.textContent = 'Pause';
                    }).catch(() => {
                        alert('Tap again to play music');
                    });
                }, 100);
            });
        }
    } else {
        audio.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
        if (musicText) musicText.textContent = 'Play';
    }
}

// ========== WELCOME OVERLAY ==========
function enterInvitation() {
    const overlay = document.getElementById('welcomeOverlay');
    const audio = document.getElementById('backgroundMusic');
    const musicBtn = document.querySelector('.music-btn');
    const musicText = document.querySelector('.music-text');

    let visitCount = parseInt(localStorage.getItem('weddingVisitCount') || '0');
    visitCount++;
    localStorage.setItem('weddingVisitCount', visitCount);

    if (visitCount <= 2) {
        audio.volume = 1;
        audio.load();

        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                audioLoaded = true;
                if (musicBtn) musicBtn.classList.add('playing');
                if (musicText) musicText.textContent = 'Pause';
            }).catch((error) => {
                console.log('Audio autoplay failed:', error);
            });
        }
    }

    overlay.classList.add('hidden');
    document.body.classList.remove('overlay-active');

    setTimeout(() => {
        overlay.remove();
    }, 1000);
}

// ========== TAB VISIBILITY - PAUSE/RESUME MUSIC ==========
let wasPlayingBeforeHidden = false;

function handleVisibilityChange() {
    const audio = document.getElementById('backgroundMusic');

    if (document.hidden || document.webkitHidden) {
        if (isPlaying) {
            wasPlayingBeforeHidden = true;
            audio.pause();
        }
    } else {
        if (wasPlayingBeforeHidden && isPlaying) {
            audio.play().catch(() => {});
        }
    }
}

document.addEventListener('visibilitychange', handleVisibilityChange);
document.addEventListener('webkitvisibilitychange', handleVisibilityChange);

window.addEventListener('pagehide', function() {
    const audio = document.getElementById('backgroundMusic');
    if (isPlaying) {
        wasPlayingBeforeHidden = true;
        audio.pause();
    }
});

window.addEventListener('pageshow', function() {
    const audio = document.getElementById('backgroundMusic');
    if (wasPlayingBeforeHidden && isPlaying) {
        audio.play().catch(() => {});
    }
});

document.body.classList.add('overlay-active');

// ========== RSVP FORM ==========
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxB014MGJ8-ASuW_PS_5479qbipvHmVw3kX3zrmgqaTCLg2SLYjdZ68tZS0d_ju5mBn/exec';

let guestCount = 1;

function changeGuests(delta) {
    guestCount = Math.min(5, Math.max(1, guestCount + delta));
    document.getElementById('guestCount').textContent = guestCount;
    document.getElementById('guestsInput').value = guestCount;
}

async function submitRSVP(e) {
    e.preventDefault();
    const form = e.target;
    const btn = document.getElementById('rsvpSubmitBtn');
    const btnText = document.getElementById('rsvpBtnText');

    const data = {
        name: form.name.value.trim(),
        side: form.side.value,
        guests: form.guests.value,
        attending: form.attending.value
    };

    btn.disabled = true;
    btnText.textContent = 'Sending...';

    try {
        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        document.getElementById('rsvpForm').style.display = 'none';
        document.getElementById('rsvpSuccess').style.display = 'block';
    } catch (err) {
        btnText.textContent = 'Something went wrong — try again';
        btn.disabled = false;
    }
}
