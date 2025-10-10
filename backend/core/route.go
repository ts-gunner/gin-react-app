package core

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "github.com/ts-gunner/steins-backend-go/docs"
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/middleware"
	"github.com/ts-gunner/steins-backend-go/model/response"
	"github.com/ts-gunner/steins-backend-go/router"
)

func initRouter() *gin.Engine {
	r := gin.New()
	r.Use(middleware.RequestLog())
	r.Use(gin.Recovery())
	set := router.RouterSet
	contextGroup := r.Group(global.SBG_CONFIG.System.ContextPath)
	authGroup := r.Group(global.SBG_CONFIG.System.ContextPath, middleware.IdentityVerification()) // 需要鉴权的路由
	{
		contextGroup.GET("/health_check", func(c *gin.Context) {
			response.Ok(c)
		})
		contextGroup.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
	{
		set.InitHomeRouter(contextGroup)
		set.InitProjectRouter(contextGroup)
		set.InitAuthRouter(contextGroup)
	}
	{
		set.InitSystemUserRouter(authGroup)
		set.InitSystemDomainRouter(authGroup)
	}
	return r
}
