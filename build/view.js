/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log('Hello World! (from wdsbt-wdsbt-carousel-block block)');
/* eslint-enable no-console */

document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.wp-block-wdsbt-wdsbt-carousel-block');
  carousels.forEach(carousel => {
    const container = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dots button');
    const prevButton = carousel.querySelector('.prev-slide');
    const nextButton = carousel.querySelector('.next-slide');
    const scrollbar = carousel.querySelector('.carousel-scrollbar');
    const scrollbarThumb = carousel.querySelector('.carousel-scrollbar-thumb');
    function updateNavigation() {
      const scrollPosition = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      // Update buttons
      if (prevButton) prevButton.disabled = scrollPosition <= 0;
      if (nextButton) nextButton.disabled = scrollPosition >= maxScroll;

      // Update dots
      const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(carousel).getPropertyValue('--gap'));
      const currentSlide = Math.round(scrollPosition / slideWidth);
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }
    function scrollToSlide(index) {
      const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(carousel).getPropertyValue('--gap'));
      container.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => scrollToSlide(index));
    });

    // Button navigation
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(carousel).getPropertyValue('--gap'));
        container.scrollBy({
          left: -slideWidth,
          behavior: 'smooth'
        });
      });
    }
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(carousel).getPropertyValue('--gap'));
        container.scrollBy({
          left: slideWidth,
          behavior: 'smooth'
        });
      });
    }

    // Update navigation on scroll and resize
    container.addEventListener('scroll', updateNavigation);
    window.addEventListener('resize', updateNavigation);

    // Initial update
    updateNavigation();
    if (scrollbar && scrollbarThumb) {
      // Update thumb position and width
      function updateScrollbarThumb() {
        const scrollPercentage = container.scrollLeft / (container.scrollWidth - container.clientWidth);
        const thumbWidth = container.clientWidth / container.scrollWidth * 100;
        const thumbPosition = scrollPercentage * (100 - thumbWidth);
        scrollbarThumb.style.width = `${Math.max(thumbWidth, 10)}%`;
        scrollbarThumb.style.left = `${thumbPosition}%`;
      }

      // Initial update
      updateScrollbarThumb();

      // Update on scroll
      container.addEventListener('scroll', updateScrollbarThumb);

      // Handle scrollbar click (jump to position)
      scrollbar.addEventListener('click', e => {
        if (e.target === scrollbarThumb) return; // Don't handle clicks on thumb

        const clickPosition = e.offsetX / scrollbar.offsetWidth;
        const scrollAmount = clickPosition * (container.scrollWidth - container.clientWidth);
        container.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      });

      // Handle thumb dragging
      let isDragging = false;
      let startX;
      let scrollLeft;
      let thumbStartX;
      scrollbarThumb.addEventListener('mousedown', e => {
        isDragging = true;
        thumbStartX = e.clientX - scrollbarThumb.offsetLeft;
        scrollLeft = container.scrollLeft;

        // Prevent text selection while dragging
        document.body.style.userSelect = 'none';
      });
      document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();
        const thumbX = e.clientX - scrollbar.getBoundingClientRect().left;
        const newThumbPosition = thumbX - thumbStartX;

        // Calculate the scroll position based on thumb position
        const scrollableWidth = container.scrollWidth - container.clientWidth;
        const thumbTrackWidth = scrollbar.offsetWidth - scrollbarThumb.offsetWidth;
        const scrollRatio = scrollableWidth / thumbTrackWidth;
        const newScrollPosition = Math.max(0, Math.min(scrollableWidth, newThumbPosition * scrollRatio));
        container.scrollLeft = newScrollPosition;
      });
      document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.userSelect = '';
      });

      // Handle window resize
      window.addEventListener('resize', updateScrollbarThumb);
    }
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map