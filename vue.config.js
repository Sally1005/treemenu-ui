module.exports = {
    devServer : { // onBeforeSetupMiddleware : require('./mock/index.js'),
        proxy: {
            "/treeMenu": {
                target: "http://localhost:8080",
                ws: true, // 如果要代理 websockets，配置这个参数
                changeOrigin: true, // 跨域开关
            }
        }
    }
}
