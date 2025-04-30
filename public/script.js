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
            document.querySelector('meta[name="theme-color').setAttribute('content','#000000');
        } else {
            icon.classList.replace('fa-sun','fa-moon');
            localStorage.setItem('theme','light');
            document.querySelector('meta[name="theme-color').setAttribute('content','#0070f3');
        }
    });
})