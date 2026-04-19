/**
 * Cart confirmation dialog functionality
 * Shows a confirmation modal when user clicks the Empty Cart button
 */

(function() {
    'use strict';

    const emptyCartBtn = document.getElementById('empty-cart-btn');
    const emptyCartModal = document.getElementById('empty-cart-modal');
    const confirmBtn = document.getElementById('confirm-empty-cart');
    const cancelBtn = document.getElementById('cancel-empty-cart');
    const emptyCartForm = document.getElementById('empty-cart-form');

    if (!emptyCartBtn || !emptyCartModal || !confirmBtn || !cancelBtn || !emptyCartForm) {
        // Elements not found, script may be loaded on a page without a cart
        return;
    }

    /**
     * Show the confirmation modal
     */
    function showModal() {
        emptyCartModal.classList.add('show');
    }

    /**
     * Hide the confirmation modal
     */
    function hideModal() {
        emptyCartModal.classList.remove('show');
    }

    /**
     * Submit the empty cart form
     */
    function submitForm() {
        emptyCartForm.submit();
    }

    // Event listeners
    emptyCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showModal();
    });

    confirmBtn.addEventListener('click', function(e) {
        e.preventDefault();
        submitForm();
    });

    cancelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        hideModal();
    });

    // Click outside the modal content to dismiss
    emptyCartModal.addEventListener('click', function(e) {
        if (e.target === emptyCartModal) {
            hideModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && emptyCartModal.classList.contains('show')) {
            hideModal();
        }
    });
})();
