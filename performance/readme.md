# performance

## 懒加载（图片/视频）

```js
import lazyLoad from './lazy-load.js'

lazyLoad().observe()
// observe(selector, scrollBox)
//   @selector: 默认 '.lazy'
//   @scrollBox: 懒加载监听的滚动盒，默认 document
```

```html
<img class="lazy" src="default.png" data-src="true-image.png" data-srcset="true-image-2x.png 2x, true-image.png 1x">

<video class="lazy" autoplay loop playsinline width="375" height="127" poster="the-poster.jpg">
  <source data-src="true-video.webm">
  <source data-src="true-video.mp4">
</video>
```