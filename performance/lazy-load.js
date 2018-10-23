export default function () {
  let lazyImages = []
  let active = false
  return {
    observe (selector = '.lazy', scrollBox) {
      lazyImages = [].slice.call(document.querySelectorAll(selector))

      if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              let lazyImage = entry.target;
              updateImage(lazyImage)
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        });

        lazyImages.forEach((lazyImage) => {
          lazyImageObserver.observe(lazyImage);
        });
      } else {
        if (scrollBox) {
          let scrollTarget = scrollBox || document
          scrollTarget.addEventListener("scroll", lazyLoadTask);
        }

        window.addEventListener("resize", lazyLoadTask);
        window.addEventListener("orientationchange", lazyLoadTask);
        lazyLoadTask();
      }
    },
  }

  function updateImage (lazyImage) {
    lazyImage.src = lazyImage.dataset.src;
    lazyImage.srcset = lazyImage.dataset.srcset || '';
    lazyImage.classList.remove("lazy");
  }

  function lazyLoadTask () {
    if (active === false) {
      active = true
      setTimeout(() => {
        lazyImages.forEach((lazyImage) => {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset || '';
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter((image) => {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoadTask);
              window.removeEventListener("resize", lazyLoadTask);
              window.removeEventListener("orientationchange", lazyLoadTask);
            }
          }
        });

        active = false;
      }, 200);
    }
  }
}