import '../styles/main.less';

(function(){
    var initGallery = function(){
      var EXPANDED_CLASS = 'ban_is-expanded';
      var galleryItems = document.querySelectorAll('.ban_js-gallery-item');
      var clickListener = function() {
        if (this.classList.contains(EXPANDED_CLASS)) {
          this.classList.remove(EXPANDED_CLASS);
        } else {
          this.classList.add(EXPANDED_CLASS);
        }
      };

      Array.prototype.forEach.call(galleryItems, function(item) {
        item.addEventListener('click', clickListener);
      })
    };

    initGallery();

  const menuToggle = document.querySelector('.fyr_menu__toggle');
  const menuOverlay = document.getElementById('fyr-menu-list');
  const menuClose = document.querySelector('.fyr_menu__close');

  const closeMenu = () => {
    menuOverlay.classList.remove('fyr_is-open');
    menuToggle.setAttribute('aria-expanded', false);
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuOverlay.classList.toggle('fyr_is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  menuClose.addEventListener('click', closeMenu);

  // Optional: close when clicking outside
  document.addEventListener('click', (event) => {
    if (
      !menuOverlay.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
})();

