(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var slides = document.querySelectorAll('.carousel-slide');
        var dots = document.querySelectorAll('.carousel-dot');
        var prevBtn = document.getElementById('carousel-prev');
        var nextBtn = document.getElementById('carousel-next');
        var currentIndex = 0;
        var autoAdvanceInterval;

        if (slides.length === 0) return;

        function showSlide(index) {
            slides.forEach(function(slide) { slide.classList.remove('active'); });
            dots.forEach(function(dot) { dot.classList.remove('active'); });
            currentIndex = (index + slides.length) % slides.length;
            slides[currentIndex].classList.add('active');
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        function nextSlide() {
            showSlide(currentIndex + 1);
        }

        function prevSlide() {
            showSlide(currentIndex - 1);
        }

        function startAutoAdvance() {
            autoAdvanceInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoAdvance() {
            clearInterval(autoAdvanceInterval);
            startAutoAdvance();
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                resetAutoAdvance();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                resetAutoAdvance();
            });
        }

        dots.forEach(function(dot) {
            dot.addEventListener('click', function() {
                var index = parseInt(this.getAttribute('data-index'), 10);
                showSlide(index);
                resetAutoAdvance();
            });
        });

        startAutoAdvance();
    });
})();
