package router

import "github.com/gin-gonic/gin"

type InitRouter struct{}

func (_ *InitRouter) InitProjectRouter(Router *gin.RouterGroup) {

	initRouter := Router.Group("init")
	{
		initRouter.POST("init_project", initHandler.InitProject)
		initRouter.GET("check", initHandler.CheckNeedInit)
		initRouter.POST("test_db_connection", initHandler.TestDBConnection)

	}
}
