import '../styles/styles.scss';

const initGallery = function () {
  const EXPANDED_CLASS = 'ban_is-expanded';
  const galleryItems = document.querySelectorAll('.ban_js-gallery-item');
  const clickListener = function () {
    if (this.classList.contains(EXPANDED_CLASS)) {
      this.classList.remove(EXPANDED_CLASS);
    } else {
      this.classList.add(EXPANDED_CLASS);
    }
  };

  Array.prototype.forEach.call(galleryItems, function (item) {
    item.addEventListener('click', clickListener);
  })
};

initGallery();

