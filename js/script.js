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
            currentImageIndex = (currentImageIndex + 1) % images.length; // Circular increment
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
    

    // Hide all dropdowns initially
    dropdownContents.forEach(content => {
        content.style.display = 'none';
    });

    function showSubmenu(targetMenu, arrow) {
        if (targetMenu.id === 'menu1') {
            targetMenu.style.display = 'flex'; // Display flex for menu1
        } else {
            targetMenu.style.display = 'grid'; // Default display for other menus
        }
        if (arrow) arrow.textContent = '▼'; // Change to down arrow when active
    }

    function hideSubmenu(targetMenu, arrow) {
        setTimeout(() => {
            if (!targetMenu.matches(':hover') && !arrow.closest('.nav-link').matches(':hover')) {
                targetMenu.style.display = 'none';
                if (arrow) arrow.textContent = '>'; // Change back to right arrow
            }
        }, 200); // Small delay to prevent flicker
    }
    

    const menu1 = document.getElementById('menu'); // This will get the #menu1 element

    if (menu1) {
        // Add event listeners to show and hide the menu on hover
        menu1.addEventListener('mouseenter', () => {
            menu1.style.display = 'flex'; // Display as flex when mouse is over
        });

        menu1.addEventListener('mouseleave', () => {
            menu1.style.display = 'none'; // Hide when mouse leaves
        });
    } else {
        console.error('Element with ID #menu1 not found');
    }

    navLinks.forEach(link => {
        const arrow = link.querySelector('.arrow');
        const targetMenuId = link.getAttribute('data-target');
        const targetMenu = document.querySelector(`#${targetMenuId}`);

        // Dropdown functionality
    const menu1 = document.getElementById('menu1'); // Select menu1 specifically





        if (targetMenu) {
            // Show submenu on mouseenter and change arrow direction
            link.addEventListener('mouseenter', () => {
                showSubmenu(targetMenu, arrow);
            });

            // Keep submenu visible when hovering over it and maintain arrow direction
            targetMenu.addEventListener('mouseenter', () => {
                if (targetMenu.id === 'menu1') {
                    targetMenu.style.display = 'flex'; // Ensure menu1 stays flex
                } else {
                    targetMenu.style.display = 'grid';
                }
                if (arrow) arrow.textContent = '▼';
            });

            // Hide submenu and revert arrow when leaving the nav link
            link.addEventListener('mouseleave', () => {
                hideSubmenu(targetMenu, arrow);
            });

            // Hide submenu and revert arrow when leaving the submenu
            targetMenu.addEventListener('mouseleave', () => {
                hideSubmenu(targetMenu, arrow);
            });
        }
    });
});
