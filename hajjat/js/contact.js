// Dark Mode Toggle (same as main.js)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

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

// Mobile Menu Toggle (same as main.js)
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Create contact object
    const contact = {
        name,
        email,
        subject,
        message,
        date: new Date().toISOString()
    };
    
    // Save to localStorage (for demo purposes)
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    // Show success message
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // Reset form after 3 seconds
    setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
    }, 5000);
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// WhatsApp Button
const whatsappBtn = document.querySelector('.whatsapp-btn');
whatsappBtn.addEventListener('click', (e) => {
    // In a real implementation, this would open WhatsApp with a pre-filled message
    // window.open('https://wa.me/1234567890?text=Hello%20BreakThrough%20Tech%20Academy');
    e.preventDefault();
    alert('In a live site, this would open WhatsApp to chat with support.');
});