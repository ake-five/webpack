//public/config.js 除了以下的配置之外，这里面还可以有许多其他配置，例如,pulicPath 的路径等等
module.exports = {
    defaultMicroApp:'/webpack/reactdome1',
    development: {
        publicPath:'/',
        template: {
            title: '主应用-dev',
            header: false,
            footer: false
        },
        microApps: [
            // {
            //     name: '微应用dome1', // app已经注册的名字
            //     entry: '//localhost:3001',  // 进入的主机端口号
            //     activeRule: '/webpack/reactdome1',  // 找到微应用的路径
            // },
            // {
            //     name: '微应用dome2', // app已经注册的名字
            //     entry: '//localhost:3002',  // 进入的主机端口号
            //     activeRule: '/webpack/micorApp-vue',  // 找到微应用的路径
            // },
            {
                name: '微应用dome1', // app已经注册的名字
                entry: '//ake-five.github.io/react-manage',  // 进入的主机端口号
                activeRule: '/webpack/reactdome1',  // 找到微应用的路径
            },
            {
                name: '微应用dome2', // app已经注册的名字
                entry: '//ake-five.github.io/micorApp-vue/',  // 进入的主机端口号
                activeRule: '/webpack/micorApp-vue',  // 找到微应用的路径
            },
        ]
    },
    production: {
        publicPath:undefined,
        template: {
            title: '应用集成平台',
            header: true,
            footer: false
        },
    }
}
