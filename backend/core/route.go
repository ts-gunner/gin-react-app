package core

import (
	"github.com/gin-gonic/gin"
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/router"
)

func initRouter() *gin.Engine {
	r := gin.Default()

	set := router.RouterSet
	contextGroup := r.Group(global.SBG_CONFIG.System.ContextPath)
	{
		set.InitHomeRouter(contextGroup)
	}
	return r
}
