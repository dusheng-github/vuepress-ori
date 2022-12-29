
# [Animate.css](https://animate.style) 体验

<DemoContainer title="示例： Animate.css动画演示" >
  <AnimateShow ></AnimateShow>
</DemoContainer>

# Animate 安装和使用

`npm` 安装
```bash
npm install animate.css
```

`yarn` 安装
```bash
yarn add animate.css
```

`cdn` 引入
```html
<head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
</head>
```

使用 `animate__animated animate__${动画名称}` [动画名称](https://animate.style/#attention_seekers)
```html
<h1 class="animate__animated animate__bounce">An animated element</h1>
```