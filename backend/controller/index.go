package controller

var AppHandler = new(Controller)

type Controller struct {
	HomeHandler
	InitHandler
}

// 注册service
var ()
