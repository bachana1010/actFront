document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const images = [
        'asserts/Rectangle12.png',
        'asserts/Rectangle4.png',
        'asserts/Rectangle14.png'
    ];

    let currentImageIndex = 0;
    let autoSwitchInterval;

    const sliderImage = document.getElementById('slider-image');
    const dots = document.querySelectorAll('.bar');

    function updateImage() {
        sliderImage.src = images[currentImageIndex];
        updateDots();
    }

    function startAutoSwitch() {
        autoSwitchInterval = setInterval(function() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateImage();
        }, 2000);
    }

    function stopAutoSwitch() {
        clearInterval(autoSwitchInterval);
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active-bar', index === currentImageIndex);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSwitch();
            currentImageIndex = index;
            updateImage();
            startAutoSwitch();
        });
    });

    updateImage();
    startAutoSwitch();

    // Dropdown functionality
    const navLinks = document.querySelectorAll('.nav-link[data-target]');
    const dropdownContents = document.querySelectorAll('.dropdown-content');
    const menu = document.getElementById('menu'); // Select the specific menu


    // Hide all dropdowns initially

    // Hide all dropdowns initially and set their display to grid by default
    dropdownContents.forEach(content => {
        content.style.display = 'none';
    });

    function showSubmenu(targetMenu, arrow) {
        dropdownContents.forEach(content => {
            if (content === targetMenu) {
                content.style.display = 'grid'; // Always set to grid when shown
                if (arrow) arrow.textContent = '▼'; // Change to down arrow when active
            } else {
                content.style.display = 'none'; // Hide other submenus
            }
        });
    }

    function hideSubmenu(targetMenu, arrow) {
        setTimeout(() => {
            if (!targetMenu.matches(':hover') && !arrow.closest('.nav-link').matches(':hover')) {
                targetMenu.style.display = 'none';
                if (arrow) arrow.textContent = '>'; // Change back to right arrow
            }
        }, 200); // Small delay to prevent flicker
    }

    navLinks.forEach(link => {
        const arrow = link.querySelector('.arrow');
        const targetMenuId = link.getAttribute('data-target');
        const targetMenu = document.querySelector(`#${targetMenuId}`);

        if (targetMenu) {
            link.addEventListener('mouseenter', () => {
                showSubmenu(targetMenu, arrow);
            });

            targetMenu.addEventListener('mouseenter', () => {
                targetMenu.style.display = 'grid'; // Maintain grid display when hovering over submenu
                if (arrow) arrow.textContent = '▼';
            });

            link.addEventListener('mouseleave', () => {
                hideSubmenu(targetMenu, arrow);
            });

            targetMenu.addEventListener('mouseleave', () => {
                hideSubmenu(targetMenu, arrow);
            });
        }
    });
});
