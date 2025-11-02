document.addEventListener('DOMContentLoaded', () => {

    // 1. **PRELOADER LOGIC**
    const preloader = document.getElementById('preloader');
    
    // Function to hide the preloader
    const hidePreloader = () => {
        const currentPreloader = document.getElementById('preloader');
        if (!currentPreloader) return; 

        currentPreloader.classList.add('hidden-preloader'); 
        
        setTimeout(() => {
            if (currentPreloader.parentNode) {
                currentPreloader.parentNode.removeChild(currentPreloader);
            }
            // Ensure body overflow is back to normal
            document.body.style.overflow = 'auto'; 
        }, 500); 
    };

    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Hide preloader when everything is loaded
    window.addEventListener('load', hidePreloader);

    // Safety fallback: Hide preloader after a max time (e.g., 3 seconds)
    setTimeout(hidePreloader, 3000); 

    // 2. **SMOOTH SCROLLING (Advanced UX Feature)**
    document.querySelectorAll('nav a[href^="#"], .cta-button[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header height
                    behavior: 'smooth'
                });
            }
            
            // NEW: Close the mobile menu after clicking a link
            const mainNav = document.getElementById('mainNav');
            const menuToggle = document.getElementById('menuToggle');
            
            if (mainNav && mainNav.classList.contains('nav-open')) {
                 mainNav.classList.remove('nav-open');
                 // Reset icon and allow scrolling
                 if (menuToggle) {
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                 }
                 document.body.style.overflow = 'auto';
            }
        });
    });


    // 3. **CONTACT FORM SUBMISSION SIMULATION**
    const bookingForm = document.getElementById('booking-form');
    const formMessage = document.getElementById('form-message');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation check
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            if (!name || !email) {
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.classList.remove('hidden', 'success');
                formMessage.style.backgroundColor = '#FFEBEE'; // Light Red
                formMessage.style.color = '#C62828'; // Dark Red
                return;
            }

            // Simulate form processing time
            setTimeout(() => {
                formMessage.textContent = `Thank you, ${name}! Your consultation request has been sent. We will email you at ${email} shortly.`;
                formMessage.classList.remove('hidden');
                formMessage.classList.add('success');
                
                // Reset form fields
                bookingForm.reset();

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);

            }, 500); // Wait 0.5s to simulate network delay
        });
    }

    // 4. **TOGGLE HIDDEN TOURS FUNCTIONALITY**
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const hiddenTours = document.querySelectorAll('.hidden-tour');

    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            let toursRevealed = false;
            
            // Loop through all hidden tour cards
            hiddenTours.forEach(card => {
                // Check if the card is currently hidden (by its class)
                if (card.classList.contains('hidden-tour')) {
                    // 1. Remove the static hidden class
                    card.classList.remove('hidden-tour'); 
                    
                    // 2. Add the dynamic class to trigger the CSS transition
                    card.classList.add('fade-in'); 
                    
                    toursRevealed = true;
                }
            });

            // Update button state and text after revealing tours
            if (toursRevealed) {
                this.textContent = 'Showing All Tours';
                this.disabled = true;
                this.style.backgroundColor = 'var(--secondary-color)';
                this.style.cursor = 'default';

                // Optional: Scroll down to show the newly revealed cards
                const toursSection = document.getElementById('tours');
                toursSection.scrollIntoView({ behavior: 'smooth', block: 'end' });

            }
        });
    }

    // 5. **HAMBURGER MENU TOGGLE LOGIC (REQUIRED FOR MOBILE)**
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const icon = menuToggle.querySelector('i');
            
            mainNav.classList.toggle('nav-open');
            
            // Toggle the icon between hamburger and close (X) and control body scrolling
            if (mainNav.classList.contains('nav-open')) {
                icon.className = 'fas fa-times'; // X icon
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                icon.className = 'fas fa-bars'; // Hamburger icon
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
        });
    }

    // 6. **BACKGROUND CAROUSEL LOGIC**
    const carouselItems = document.querySelectorAll('.hero-carousel .carousel-item');
    let currentIndex = 0;
    const intervalTime = 2500; // 2.5 seconds interval for image change

    function showNextSlide() {
        // 1. Remove 'active' class from the current slide
        carouselItems[currentIndex].classList.remove('active');

        // 2. Calculate the next index
        currentIndex = (currentIndex + 1) % carouselItems.length;

        // 3. Add 'active' class to the new slide
        carouselItems[currentIndex].classList.add('active');
    }

    // Start the automatic rotation
    if (carouselItems.length > 1) {
        // Initialize the first slide as active (if not already done in HTML)
        if (!carouselItems[currentIndex].classList.contains('active')) {
             carouselItems[currentIndex].classList.add('active');
        }
        setInterval(showNextSlide, intervalTime);
    }
});