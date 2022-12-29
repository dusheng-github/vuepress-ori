# npm常见库使用 

## nvm库的使用
::: warning 为什么要用nvm?
nvm顾名思义, 就是node版本控制器, 通过操作可以切换不同的node版本, 此时的nodejs文件夹其实是软链nvm当前的node版本
:::

### 下载

::: warning 注意
下载前请将本地的node卸载干净!!!
:::


[下载地址](https://github.com/coreybutler/nvm-windows/releases)

### 使用命令

```js
nvm -v // 查看当前nvm版本
nvm list available // 查看当前可下载的node版本
nvm install 14.20.1 // 安装14.20.1版本的nodejs
nvm list // 查看所有可切换的node版本
nvm use 14.20.1 // 切换node到14.20.1版本
```

### 其他命令
- nvm arch：显示node是运行在32位还是64位。
- nvm install [version] [arch] ：安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务 器的SSL。
- nvm list [available] ：显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。
- nvm on ：开启node.js版本管理。
- nvm off ：关闭node.js版本管理。
- nvm proxy [url] ：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。
- nvm node_mirror [url] ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
- nvm npm_mirror [url] ：设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
- nvm uninstall [version] ：卸载指定版本node。
- nvm use [version] [arch] ：使用制定版本node。可指定32/64位。
- nvm root [path] ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。
- nvm version ：显示nvm版本。version可简化为v。

### nvm 常见问题
如果下载node过慢，请更换国内镜像源, 在 nvm 的安装路径下，找到 settings.txt(C:\Users\[用户名]\AppData\Roaming\nvm)，设置node_mirro与npm_mirror为国内镜像地址。下载就飞快了~~

```bash
root: D:\nvm
path: D:\nodejs

node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```