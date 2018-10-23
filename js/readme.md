# JavaScript

## 复制选中文字到剪贴板

```js
// 假设选中的文字存储在 selectedString
const input = document.createElement('input')
document.body.appendChild(input)
input.setAttribute('value', selectedString)
input.select()
document.execCommand('copy')
// 做些事情，比如提示'已复制'
input.remove()
```

// TODO: 选中其它内容呢