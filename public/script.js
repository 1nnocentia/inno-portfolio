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
        document.querySelector('meta[name="theme-color"]').setAttribute('content','#000000');
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

    //Mobile navigation toggle
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && closeMenu && mobileMenu){
        menuToggle.addEventListener('click', function(){
            mobileMenu.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
        });

        closeMenu.addEventListener('click', function(){
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });

        //Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function(){
                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    //Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

    //Terminal Animation
    const terminalContainer = document.getElementById('terminal-container');
    const terminalContent = document.querySelector('.terminal-content');
    const commandSpan = document.querySelector('.command-text');

    if (terminalContainer && terminalContent && commandSpan){
        const commandText = "git clone https://github.com/1nnocentia/reinmannsum.git";

        let i = 0;
        const typeCommand = () => {
            if (i < commandText.length){
                commandSpan.textContent += commandText.charAt(i);
                i++;
                setTimeout(typeCommand, 50);
            } else {
                //Add blinking cursor after typing
                const cursor = document.createElement('span');
                cursor.className = 'inline-block w-2 h-5 bg-gray-900 dark:bg-white ml-1 animate-blink align-middle';
                terminalContent.appendChild(cursor);
            }
        };

        //Start typing after delay
        setTimeout(typeCommand, 1000);
    } else {
        //Fallback for original terminal structure
        const terminal = document.querySelector('.terminal-body');
        if (terminal) {
            const commandText = terminal.querySelector('.command').textContent;
            terminal.querySelector('.command').textContent = '';

            if (i < commandText.length){
                terminal.querySelector('.command').textContent += commandText.charAt(i);
                i++;
                setTimeout(typeCommand, 50);
            } else {
                //Blinking cursor after typing
                terminal.querySelector('.command').insertAdjacentHTML('afterend', '<span class="animate-blink">_</span>');
            }
        }

        //Start typing after delay
        setTimeout(typeCommand, 1000);
    }
});