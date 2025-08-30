package main

import (
	"github.com/ts-gunner/steins-backend-go/core"
	"github.com/ts-gunner/steins-backend-go/global"
)

func main() {
	initializeSystem()
	core.RunServer()
}

func initializeSystem() {
	// 将配置文件设置到全局变量中
	global.SBG_VP = core.InitViperConfig()
	global.SBG_DB = core.Gorm()
	if global.SBG_DB != nil {
		core.RegisterTables() // 初始化表
	}
}
