package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	// 创建 Gin 引擎
	r := gin.Default()

	// 设置静态文件夹
	r.Static("/static", "./static")

	// 设置模板文件夹
	r.LoadHTMLGlob("templates/*")

	// 路由
	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", nil)
	})

	// 初始化并启动定时任务
	StartScheduler()

	// 启动 Gin 服务
	r.Run(":8080")
}
