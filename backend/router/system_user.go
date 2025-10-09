package router

import "github.com/gin-gonic/gin"

type SystemUserRouter struct{}

func (r *SystemUserRouter) InitSystemUserRouter(Router *gin.RouterGroup) {
	router := Router.Group("user")
	{
		router.GET("get_info", systemUserHandler.GetUserInfo)
		router.POST("add", systemUserHandler.AddSystemUser)
		router.POST("get_page", systemUserHandler.GetSystemUserPageData)
	}
}
