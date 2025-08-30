package router

import "github.com/gin-gonic/gin"

type HomeRouter struct{}

func (_ *HomeRouter) InitHomeRouter(Router *gin.RouterGroup) {

	rg := Router.Group("overview")
	rg.GET("app_info", homeHandler.GetAppInfo) // 获取系统信息
}
