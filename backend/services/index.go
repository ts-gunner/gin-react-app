package services

var AppService = new(ServiceGroup)

type ServiceGroup struct {
	InitService
	SystemUserService
	AuthService
}
