# uniapp

## 前端常用 ui

| 平台      | react                                                                        | vue                                                                                                                                                                                                                       |
| --------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pc        | [antd](https://ant.design/components/overview-cn/)                           | [element](https://element.eleme.cn/#/zh-CN/component/installation) [iview](https://www.iviewui.com/view-ui-plus/component/base/button)                                                                                    |
| 移动端 h5 | -                                                                            | [vant-ui](https://vant-ui.github.io/vant/#/zh-CN/)                                                                                                                                                                        |
| 小程序    | [taro](https://taro-docs.jd.com/docs/components/viewContainer/share-element) | [uniapp](https://vant-ui.github.io/vant/#/zh-CN/) [vant weapp](https://youzan.github.io/vant-weapp/#/button) [iview weapp](https://weapp.iviewui.com/docs/guide/start) [color-ui](https://github.com/weilanwl/coloruicss) |
| 跨平台    | -                                                                            | [uniapp](https://vant-ui.github.io/vant/#/zh-CN/) [uni-ui](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html) [uView](https://www.uviewui.com/components/quickstart.html)                                          |

## uniapp 引入`vant-ui` 和 `vant weapp`

### uniapp > h5 引入`vant-ui`

:::warning
只做 h5 的话, 没必要用 uniapp
:::

1.下载和安装

```bash
npm i vant -S --production
&
yarn add vant --production
```

2.main.js 引入 vant

```javascript
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);
```

3.App.vue 的 style 中引入样式

```css
<style>
@import "~@/vant/lib/index.css";
</style>
```

### uniapp > 小程序引入`vant weapp`

1.引入

- 在项目中新建文件夹 wxcomponents --> vant
- 将 vant Weapp 下载到本地
- 解压后，将 dist 文件夹拷贝到 vant 目录中

  2.使用

- 在 App.vue 中的 style 引入
- @import "/wxcomponents/vant/dist/common/index.wxss";
- 引用和使用（两种方法）

```js
// 页面引入 page.json
{
    "path": "pages/index/index",
    "style": {
        "usingComponents": {
            "van-button": "/wxcomponents/vant/dist/button/index",
        }
    }
}
// 全局引入
{
    "globalStyle": {
            ...
        "usingComponents": {
        "van-action-sheet": "/wxcomponents/vant/dist/action-sheet/index",
         "van-button": "/wxcomponents/vant/dist/button/index",
        }
    }
}
```

```javascript
//页面中使用
<van-button type="danger">危险按钮</van-button>
复制代码
//页面中引用
import vanButton from '@/wxcomponents/vant/dist/button/index'
components:{
    vanButton
},
//页面中使用
<van-button type="danger">危险按钮</van-button>
```

### cli 创建项目和 HBuilderX 可视化界面创建项目的区别

:::warning
HBuilderX 可以编辑和运行 cli 项目
其他项目无法运行 HBuilderX 创建的 uniapp 项目, 只能使用 cli 模式
:::

- cli 创建的项目，是传统的 node 项目结构。工程代码在 src 目录下，编译器在项目下，编译结果在 dist 目录下。
  ![图片](/images/cli.png)
- HBuilderX 可视化创建的项目，是一种免 node 开发概念。工程代码在项目目录下，编译器在 HBuilderX 目录下而不是项目下，编译结果在项目的 unpackage 目录下。

```bash
┌─uniCloud              云空间目录，阿里云为uniCloud-aliyun,腾讯云为uniCloud-tcb（详见uniCloud）
│─components            符合vue组件规范的uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─utssdk                存放uts文件
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用的本地静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─uni_modules           存放[uni_module](/uni_modules)。
├─platforms             存放各平台专用页面的目录，详见
├─nativeplugins         App原生语言插件 详见
├─nativeResources       App端原生资源目录
│  └─android            Android原生资源目录 详见
├─hybrid                App端存放本地html文件的目录，详见
├─wxcomponents          存放小程序组件的目录，详见
├─unpackage             非工程代码，一般存放运行或发行的编译结果
├─AndroidManifest.xml   Android原生应用清单文件 详见
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
├─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
└─uni.scss              这里是uni-app内置的常用样式变量
```

### http 请求封装

#### `axios`

```bash
yarn add axios
```

```js
// http.js
import axios from "axios";

const http = axios.create({
  timeout: 50000, // 请求超时时间
  baseURL: "https://xxx.com",
  withCredentials: true, //跨域请求携带cookie
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.defaults.adapter = function (config) {
  console.log(config, "config");
  return new Promise((resolve, reject) => {
    let settle = require("axios/lib/core/settle");
    let buildURL = require("axios/lib/helpers/buildURL");
    uni.request({
      method: config.method.toUpperCase(),
      url:
        config.baseURL +
        buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config,
        };
        settle(resolve, reject, response);
      },
    });
  });
};
```

#### `uni.request`

```js
import store from '@/store/index.js'

const base_url = {
	DEV: 'http://dev.com'   // 开发环境地址
	PROD: 'http://prod.com', // 生产环境地址
}
const config = {
  timeout: 10000,
}
const showToast = (title) => {
    uni.showToast({
        title: title,
        icon: 'none'
    })
}
const request = (obj) => {
	obj.url = obj.url || '';
	obj.method = obj.method || 'GET';
	obj.data = obj.data || {};
	obj.header = obj.header || 'application/json';
	obj.loading = obj.loading === false ? false : true;
	let token = store.getters.token || ''; // 登录获得的 token
        let loadingStatus = true;
	setTimeout(()=>{
            if (loadingStatus && obj.loading) {
                uni.showLoading({
                        title:'加载中',
                        mask: true
                })
            }
	}, 800) // 800毫秒后如果loadingStatus === false 则表示请求返回了，不显示loading
	return new Promise((resolve, reject) => {
		uni.request({
            ...config,
			url: (process.env.NODE_ENV === 'development' ? base_url.DEV : base_url.PROD) + obj.url,
			method: obj.method,
			data: obj.data,
			header: {
                    'TOKEN': token,
                    'Content-Type': obj.header
			},
			success: res => { // 服务器成功返回的回调函数
                            if (res.statusCode === 200) {
				let result = res.data;
				if (result.code === "000000") { // 跟后端约定的成功code
                                    resolve(result);
                                    return;
                                }else if(result.code === 40005){ // 登录过期的code
                                    store.dispatch('user/logout'); // 清空token
                                    reject(result);
                                    uni.redirectTo({
                                        url: '/pages/index/index'
                                    })
                                    uni.showModal({
                                        showCancel: false,
                                        content: '登录过期',
                                        success: function (res) {}
                                    });
                                    return;
                                }else if(result.code === 50009){ // 其他报错的code
                                    loadingStatus = false
                                    showToast(result.msg);
                                    reject(result);
                                    return;
                                }
				reject(result);
                            } else { // 返回值非 200，强制显示提示信息
                                loadingStatus = false
                                showToast('[' + res.statusCode + '] 系统处理失败');
                                reject('[' + res.statusCode + '] 系统处理失败');
                            }
			},
			fail: (err) => { // 接口调用失败的回调函数
                            if (err.errMsg != 'request:fail abort') {
                                loadingStatus = false
                                showToast('连接超时，请检查您的网络。');
                                reject('连接超时，请检查您的网络。');
                            }
			},
			complete: () => {
                            if (loadingStatus && obj.loading) {
                              uni.hideLoading()
                              loadingStatus = false
                            }
			}
		})
	})
}

export default request

```
