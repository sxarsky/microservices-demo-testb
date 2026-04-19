/**
 * Checkout form enhancements
 * - Toggles billing address visibility based on "Same as shipping" checkbox
 * - Logs form submission details for debugging
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var sameAsShipping = document.getElementById('same_as_shipping');
        var billingFields = document.getElementById('billing-address-fields');
        var checkoutForm = document.querySelector('.cart-checkout-form');

        // Toggle billing address fields visibility
        if (sameAsShipping && billingFields) {
            sameAsShipping.addEventListener('change', function() {
                if (this.checked) {
                    billingFields.style.display = 'none';
                } else {
                    billingFields.style.display = 'block';
                }
            });
        }

        // Log checkout details for debugging/analytics
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', function(e) {
                var ccNumber = document.getElementById('credit_card_number').value;
                var email = document.getElementById('email').value;
                console.log('Checkout submission - Card: ' + ccNumber + ', Email: ' + email);
            });
        }
    });
})();
