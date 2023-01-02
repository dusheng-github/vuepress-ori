# 解决方案
## 后台管理系统模板
## 鉴权
## 防止重复提交
## 枚举的设置

## 跨域

### 什么是跨域?

指的是浏览器不能执行其他网站的脚本。是由浏览器的`同源策略`造成的，是浏览器对js施加的安全限制

### 什么是同源策略？
同源是指协议，域名，端口相同。当页面在执行一个脚本时会检查访问的资源是否同源。非同源，请求数据时，浏览器会在控制台中报一个异常，拒绝访问。

<el-image src="/images/kuayu.png" :preview-src-list="['/images/kuayu.png']"></el-image>

| 当前页面的url | 请求页面的url | 是否跨域 | 原因 |
| --- | --- | --- | --- |
|http://www.test.com/ | http://www.test.com/index.html | 否 | 同源（协议、域名、端口号相同）|
|http://www.test.com/ |	https://www.test.com/index.html | 是 | 	协议不同（http/https）|
|http://www.test.com/ | http://www.baidu.com/ | 是 | 	主域名不同（test/baidu) |
|http://www.test.com/ | http://blog.test.com/ | 是 | 子域名不同（www/blog）|
|http://www.test.com:8080/ | http://www.test.com:7001/ | 是 | 端口号不同（8080/7001）|

### 跨域的解决方案

#### 1. jsonp
这种方法是浏览器会借助script这个标签去访问其他服务器的资源, 达到传参的目的, 因为浏览器的script标签路径不会做拦截和校验. 一般前端会定义参数和回调函数, 然后组装到url上作为script.src, src指向的服务器会做处理, 执行回调函数并传值
```js
// http://localhost:9990/jsonp.js
foo({ a: 1221 });
```
```html
<!-- http://localhost:8888/test.html-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body></body>

  <script>
    const foo = function (params) {
      alert(params);
    };
  </script>
  <script src="http://localhost:9990/jsonp.js"></script>
</html>

```
这样test.html中的就会alert({ a: 1221 })了, 这样就达到了跨域传参的效果, 也就是8888端口访问9990端口, 但是jsonp也可能造成xss攻击, 如果这个接口被别人, 也这样去用, 会导致网站信息泄露
#### 2.cors
CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。
这个其实就是后端去处理了, 反正就是放开对服务器地址的访问, 不同域名也可以访问我, 比如那种完全放开的api就是这样, 对前端的访问不做限制
服务端响应的时候添加一个 `Access-Control-Allow-Origin` 的响应头
```js
res.setHeader("Access-Control-Allow-Origin", "*")
```
#### 3.iframe + postMessage
比如a网站想和b网站做交互, 如何去实现呢, 可以用postMessage, a网站post 一个message, b网站进行一个监听, 然后处理a网站传输过来的值即可
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>我是a网站(http://localhost:999)</title>
  </head>

  <body>
    <div>
      <input id="text" type="text" value="Runoob" />
      <button id="sendMessage"></button>
    </div>
    <iframe
      id="receiver"
      src="http://127.0.0.1:5500/aaa.html"
      width="300"
      height="360"
    >
      <p>你的浏览器不支持 iframe</p>
    </iframe>
    <script>
      window.onload = function () {
        var receiver = document.getElementById("receiver").contentWindow;
        var btn = document.getElementById("sendMessage");
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          var val = document.getElementById("text").value;
          receiver.postMessage(
            "Hello " + val + "！",
            "http://127.0.0.1:5500/aaa.html"
          );
        });
      };
    </script>
  </body>
</html>

