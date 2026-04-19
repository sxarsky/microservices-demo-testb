(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var steps = document.querySelectorAll('.checkout-step-content');
        var indicators = document.querySelectorAll('.checkout-step-indicator');
        var nextBtns = document.querySelectorAll('.checkout-btn-next');
        var backBtns = document.querySelectorAll('.checkout-btn-back');
        var placeOrderBtn = document.getElementById('place-order-btn');
        var currentStep = 0;

        if (steps.length === 0) return;

        function showStep(index) {
            steps.forEach(function(step, i) {
                step.classList.toggle('active', i === index);
            });
            indicators.forEach(function(ind, i) {
                ind.classList.remove('active', 'completed');
                if (i < index) {
                    ind.classList.add('completed');
                } else if (i === index) {
                    ind.classList.add('active');
                }
            });
            currentStep = index;

            // Update review section if on step 3
            if (index === 2) {
                updateReview();
            }
        }

        function validateStep(stepIndex) {
            var stepEl = steps[stepIndex];
            var requiredFields = stepEl.querySelectorAll('[required]');
            var valid = true;

            requiredFields.forEach(function(field) {
                var errorEl = field.parentElement.querySelector('.checkout-validation-error');
                if (!field.value || field.value.trim() === '') {
                    valid = false;
                    field.style.borderColor = '#d32f2f';
                    if (errorEl) {
                        errorEl.classList.add('show');
                    }
                } else {
                    field.style.borderColor = '';
                    if (errorEl) {
                        errorEl.classList.remove('show');
                    }
                }
            });

            return valid;
        }

        function updateReview() {
            // Shipping summary
            var email = document.getElementById('email');
            var street = document.getElementById('street_address');
            var city = document.getElementById('city');
            var state = document.getElementById('state');
            var zip = document.getElementById('zip_code');
            var country = document.getElementById('country');

            var reviewShipping = document.getElementById('review-shipping');
            if (reviewShipping && email && street) {
                reviewShipping.innerHTML =
                    '<p>' + (email.value || '') + '</p>' +
                    '<p>' + (street.value || '') + '</p>' +
                    '<p>' + (city ? city.value : '') + ', ' +
                    (state ? state.value : '') + ' ' +
                    (zip ? zip.value : '') + '</p>' +
                    '<p>' + (country ? country.value : '') + '</p>';
            }

            // Payment summary
            var ccNumber = document.getElementById('credit_card_number');
            var reviewPayment = document.getElementById('review-payment');
            if (reviewPayment && ccNumber) {
                var masked = ccNumber.value ? ('**** **** **** ' + ccNumber.value.slice(-4)) : '';
                reviewPayment.innerHTML = '<p>Card: ' + masked + '</p>';
            }
        }

        nextBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                if (validateStep(currentStep)) {
                    showStep(currentStep + 1);
                }
            });
        });

        backBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                showStep(currentStep - 1);
            });
        });

        // Initialize first step
        showStep(0);
    });
})();
