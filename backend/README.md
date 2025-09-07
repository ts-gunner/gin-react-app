
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
| zap  |  go.uber.org/zap |    日志框架     |


## 生成swagger文档

`go install github.com/swaggo/swag/cmd/swag@latest`

`swag init`

访问文档： `http://{host}:{port}/{context_path}/swagger/index.html`

生成接口文档的地址：`http://{host}:{port}/{context_path}/swagger/doc.json`

前端使用umijs的openapi, 可以直接生成接口


swagger的使用：

main函数中添加注释
```go

// @title           Swagger Example API
// @version         1.0
// @description     This is a sample server celler server.

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io
func main() {
	initializeSystem()
	core.RunServer()

}
```

handler函数

```go

// @Summary      say hello world
// @Description  return hello world json format content
// @param       name query    string  true  "name"
// @Tags         system
// @Produce      json
// @Router       /ping [get]
func Ping(ctx *gin.Context) {
    ctx.JSON(200, gin.H{
    "message": fmt.Sprintf("Hello World!%s", ctx.Query("name")),
    })
}
```



## FAQ

1. 创建表结构时，如果需要创建index索引，需要显式指定index name，否则在gorm的AutoMigrate会报错，会重复创建index索引。

例如： Account添加索引，指定index name为`idx_user_account`
```go

type SystemUser struct {
	UserId   int64  `json:"uid" gorm:"primaryKey;column:uid;type:bigint;not null;comment:用户id"`
	Account  string `json:"account" gorm:"index:idx_user_account;column:account;not null;comment:用户账号"`
	Password string `json:"pwd" gorm:"column:pwd;not null;comment:密码"`
	OpenId   string `json:"open_id" gorm:"column:openid;comment:小程序唯一标识id"`
	UnionId  string `json:"union_id" gorm:"column:unionid;comment:开放平台id"`
	Nickname string `json:"nickname" gorm:"column:nickname;not null;comment:用户昵称"`
	Email    string `json:"email" gorm:"column:email;comment:邮箱"`
	Phone    string `json:"phone" gorm:"column:phone;not null;comment:手机号码"`
	BaseSchema
}

```