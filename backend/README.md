
## 项目介绍

使用go重写java后端项目

符合项目结构以及开发规范的web开发项目

## 快速开始

`go generate`

`go run main.go`


## 笔记
每个目录，若有index.go，即是该package的入口文件

目录解释：
- router: --> 路由映射
- controller --> 控制层，对应go的Handler方法
- config --> 配置
- core --> 启动程序以及初始化准备的核心代码
- global --> 项目全局变量
    - constants --> 全局常量
    - global --> 初始化的全局变量


## 部署



## go依赖


|  package   |  origin  |   remark    |
|:----------:|:--------:|:-----------:|
|    gin     |github.com/gin-gonic/gin |  go web框架   |
| viper | github.com/spf13/viper | 读取配置文件，支持监听 |


## 生成swagger文档

`go install github.com/swaggo/swag/cmd/swag@latest`

`swag init`

访问文档： `http://{host}:{port}/{context_path}/swagger/index.html`

生成接口文档的地址：`http://{host}:{port}/{context_path}/swagger/doc.json`

前端使用umijs的openapi, 可以直接生成接口

