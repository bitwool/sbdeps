package main

import (
	"fmt"
	"time"

	"github.com/go-co-op/gocron"
)

// StartScheduler 初始化并启动定时任务调度器
func StartScheduler() {
	// 创建 gocron 调度器
	s := gocron.NewScheduler(time.UTC)

	// 启动时立即执行一次任务
	runTask()

	// 设置任务每天执行一次
	s.Every(1).Day().Do(runTask)

	// 启动调度器
	s.StartAsync()
}

// runTask 定义任务逻辑
func runTask() {
	fmt.Println("定时任务执行中...")
}
