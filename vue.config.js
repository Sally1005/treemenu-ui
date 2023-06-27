module.exports = {
    devServer : {
        proxy: {
            "/sys/user": {
                target: "http://localhost:8081",
                ws: true, // 如果要代理 websockets，配置这个参数
                changeOrigin: true, // 跨域开关
            },
            // '/mock':{
            //     target: 'http://localhost:8080',
            //     ws: true,
            //     changeOrigin: true,
            // }
        }
    }
}

