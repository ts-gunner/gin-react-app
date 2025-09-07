package controller

import "github.com/ts-gunner/steins-backend-go/services"

var AppHandler = new(Controller)

type Controller struct {
	HomeHandler
	InitHandler
}

// 注册service
var (
	initService = services.AppService.InitService
)
