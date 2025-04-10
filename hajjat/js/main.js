 // Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : '');
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Hero Slideshow Functionality
const slides = document.querySelectorAll('.slide');
const heroSection = document.querySelector('.hero');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentSlide = index;
    updateSlideDots();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function updateSlideDots() {
    const dots = document.querySelectorAll('.slide-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Create slide dots dynamically
const slideDotsContainer = document.createElement('div');
slideDotsContainer.className = 'slide-dots';
heroSection.appendChild(slideDotsContainer);

slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.className = 'slide-dot';
    dot.addEventListener('click', () => {
        showSlide(index);
        resetSlideInterval();
    });
    slideDotsContainer.appendChild(dot);
});

function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

// Initialize slideshow
showSlide(0);
startSlideInterval();

// Pause on hover
heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
heroSection.addEventListener('mouseleave', startSlideInterval);

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

// Auto-rotate testimonials every 5 seconds
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause auto-rotation when hovering over testimonials
const testimonialSlider = document.querySelector('.testimonial-slider');
testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(nextTestimonial, 5000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('show');
        }
    });
});