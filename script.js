// Wait for the page to fully load
window.addEventListener('load', function() {
  // Get the slideshow container
  const slideshowContainer = document.querySelector('.slideshow-container');

  // Get all the images in the slideshow
  const images = Array.from(slideshowContainer.getElementsByTagName('img'));

  // Set the initial index and active class
  let currentIndex = 0;
  images[currentIndex].style.display = 'block';

  // Function to show the next image
  function showNextImage() {
    images[currentIndex].style.display = 'none';
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.display = 'block';
  }

  // Set the interval to change images every 3 seconds
  setInterval(showNextImage, 3000);
});
