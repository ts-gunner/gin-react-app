package router

import "github.com/gin-gonic/gin"

type InitRouter struct{}

func (_ *InitRouter) InitProjectRouter(Router *gin.RouterGroup) {

	initRouter := Router.Group("init")
	{
		// 项目初始化，初始化管理员账号密码和数据库
		initRouter.POST("init_project", iniHandler.InitProject)
	}
}
