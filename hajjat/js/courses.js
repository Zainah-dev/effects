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

// Course Search Functionality
const courseSearch = document.getElementById('course-search');
const searchBtn = document.getElementById('search-btn');
const courseItems = document.querySelectorAll('.course-item');

function filterCourses() {
    const searchTerm = courseSearch.value.toLowerCase();
    
    courseItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

courseSearch.addEventListener('input', filterCourses);
searchBtn.addEventListener('click', filterCourses);

// Enrollment Modal
const enrollBtns = document.querySelectorAll('.enroll-btn');
const enrollmentModal = document.querySelector('.enrollment-modal');
const closeModal = document.querySelector('.close-modal');
const enrollmentForm = document.getElementById('enrollment-form');
const courseTitle = document.getElementById('course-title');

enrollBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.course-item');
        const title = card.querySelector('h3').textContent;
        courseTitle.textContent = title;
        enrollmentModal.classList.add('active');
    });
});

closeModal.addEventListener('click', () => {
    enrollmentModal.classList.remove('active');
});

enrollmentModal.addEventListener('click', (e) => {
    if (e.target === enrollmentModal) {
        enrollmentModal.classList.remove('active');
    }
});

// Enrollment Form Submission
enrollmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const experience = document.getElementById('experience').value;
    const course = courseTitle.textContent;
    
    // Create enrollment object
    const enrollment = {
        name,
        email,
        phone,
        experience,
        course,
        date: new Date().toISOString()
    };
    
    // Save to localStorage
    let enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
    enrollments.push(enrollment);
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    
    // Show success message (you could implement this)
    alert(`Thank you, ${name}! Your enrollment for ${course} has been received. We'll contact you soon.`);
    
    // Reset form and close modal
    enrollmentForm.reset();
    enrollmentModal.classList.remove('active');
});