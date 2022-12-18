module.exports = {
    title: '前端笔记',
    base: '/',
    description: '常用功能记录',
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }]
      ],
      port: 8080,
    themeConfig: {
        siteTitle: false,
        logo: "/logo.png",
        nav: [
          { text: "指南", link: "/guild/installation" },
          { text: "组件", link: "/examples/button/" },
          { text: "组件2", items: [
            { text: "指南", link: "/guild/installation" },
            { text: "组件", link: "/examples/button/" },
          ] },
        ],
        // sidebar: [
        //     '/',
        //     '/page-a',
        //     ['/page-b', 'Explicit link text'],
        //     {
        //         title: 'Group 1',
        //         collapsable: false,
        //         children: [
        //           '/'
        //         ]
        //       },
        //   ],
        socialLinks: [{ icon: "github", link: "https://gitee.com/geeksdidi" }],
      },
  }