package router

import "github.com/ts-gunner/steins-backend-go/controller"

var RouterSet = new(RouterGroup)

type RouterGroup struct {
	HomeRouter
	InitRouter
}

var (
	homeHandler = controller.AppHandler.HomeHandler
	initHandler = controller.AppHandler.InitHandler
)
