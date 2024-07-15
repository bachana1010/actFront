document.addEventListener('DOMContentLoaded', function() {
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
});


//სსს

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownContainer = document.getElementById('dropdown-container');
    const dropdownContents = document.querySelectorAll('.dropdown-content');

    navLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            const targetMenu = this.getAttribute('data-target');
            dropdownContents.forEach(content => {
                if (content.id === targetMenu) {
                    content.style.display = 'flex';
                } else {
                    content.style.display = 'none';
                }
            });
            dropdownContainer.style.display = 'block';
        });
    });

    dropdownContainer.addEventListener('mouseover', function() {
        this.style.display = 'block';
    });

    dropdownContainer.addEventListener('mouseout', function() {
        this.style.display = 'none';
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const cross = document.querySelector('.cross');
    const menu = document.querySelector('.menu');

    hamburger.addEventListener('click', function() {
        menu.classList.add('open');
        hamburger.style.display = 'none';
        cross.style.display = 'block';
    });

    cross.addEventListener('click', function() {
        menu.classList.remove('open');
        cross.style.display = 'none';
        hamburger.style.display = 'block';
    });
});
