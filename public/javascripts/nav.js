document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a');

    // Function to set active class based on current URL
    function setActiveLink() {
        const path = window.location.pathname;
        
        links.forEach(link => {
            const button = link.firstElementChild;
            if (link.getAttribute('href') === path) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Call the function when the page loads
    setActiveLink();

    // Call the function whenever a navigation link is clicked
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            setActiveLink();
        });
    });
});