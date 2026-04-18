/**
 * Product Image Zoom on Hover
 * Creates a magnified overlay that follows the cursor when hovering over product images
 */

(function() {
  'use strict';

  // Configuration
  const ZOOM_LEVEL = 2;
  const OVERLAY_SIZE = 200;

  /**
   * Initialize zoom functionality on page load
   */
  function initializeZoom() {
    const containers = document.querySelectorAll('.zoom-container');

    containers.forEach(container => {
      const img = container.querySelector('.product-image');

      if (!img) return;

      // Create the zoom overlay element
      const overlay = document.createElement('div');
      overlay.className = 'zoom-overlay';
      overlay.style.cssText = `
        position: absolute;
        display: none;
        width: ${OVERLAY_SIZE}px;
        height: ${OVERLAY_SIZE}px;
        border: 2px solid #ccc;
        background-size: ${img.naturalWidth * ZOOM_LEVEL}px ${img.naturalHeight * ZOOM_LEVEL}px;
        background-repeat: no-repeat;
        background-image: url('${container.getAttribute('data-zoom-src')}');
        pointer-events: none;
        z-index: 1000;
        cursor: zoom-in;
      `;

      // Wait for image to load to get accurate dimensions
      if (img.complete) {
        container.style.position = 'relative';
        container.appendChild(overlay);
      } else {
        img.onload = function() {
          container.style.position = 'relative';
          container.appendChild(overlay);
        };
      }

      // Mouse enter - show the overlay
      container.addEventListener('mouseenter', function() {
        overlay.style.display = 'block';
      });

      // Mouse move - update overlay position
      container.addEventListener('mousemove', function(e) {
        updateZoomPosition(e, container, img, overlay);
      });

      // Mouse leave - hide the overlay
      container.addEventListener('mouseleave', function() {
        overlay.style.display = 'none';
      });
    });
  }

  /**
   * Update the zoom overlay position based on cursor position
   */
  function updateZoomPosition(event, container, img, overlay) {
    const rect = container.getBoundingClientRect();
    const containerX = rect.left;
    const containerY = rect.top;

    // Get cursor position relative to container
    const cursorX = event.clientX - containerX;
    const cursorY = event.clientY - containerY;

    // Constrain cursor within container bounds
    const constrainedX = Math.max(0, Math.min(cursorX, rect.width));
    const constrainedY = Math.max(0, Math.min(cursorY, rect.height));

    // Position the overlay so cursor is at its center
    const overlayX = constrainedX - OVERLAY_SIZE / 2;
    const overlayY = constrainedY - OVERLAY_SIZE / 2;

    overlay.style.left = overlayX + 'px';
    overlay.style.top = overlayY + 'px';

    // Update background position to show zoomed portion
    // Map container coordinates to zoomed image coordinates
    const zoomX = (constrainedX / rect.width) * (img.naturalWidth * ZOOM_LEVEL);
    const zoomY = (constrainedY / rect.height) * (img.naturalHeight * ZOOM_LEVEL);

    overlay.style.backgroundPosition = `-${zoomX - OVERLAY_SIZE / 2}px -${zoomY - OVERLAY_SIZE / 2}px`;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeZoom);
  } else {
    initializeZoom();
  }
})();
