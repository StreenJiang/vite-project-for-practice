// 导入需要使用的类型和库
import { spawn } from 'child_process'
import fs from 'fs'

// 导出Vite插件函数
export const viteElectronDev = () => {
    return {
        name: 'vite-electron-dev',
        // 在configureServer中实现插件的逻辑
        configureServer(server) {
            // 监听Vite的HTTP服务器的listening事件
            server?.httpServer?.once('listening', () => {
                // 获取HTTP服务器的监听地址和端口号
                const addressInfo = server?.httpServer?.address()
                const IP = `http://localhost:${addressInfo.port}`
                // 启动Electron进程
                let electronProcess = spawn(require('electron'), ['./electron/main.js', IP])

                // 监听主进程代码的更改
                fs.watchFile('./electron/main.js', () => {
                    // 杀死当前的Electron进程
                    electronProcess.kill()
                    // 重新启动Electron进程
                    electronProcess = spawn(require('electron'), ['./electron/main.js', IP])
                })

                // 监听Electron进程的stdout输出
                electronProcess.stdout?.on('data', (data) => {
                    console.log(`日志: ${data}`);
                });
            })
        }
    }
}