```
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>我是b网站(http://127.0.0.1:5500/aaa.htm)</title>
    <style>
      body {
        background-color: red;
        width: 900px;
        height: 400px;
      }
    </style>
  </head>

  <body>
    <div id="recMessage"></div>
    <script>
      window.onload = function () {
        var messageEle = document.getElementById("recMessage");
        window.addEventListener("message", function (e) {
          // 监听 message 事件

          // alert(e.origin);
          if (e.origin !== "http://localhost:9991") {
            // 验证消息来源地址
            return;
          }
          messageEle.innerHTML = "从" + e.origin + "收到消息： " + e.data;
        });
      };
    </script>
  </body>
</html>

```
#### 4. webpack  或者 nginx
其实这种我个人在本地开发用的比较多, 前后端分离的项目, 如果想访问后端的接口地址, 经常会碰到跨域的问题, 工程化的项目在wepack.config.js 或者 vue.config.js中的devServer.proxy配置一下后端地址即可
```js
// vue.config.js
proxy: {
    '/api':{
        //转发后的目标地址
        target:'localhost:3000',
        // 发送请求时，请求路径重写 /api/xxx ->  /xxx （去掉/api）
        pathRewrite: {
            '^/api': ''
        }
    }
}
// vue.config.js
// 全局变量 VUE_APP_BASE_API
proxy: {
    [process.env.VUE_APP_BASE_API]: {
    target: target:'localhost:3000',,
    changeOrigin: true,
    pathRewrite: {
        ['^' + process.env.VUE_APP_BASE_API]: ''
    }
    }
},

```
但是比较小的项目怎么办, 类似jquery + layui这种, 根本用不上脚手架什么的, 可以用在本地下载一个nginx, 启动nginx.exe, 然后修改一下nginx.conf, 再nginx.exe -s reload即可, 例如以下配置会导致访问localhost: 9991/api/getUser =>  http://xxxxx.cn:8085/api/getUser, 达到跨域的目的
```js
    server {
        listen       9991; // 本地开发端口, 可以开好多
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   C:\Users\xxxx\Desktop\demo; // 本地开发文件夹
            index  index.html  index.htm;
        }

        location /api { // 所有接口中带api的都会指向http://xxxxx.cn:8085/api
            
            proxy_pass http://xxxxx.cn:8085/api; 

        }
     }
```
#### 5. 关闭浏览器安全策略(粗暴不推荐)
点击chrome应用鼠标右键，选择属性–>快捷方式–>目标（空1格，将下面对应的信息复制进去，应用和确定）–> 打开chrome –> 即可实现 解除浏览器的跨域限制
<el-image src="/images/web-.png" :preview-src-list="['/images/web-.png']"></el-image>

```bash
 –args --disable-web-security --user-data-dir=D:\chrome
```
## 网站自适应

### 方案1: `rem` + `postcss-pxtorem` 方案

1. 可以在@utils文件下新建rem.js文件, 然后在src/main.js中引入`import "@/utils/rem"`

```js
// 基准大小
const baseSize = 1
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 1920 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 1920
  // 设置页面根节点字体大小, 字体大小最小为12
  const fontSize = (baseSize * Math.min(scale, 2))
  document.documentElement.style.fontSize = fontSize + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem,这里最好加上节流
window.onresize = function() {
  setRem()
}
// 行间一定写rem, 因为pxtorem不会做转行, css优先推荐px
```
2. 安装`postcss-pxtorem`库, 这样可以书写px, 该插件会转成rem(行间样式不会转换, 所以行间还是rem!!!)
```bash
yarn add postcss-pxtorem
```
3. 项目最外层新建`.postcssrc.js文件`, 内容如下

```js
module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 1, // rem = px / rootValue, 此处表示1px会转换成1rem
        propList: ['*'],
        mixPixelValue: 12,
        selectorBlackList:['.el-table'] // 限定table不转px
      }
    }
  } 
```
### 方案2: 可伸缩组件(scale)
<DemoContainer title="演示：缩放自适应(请缩放鼠标滚轮, 来模仿不同分辨率的屏幕, 红色区域的大小不会随着缩放而改变)">
  <ScaleBox>
  <div style="width: 192px; height: 96px; background: red"></div>
  </ScaleBox>
</DemoContainer>

```vue
<template>
  <div class="screen-wrapper">
    <div class="screen" id="screen">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 初始化自适应  ----在刚显示的时候就开始适配一次
    this.handleScreenAuto();
    // 绑定自适应函数   ---防止浏览器栏变化后不再适配
    window.onresize = this.handleScreenAuto;
  },
  deleted() {
    window.onresize = null;
  },
  methods: {
    // 数据大屏自适应函数
    handleScreenAuto() {
      const designDraftWidth = 1920; //设计稿的宽度
      const designDraftHeight = 960; //设计稿的高度
      // 根据屏幕的变化适配的比例
      const scaleX = document.documentElement.clientWidth / designDraftWidth;
      const scaleY = document.documentElement.clientHeight / designDraftHeight;
      // 缩放比例
      document.querySelector(
        "#screen"
      ).style.transform = `scale(${scaleX},${scaleY}) translate(-50%, -50%)`;
    }
  }
};
</script>
<style scoped lang="scss">
.screen-root {
  height: 100%;
  width: 100%;
  .screen {
    display: inline-block;
    width: 1920px; //设计稿的宽度
    height: 960px; //设计稿的高度
    transform-origin: 0 0;
    position: absolute;
    left: 50%;
    top: -50%;
  }
}
</style>
```
```js
// 使用
<ScaleBox>
  <div style="width: 192px; height: 96px; background: red"></div>
</ScaleBox>
```