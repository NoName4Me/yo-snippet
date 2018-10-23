# performance

## 懒加载（图片/视频）

```html
<img class="lazy" src="default.png" data-src="true-image.png" data-srcset="true-image-2x.png 2x, true-image.png 1x">
```

```js
import lazyLoad from './lazy-load.js'

lazyLoad().observe()

```