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
