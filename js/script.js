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

    // Dropdown functionality for the header menu
    const navLinks = document.querySelectorAll('.nav-link[data-target]');

    function showSubmenu(targetMenu, arrow) {
        if (!targetMenu) return; // Check if targetMenu exists
        
        // Set display style based on menu ID
        if (targetMenu.id === 'menu') {
            targetMenu.style.display = 'flex'; // First menu as flex
            console.log("pirveli")
        } else if (['menu2', 'menu6', 'menu7'].includes(targetMenu.id)) {
            console.log("meore")

            targetMenu.style.display = 'grid'; // Set grid for menus 2, 6, and 7
        }

        if (arrow) arrow.textContent = '▼'; // Change arrow down
    }

    function hideSubmenu(targetMenu, arrow) {
        setTimeout(() => {
            if (!targetMenu) return; // Check if targetMenu exists
            // Only hide menu if neither the link nor the menu is hovered
            if (!targetMenu.matches(':hover') && !arrow.closest('.nav-link').matches(':hover')) {
                targetMenu.style.display = 'none';
                if (arrow) arrow.textContent = '›'; // Change arrow to right
            }
        }, 200);
    }

    // Initialize hover listeners for dropdown menus
    navLinks.forEach(link => {
        const arrow = link.querySelector('.arrow');
        const targetMenuId = link.getAttribute('data-target');
        const targetMenu = document.querySelector(`#${targetMenuId}`);

        if (targetMenu) { // Check if targetMenu exists
            link.addEventListener('mouseenter', () => showSubmenu(targetMenu, arrow));
            targetMenu.addEventListener('mouseenter', () => showSubmenu(targetMenu, arrow));
            link.addEventListener('mouseleave', () => hideSubmenu(targetMenu, arrow));
            targetMenu.addEventListener('mouseleave', () => hideSubmenu(targetMenu, arrow));
        } else {
            console.warn(`Element with ID #${targetMenuId} not found.`);
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
