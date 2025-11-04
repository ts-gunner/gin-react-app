package controller

import "github.com/ts-gunner/steins-backend-go/services"

var AppHandler = new(Controller)

type Controller struct {
	HomeHandler
	InitHandler
	AuthHandler
	SystemUserHandler
	SystemDomainHandler
}

// 注册service
var (
	initService   = services.AppService.InitService
	userService   = services.AppService.SystemUserService
	authService   = services.AppService.AuthService
	domainService = services.AppService.SystemDomainService
)
