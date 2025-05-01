document.addEventListener('DOMContentLoaded', function(){
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    //Check saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('prefers-color-scheme: dark').matches;

    //Apply theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)){
        html.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        document.querySelector('meta[name="theme-color').setAttribute('content','#000000');
    }

    //Toggle theme when button is clicked
    themeToggle.addEventListener('click', function(){
        html.classList.toggle('dark');

        //Update icon
        if (html.classList.contains('dark')){
            icon.classList.replace('fa-moon','fa-sun');
            localStorage.setItem('theme','dark');
            document.querySelector('meta[name="theme-color"]').setAttribute('content','#000000');
        } else {
            icon.classList.replace('fa-sun','fa-moon');
            localStorage.setItem('theme','light');
            document.querySelector('meta[name="theme-color"]').setAttribute('content','#0070f3');
        }
    });

    //Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement){
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top : targetPosition,
                    behavior : 'smooth'
                });
            }
        });
    });

    //Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm){
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            //Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            //Send data to Server

            //Success message
            console.log('Form Submitted', {name, email, message});

            //Show success message
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Message Sent!';

            //Reset Form
            contactForm.reset();

            //Restore button text after delay
            setTimeout(() => {
                button.textContent = originalText;
            }, 3000);
        });
    }

    //Scroll events for header shadow and reveal animation
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');

    function checkScroll(){
        //Header Shadow
        if (window.scrollY > 0){
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }

        //Reveal animation for sections
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.85){
                section.classList.add('opacity-100', 'translate-y-0');
                section.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    //Run on page load
    checkScroll();

    //Add intersection observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');

                //Stop observing once the animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
})