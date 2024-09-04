document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            this.classList.toggle('active'); // Toggle active class on click
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Main function to initialize all components
    function initializeComponents() {
        initializeSmoothScrolling();
        initializeNewsletterForm();
        initializeMobileMenu();
        initializeGSAPSlider();
        initializeScrollReveal();
    }

    // Smooth scrolling for navigation links
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // Newsletter form validation
    function initializeNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                if (emailInput.value.trim() === '') {
                    alert('Please enter a valid email address.');
                } else {
                    alert('Thank you for signing up!');
                    emailInput.value = '';
                }
            });
        }
    }

    // Mobile menu toggle
    function initializeMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.main-nav');

        if (menuToggle && mainNav) {
            menuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('active');
                menuToggle.classList.toggle('active');
                this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
            });
        }
    }

    // GSAP Slider initialization
    function initializeGSAPSlider() {
        const sliderContainer = document.querySelector('.gsap-slider-container');
        if (!sliderContainer) {
            console.error('GSAP Slider: Container not found');
            return;
        }

        const slider = sliderContainer.querySelector('.gsap-slider');
        const slides = gsap.utils.toArray('.gsap-slide');
        const prevButton = sliderContainer.querySelector('.gsap-prev');
        const nextButton = sliderContainer.querySelector('.gsap-next');
        
        if (!slider || slides.length === 0) {
            console.error('GSAP Slider: Slider or slides not found');
            return;
        }

        const slideWidth = slides[0].offsetWidth;
        const totalWidth = slides.length * slideWidth;

        // Clone slides for infinite effect
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            slider.appendChild(clone);
        });

        // Set initial position
        gsap.set(slider, { x: 0 });

        // Create the draggable instance
        const draggable = Draggable.create(slider, {
            type: "x",
            edgeResistance: 0.65,
            bounds: { minX: -totalWidth, maxX: 0 },
            inertia: true,
            onDrag: updatePosition,
            onThrowUpdate: updatePosition
        })[0];

        function updatePosition() {
            const x = this.x;
            gsap.set(slider, {
                x: gsap.utils.wrap(-totalWidth, 0, x)
            });
        }

        // Add button functionality
        function moveSlider(direction) {
            const currentX = gsap.getProperty(slider, "x");
            const targetX = currentX + direction * slideWidth;
            
            gsap.to(slider, {
                x: targetX,
                duration: 0.5,
                onUpdate: () => {
                    const wrappedX = gsap.utils.wrap(-totalWidth, 0, gsap.getProperty(slider, "x"));
                    gsap.set(slider, { x: wrappedX });
                }
            });
        }

        prevButton.addEventListener('click', () => moveSlider(1));
        nextButton.addEventListener('click', () => moveSlider(-1));
    }

    // ScrollReveal initialization
    function initializeScrollReveal() {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 700,
            delay: 100,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            opacity: 0,
            scale: 1,
            cleanup: false,
            desktop: true,
            mobile: true
        });

        // Apply ScrollReveal to specific elements
        const revealConfigs = [
            { selector: '#welcome .welcome-content', options: { delay: 200, interval: 100 } },
            { selector: '#welcome .welcome-image', options: { delay: 300, interval: 100 } },
            { selector: '#metrics .metric', options: { interval: 100 } },
            { selector: '#stay h2', options: { delay: 200 } },
            { selector: '.gsap-slider-container', options: { delay: 300 } },
            { selector: '#dining .dining-content', options: { delay: 200, interval: 100 } },
            { selector: '#dining .dining-image', options: { delay: 300, interval: 100 } },
            { selector: '#amenities .section-container', options: { delay: 200 } },
            { selector: '#offers .section-container', options: { delay: 200 } },
            { selector: '#contact .contact-content', options: { delay: 200 } },
            { selector: '#menus h2', options: { delay: 200 } },
            { selector: '.menu-tabs', options: { delay: 400 } },
        // Add more selectors as needed
        ];

        revealConfigs.forEach(config => {
            sr.reveal(config.selector, config.options);
        });
    }

    // Initialize all components
    initializeComponents();
});

// Add this function to your existing script.js file
function initializeTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Remove active class from all links and panes
            tabLinks.forEach(l => l.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked link and corresponding pane
            link.classList.add('active');
            document.querySelector(targetId).classList.add('active');
        });
    });

    // Set the first tab as active by default
    if (tabLinks.length > 0 && tabPanes.length > 0) {
        tabLinks[0].classList.add('active');
        tabPanes[0].classList.add('active');
    }
}

// Call this function after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    // ... other initialization functions
});