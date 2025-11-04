package router

import "github.com/ts-gunner/steins-backend-go/controller"

var RouterSet = new(RouterGroup)

type RouterGroup struct {
	HomeRouter
	InitRouter
	AuthRouter
	SystemUserRouter
	SystemDomainRouter
}

var (
	homeHandler         = controller.AppHandler.HomeHandler
	initHandler         = controller.AppHandler.InitHandler
	authHandler         = controller.AppHandler.AuthHandler
	systemUserHandler   = controller.AppHandler.SystemUserHandler
	systemDomainHandler = controller.AppHandler.SystemDomainHandler
)
