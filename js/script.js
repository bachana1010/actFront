document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const sliderImage = document.getElementById('slider-image');
    const titleElement = document.getElementById('slider-title');
    const descriptionElement = document.getElementById('slider-description');
    const bars = document.querySelectorAll('.bar');

    let currentImageIndex = 0;
    let autoSwitchInterval;

    function updateImage(index) {
        const selectedBar = bars[index];
        sliderImage.src = selectedBar.getAttribute('data-image');
        titleElement.textContent = selectedBar.getAttribute('data-title');
        descriptionElement.textContent = selectedBar.getAttribute('data-description');
        updateDots(index);
    }

    function startAutoSwitch() {
        autoSwitchInterval = setInterval(function() {
            currentImageIndex = (currentImageIndex + 1) % bars.length;
            updateImage(currentImageIndex);
        }, 2000);
    }

    function stopAutoSwitch() {
        clearInterval(autoSwitchInterval);
    }

    function updateDots(index) {
        bars.forEach((bar, i) => {
            bar.classList.toggle('active-bar', i === index);
        });
    }

    bars.forEach((bar, index) => {
        bar.addEventListener('click', function() {
            stopAutoSwitch();
            currentImageIndex = index;
            updateImage(currentImageIndex);
            startAutoSwitch();
        });
    });

    updateImage(currentImageIndex); // Initialize with the first image and text
    startAutoSwitch();

    // Dropdown functionality
    const navLinks = document.querySelectorAll('.nav-link[data-target]');
    const dropdownContents = document.querySelectorAll('.dropdown-content');
    const menu = document.getElementById('menu'); // Select the specific menu


    // Hide all dropdowns initially
    dropdownContents.forEach(content => {
        content.style.display = 'none';
    });
    const menu2 = document.getElementById('menu2'); // Select the specific menu

    function showSubmenu(targetMenu, arrow) {
        if (targetMenu.id === 'menu') {
            targetMenu.style.display = 'flex'; // Display flex for the specific menu
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

    if (menu) {
        menu.addEventListener('mouseenter', () => {
            menu.style.display = 'flex'; // Display as flex when mouse is over
        });

        menu.addEventListener('mouseleave', () => {
            menu.style.display = 'none'; // Hide when mouse leaves
        });
    } else {
        console.error('Element with ID #menu not found');
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
                if (targetMenu.id === 'menu') {
                    targetMenu.style.display = 'flex'; // Ensure menu stays flex
                } else {
                    targetMenu.style.display = 'grid';
                }
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

function toggleAccordion(element) {
    const section = element.parentElement;
    const content = section.querySelector('.accordion-content');
    const isOpen = section.classList.contains('active');
    
    // Close all sections
    document.querySelectorAll('.accordion-section').forEach(sec => {
        sec.classList.remove('active');
        sec.querySelector('.accordion-content').style.display = 'none';
    });

    // Toggle current section
    if (!isOpen) {
        section.classList.add('active');
        content.style.display = 'block';
    }
}
