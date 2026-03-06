// ==========================================
// DISABLE SCROLL RESTORATION (PENTING!)
// ==========================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// ==========================================
// SCROLL TO TOP ON PAGE LOAD
// ==========================================
window.addEventListener('load', function() {
    // Scroll ke atas saat halaman dimuat
    window.scrollTo(0, 0);
    
    // Pastikan tidak ada scroll sebelumnya
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    console.log('✅ Page scrolled to top!');
});

// ==========================================
// SCRIPT UNDANGAN PERNIKAHAN
// ==========================================

// Disable scroll saat awal
document.body.classList.add('no-scroll');
document.body.style.overflow = 'hidden';

// ==========================================
// MUSIC PLAYER
// ==========================================
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');

// Set volume (0.5 = 50%)
if (bgMusic) {
    bgMusic.volume = 0.5;
}

// ==========================================
// AMBIL NAMA TAMU DARI URL
// ==========================================
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to');
const guestNameDisplay = document.getElementById('guestNameDisplay');

if (guestName) {
    guestNameDisplay.textContent = decodeURIComponent(guestName);
} else {
    guestNameDisplay.textContent = 'Tamu Undangan';
}

// ==========================================
// TOMBOL BUKA UNDANGAN + MUSIK
// ==========================================
const cover = document.getElementById('cover');
const mainContent = document.getElementById('mainContent');
const navbar = document.getElementById('navbar');
const btnBuka = document.getElementById('btnBuka');

if (btnBuka) {
    btnBuka.addEventListener('click', function() {
        // Aktifkan scroll
        document.body.classList.remove('no-scroll');
        document.body.style.overflow = 'auto';
        
        // Tutup cover
        cover.classList.add('opened');
        cover.style.display = 'none';
        
        // Hapus blur dari main content
        if (mainContent) {
            mainContent.classList.remove('blurred');
        }
        
        // Tampilkan navbar
        if (navbar) {
            navbar.style.display = 'flex';
        }
        
        // Hapus localStorage - agar setiap dibuka selalu muncul cover
        localStorage.removeItem('undanganDibuka');
        
        // MAINKAN MUSIK SAAT KLIK TOMBOL (INI PENTING!)
        if (bgMusic) {
            bgMusic.play()
                .then(() => {
                    console.log('✅ Music started!');
                    if (musicToggle) {
                        musicToggle.classList.add('playing');
                    }
                })
                .catch(error => {
                    console.log('❌ Music autoplay blocked:', error);
                    // Jika autoplay diblokir, user harus klik tombol musik manual
                    if (musicToggle) {
                        musicToggle.classList.add('paused');
                    }
                });
        }
    });
}

// ==========================================
// KIRIM HADIAH - COPY REKENING
// ==========================================
const copyButtons = document.querySelectorAll('.btn-copy');
const toast = document.getElementById('toast');

if (copyButtons.length > 0) {
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountNumber = this.getAttribute('data-copy');
            
            // Salin nomor rekening ke clipboard
            navigator.clipboard.writeText(accountNumber)
                .then(() => {
                    // Tampilkan toast notification
                    showToast('Nomor rekening berhasil disalin!');
                    
                    // Ubah icon tombol
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i><span>Tersalin!</span>';
                    
                    // Kembalikan tombol setelah 2 detik
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Gagal menyalin:', err);
                    showToast('Gagal menyalin nomor rekening!');
                });
        });
    });
}

// Fungsi Toast Notification
function showToast(message) {
    // Buat toast element jika belum ada
    if (!toast) {
        const toastEl = document.createElement('div');
        toastEl.className = 'toast';
        toastEl.id = 'toast';
        document.body.appendChild(toastEl);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    // Hilangkan toast setelah 3 detik
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==========================================
// MUSIC TOGGLE BUTTON
// ==========================================
if (musicToggle && bgMusic) {
    // Set icon awal (PLAY) - OTOMATIS
    musicIcon.className = 'fas fa-music'; // Icon PLAY
    musicToggle.classList.add('playing');
    musicToggle.classList.remove('paused');
    
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.add('playing');
            musicToggle.classList.remove('paused');
            
            // Icon saat PLAY (TETAP)
            musicIcon.className = 'fas fa-music';
        } else {
            bgMusic.pause();
            musicToggle.classList.add('paused');
            musicToggle.classList.remove('playing');
            
            // Icon saat PAUSE (GANTI INI)
            musicIcon.className = 'fas fa-volume-mute'; // Ganti icon ini!
        }
    });
}

// ==========================================
// LOADING SCREEN
// ==========================================
const loadingScreen = document.getElementById('loading');
if (loadingScreen) {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        loadingScreen.style.display = 'none';
    }, 2000);
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const nav = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ==========================================
// COUNTDOWN TIMER
// ==========================================
const weddingDate = new Date('April 12, 2026 09:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        const timerEl = document.getElementById('countdown-timer');
        if (timerEl) timerEl.innerHTML = '<p>Selamat Menikah!</p>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ==========================================
// SMOOTH SCROLLING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ==========================================
// RSVP FORM
// ==========================================
const rsvpForm = document.getElementById('rsvp-form');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const attendance = document.getElementById('attendance').value;
        const guests = document.getElementById('guests').value;
        const message = document.getElementById('message').value;

        alert(`Terima kasih, ${name}!\n\n` +
            `Kehadiran: ${attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir'}\n` +
            `Jumlah tamu: ${guests}\n` +
            `Pesan: ${message || 'Tidak ada'}\n\n` +
            `Konfirmasi Anda telah dikirim!`);

        rsvpForm.reset();
        console.log('RSVP Data:', { name, attendance, guests, message });
    });
}



// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
const revealElements = document.querySelectorAll(
    '.section-animate, ' +
    '.animated-element, ' +
    '.couple-grid, ' +
    '.timeline-item, ' +
    '.event-card, ' +
    '.gallery-item, ' +
    '.couple-decoration, ' +
    '.couple-intro, ' +
    '.couple-subtitle, ' +
    '.section-title-couple'
);

// Set initial styles
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.8s ease';
});

function reveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}



// Trigger on load and scroll
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);
reveal();

// ==========================================
// GALLERY CLICK EFFECT
// ==========================================
const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(img => {
    img.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
});

console.log('Created by Ranpo Rowan! 💍');