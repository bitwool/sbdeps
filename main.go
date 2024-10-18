package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// 静态文件路由
	r.Static("/static", "./static")

	// 路由处理
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "My Gin App",
		})
	})

	// 加载模板文件
	r.LoadHTMLGlob("templates/*")

	// 启动服务
	r.Run(":8080")
}
