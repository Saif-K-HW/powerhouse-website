// Typing animation for hero text
function initTypeWriter() {
    const text = document.querySelector('.typing-text');
    const words = ['Smart.', 'Efficient.', 'Sustainable.'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            text.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            text.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Magnetic button effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(button, {
                duration: 0.3,
                x: x * 0.2,
                y: y * 0.2,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.3,
                x: 0,
                y: 0,
                ease: "power2.out"
            });
        });
    });
}

// Parallax scroll effect
function initParallaxScroll() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.feature-card');
        
        parallaxElements.forEach(element => {
            const speed = 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Card tilt effect
function initCardTilt() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Page transition effect
function initPageTransitions() {
    const transition = document.querySelector('.page-transition');
    
    window.addEventListener('load', () => {
        gsap.to(transition, {
            duration: 1,
            scaleY: 0,
            transformOrigin: "top",
            ease: "power4.inOut"
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initTypeWriter();
    initMagneticButtons();
    initParallaxScroll();
    initCardTilt();
    initPageTransitions();
});
