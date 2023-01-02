# vue2技巧

## require.context

```js
// src/main.js

// 自动加载components目录下的 .vue 结尾的文件 第二参数是是否查询其子目录
const requireComponent = require.context('@/components', true, /.vue$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const component = componentConfig.default || componentConfig
  // 全局注册, 先取组件的name, 没有取定义组件的文件名
  Vue.component(component.name || fileName.replace(/(^.\/)|(\/index.vue$)/g, ''), component)
})
```

## 常见指令
