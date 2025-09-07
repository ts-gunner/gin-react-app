package main

import (
	"github.com/ts-gunner/steins-backend-go/core"
	"github.com/ts-gunner/steins-backend-go/global"
)

// @title Gin Swagger Demo API
// @version 1.0
// @description This is a sample server for Gin Swagger.
func main() {
	initializeSystem()
	core.RunServer()

}

func initializeSystem() {
	// 将配置文件设置到全局变量中
	global.SBG_VP = core.InitViperConfig()
	global.SBG_DB = core.Gorm()
	global.LOGGER = core.InitZapLogger()
	global.SBG_ID_CREATOR = core.InitIDCreator()
	if global.SBG_DB != nil {
		core.RegisterTables() // 初始化表
	}

}
