document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const images = [
        'asserts/Rectangle12.png',
        'asserts/Rectangle4.png',
        'asserts/Rectangle14.png',
        'asserts/Rectangle6.png'
    ];

    let currentImageIndex = 0;
    let autoSwitchInterval;

    const sliderImage = document.getElementById('slider-image');
    const dots = document.querySelectorAll('.dot');

    function updateImage() {
        sliderImage.src = images[currentImageIndex];
        updateDots();
    }

    function startAutoSwitch() {
        autoSwitchInterval = setInterval(function() {
            currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
            updateImage();
        }, 2000);
    }

    function stopAutoSwitch() {
        clearInterval(autoSwitchInterval);
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentImageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
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

    // Navigation dropdown functionality
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownContainer = document.getElementById('dropdown-container');
    const dropdownContents = document.querySelectorAll('.dropdown-content');

    navLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            const targetMenu = this.getAttribute('data-target');
            const dropdownContent = document.getElementById(targetMenu);

            // Check if the dropdown content exists
            if (dropdownContent) {
                dropdownContents.forEach(content => {
                    if (content.id === targetMenu) {
                        content.style.display = 'flex';
                    } else {
                        content.style.display = 'none';
                    }
                });
                dropdownContainer.style.display = 'block';
            } else {
                dropdownContainer.style.display = 'none';
            }
        });

        link.addEventListener('mouseleave', function() {
            const targetMenu = this.getAttribute('data-target');
            const dropdownContent = document.getElementById(targetMenu);
            
            if (dropdownContent) {
                dropdownContent.addEventListener('mouseleave', function() {
                    dropdownContent.style.display = 'none';
                });
            }
        });
    });

    dropdownContainer.addEventListener('mouseover', function() {
        this.style.display = 'block';
    });

    dropdownContainer.addEventListener('mouseleave', function() {
        this.style.display = 'none';
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const cross = document.querySelector('.cross');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', function() {
        menu.classList.add('open');
        hamburger.style.display = 'none';
        cross.style.display = 'block';
        console.log(hamburger, "cross");
    });

    cross.addEventListener('click', function() {
        menu.classList.remove('open');
        cross.style.display = 'none';
        hamburger.style.display = 'block';
    });

    // Search icon toggle functionality
    const searchHamburger = $('.search-hamburger');
    const searchClose = $('.search-close');

    function toggleSearch() {
        console.log("Aq shemodis?");
        console.log("Aq shemodis?", searchClose);
        console.log("Aq shemodis?", searchHamburger);
        searchHamburger.toggleClass('active');
        searchClose.toggleClass('active');
    }

    searchHamburger.click(toggleSearch);
    searchClose.click(toggleSearch);

    // Mobile menu functionality
    const parentItems = document.querySelectorAll('.parent-item');

    parentItems.forEach(item => {
        item.addEventListener('click', function() {
            const submenu = this.nextElementSibling;
            submenu.classList.toggle('open');

            // Toggle active class on parent item
            this.classList.toggle('active');

            // Update the toggle icon
            const toggleIcon = this.querySelector('.toggle-icon');
            if (submenu.classList.contains('open')) {
                toggleIcon.textContent = '▲';
            } else {
                toggleIcon.textContent = '▼';
            }
        });
    });
});

$(document).ready(function() {
    // Hide all submenus initially
    $('.submenu').hide();

    // Toggle submenu on click
    $('.parent-item').on('click', function(e) {
        e.preventDefault();
        $(this).next('.submenu').slideToggle('fast');
        $(this).find('.toggle-icon').text(function(_, value) { return value === '▼' ? '▲' : '▼'; });
    });
});
