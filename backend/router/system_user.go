package router

import "github.com/gin-gonic/gin"

type SystemUserRouter struct{}

func (r *SystemUserRouter) InitSystemUserRouter(Router *gin.RouterGroup) {
	router := Router.Group("user")
	{
		router.GET("get_info", systemUserHandler.GetUserInfo)
	}
}
