const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  title: "前端笔记",
  base: "/vuepress/",
  description: "常用功能记录",
  head: [["link", { rel: "icon", href: `/logo.png` }]],
  port: 8080,
  themeConfig: {
    siteTitle: false,
    logo: "/logo.png",
    nav: [
      {
        text: "html-js",
        items: [
          { text: "html", link: "/html/" },
          { text: "css", link: "/css/" },
          { text: "js",  link: "/js/" },
        ],
      },
      { text: "uniapp", link: "/uniapp/" },
      { text: "vue", link: "/vue/" },
      { text: "react", link: "/react/" },
      { text: "微信小程序", link: "/wxMini/" },
      { text: "面试", link: "/audition/" },
      { text: "性能优化", link: "/performance/" },
      { text: "webpack", link: "/webpack/" },
      {  text: "其他技术",
      items: [
                { text: "echarts",  link: "/echarts/" },
        { text: "nodejs",  link: "/nodejs/" },
        { text: "typescript",  link: "/typescript/" },
        { text: "git & svn",  link: "/gitSvn/" },
        { text: "jquery", link: "/jquery/" },
        { text: "vite", link: "/vite/" },
        { text: "nginx",  link: "/nginx/" },
        { text: "flutter",  link: "/flutter/" },
        { text: "react native",  link: "/react native/" },
        { text: "vs code插件和配置",  link: "/vsCode/" },
        { text: "数据库的连接",  link: "/db/" },
        { text: "前端部署",  link: "/devOps/" },
      ],
    },
      {  text: "组件 & 库",
      items: [
        { text: "组件", link: "/components/" },
        { text: "插件", link: "/plugins/" },
        { text: "常用npm库",  link: "/npm/" },
      ],
    },
      {  text: "高级前端",
      items: [
        { text: "设计模式", link: "/designMode/" },
        { text: "解决方案", link: "/method/" },
        { text: "前端工程化", link: "/cli/" },
      ],
    },
    {  text: "链接",
    items: [
      { text: "我的博客hexo", link: "https://ds-web.top" },
      { text: "我的博客csdn", link: "https://blog.csdn.net/dusehngcsdn?spm=1000.2115.3001.5343/" }, 
      { text: "我的github", link: "https://github.com/dusheng-github" }, 
      { text: "我的npm", link: "https://www.npmjs.com" }, 
    ]
  },
    ],
    sidebar: {
      "/html/": [{
        title: "html--",
        path: '/html/',
        collapsable: false,
        children: ["one", "two", "three"],
      }],
      "/css/": [{
        title: "css综合",
        path: '/css/',
        collapsable: false,
        children: ["one"],
      },
      {
        title: "css常用动画",
        path: '/css/',
        collapsable: false,
        children: ["animate", "loading", 'animateCss'],
      }
    ],
      "/js/": [{
        title: "js",
        path: '/js/',
        collapsable: false,
        children: [""],
      }],
      "/uniapp/": [{
        title: "uniapp指南",
        path: '/uniapp/',
        collapsable: false,
        children: [""],
      }],
      "/react/": [{
        title: "react",
        path: '/react/',
        collapsable: false,
        children: [""],
      }],
      
      "/vue/": [{
        title: "vue",
        path: '/vue/',
        collapsable: false,
        children: [""],
      }],
      "/wxMini/": [{
        title: "wxMini",
        path: '/wxMini/',
        collapsable: false,
        children: [""],
      }],
      "/audition/": [{
        title: "audition",
        path: '/audition/',
        collapsable: false,
        children: [""],
      }],
      "/performance/": [{
        title: "performance",
        path: '/performance/',
        collapsable: false,
        children: [""],
      }],
      "/webpack/": [{
        title: "webpack",
        path: '/webpack/',
        collapsable: false,
        children: [""],
      }],
      "/jquery/": [{
        title: "jquery",
        path: '/jquery/',
        collapsable: false,
        children: [""],
      }],
      "/vite/": [{
        title: "vite",
        path: '/vite/',
        collapsable: false,
        children: [""],
      }],
      "/nginx/": [{
        title: "nginx",
        path: '/nginx/',
        collapsable: false,
        children: [""],
      }],
      "/flutter/": [{
        title: "flutter",
        path: '/flutter/',
        collapsable: false,
        children: [""],
      }],
      "/react native/": [{
        title: "react native",
        path: '/react native/',
        collapsable: false,
        children: [""],
      }],
      "/devOps/": [{
        title: "devOps",
        path: '/devOps/',
        collapsable: false,
        children: [""],
      }],
      "/components/": [{
        title: "常用组件封装",
        path: '/components/',
        collapsable: false,
        children: [""],
      }],
      "/plugins/": [{
        title: "常用插件",
        path: '/plugins/',
        collapsable: false,
        children: [""],
      }],
      "/npm/": [{
        title: "npm库",
        path: '/npm/',
        collapsable: false,
        children: [""],
      }],
      
    },
    plugins: [],
    markdown: {},
    postcss: [require('autoprefixer')],
    configureWebpack: {
      resolve: {
          alias: {
              '@/utils': resolve(__dirname, '../../utils/'),
             }
         },
         node: {
          global: true,
          process: true
        },
     },
    sass: { indentedSyntax: true },
    scss: {
        includePaths: ["./public/scss/index.scss", "./public/scss/_variable.scss", './public/scss/demo.scss',  './public/scss/loading.scss']
    },
    socialLinks: [{ icon: "github", link: "https://gitee.com/geeksdidi" }],
  },
};
