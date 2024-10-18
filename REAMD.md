# sbdeps

## 项目结构


```
sbdeps/
├── cmd/
│   └── sbdeps/
│       └── main.go
├── internal/
│   ├── api/
│   │   ├── handler.go
│   │   └── router.go
│   ├── tasks/
│   │   └── scheduler.go
│   └── service/
│       └── logic.go
├── web/
│   ├── static/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   └── templates/
│       └── index.html
├── pkg/
│   └── utils/
│       └── helpers.go
├── go.mod
└── .gitignore

```

cmd/sbdeps/: 包含项目的入口文件 main.go。
internal/api/: 包含 API 的路由和处理函数。
handler.go: 定义 API 的处理逻辑。
router.go: 设置路由。
internal/tasks/: 包含定时任务的相关代码。
scheduler.go: 定义和管理定时任务。
internal/service/: 包含业务逻辑。
logic.go: 实现具体的业务逻辑。
web/static/: 存放静态资源（CSS、JS、图像等）。
web/templates/: 存放 HTML 模板文件。
pkg/utils/: 包含通用的工具函数。
go.mod: Go 模块文件。
.gitignore: Git 忽略文件。