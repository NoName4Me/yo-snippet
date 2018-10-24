export default function () {
  let lazyResources = []
  let active = false
  return {
    observe (selector = '.lazy', scrollBox) {
      lazyResources = [].slice.call(document.querySelectorAll(selector))

      if ('IntersectionObserver' in window) {
        let lazyResourceObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              let lazyResource = entry.target
              doUpdate(lazyResource)
              lazyResourceObserver.unobserve(lazyResource)
            }
          })
        })

        lazyResources.forEach((lazyResource) => {
          lazyResourceObserver.observe(lazyResource)
        })
      } else {
        if (scrollBox) {
          let scrollTarget = scrollBox || document
          scrollTarget.addEventListener('scroll', lazyLoadTask)
        }

        window.addEventListener('resize', lazyLoadTask)
        window.addEventListener('orientationchange', lazyLoadTask)
        lazyLoadTask()
      }
    },
  }

  function updateImage (lazyImage) {
    lazyImage.src = lazyImage.dataset.src
    lazyImage.srcset = lazyImage.dataset.srcset || ''
    lazyImage.classList.remove('lazy')
  }

  function updateVideo (lazyVideo) {
    for (let source in lazyVideo.children) {
      let videoSource = lazyVideo.children[source]
      if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
        videoSource.src = videoSource.dataset.src
      }
    }
    lazyVideo.load()
    lazyVideo.classList.remove('lazy')
  }

  function doUpdate (target) {
    if (target) {
      if (target.tagName === 'IMG') {
        updateImage(target)
      } else if (target.tagName === 'VIDEO') {
        updateVideo(target)
      }
    }
  }

  function lazyLoadTask () {
    if (active === false) {
      active = true
      setTimeout(() => {
        lazyResources.forEach((lazyResource) => {
          if ((lazyResource.getBoundingClientRect().top <= window.innerHeight
            && lazyResource.getBoundingClientRect().bottom >= 0)
            && getComputedStyle(lazyResource).display !== 'none') {
            doUpdate(lazyResource)

            lazyResources = lazyResources.filter((image) => {
              return image !== lazyResource
            })

            if (lazyResources.length === 0) {
              document.removeEventListener('scroll', lazyLoadTask)
              window.removeEventListener('resize', lazyLoadTask)
              window.removeEventListener('orientationchange', lazyLoadTask)
            }
          }
        })

        active = false
      }, 200)
    }
  }
}