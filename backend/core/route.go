package core

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "github.com/ts-gunner/steins-backend-go/docs"
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/model/response"
	"github.com/ts-gunner/steins-backend-go/router"
)

func initRouter() *gin.Engine {
	r := gin.New()
	r.Use(gin.Recovery())
	set := router.RouterSet
	contextGroup := r.Group(global.SBG_CONFIG.System.ContextPath)
	{
		contextGroup.GET("/health_check", func(c *gin.Context) {
			response.Ok(c)
		})
		contextGroup.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}
	{
		set.InitHomeRouter(contextGroup)
		set.InitProjectRouter(contextGroup)
	}
	return r
}
