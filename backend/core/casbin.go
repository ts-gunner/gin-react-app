package core

//import (
//	"fmt"
//
//	"github.com/casbin/casbin/v2"
//	gormadapter "github.com/casbin/gorm-adapter/v3"
//	"github.com/ts-gunner/steins-backend-go/global"
//)

//func InitCasbinAdapter() (*gormadapter.Adapter, error) {
//	adapter, err := gormadapter.NewAdapterByDB(global.SBG_DB)
//	if err != nil {
//		fmt.Println("casbin gorm适配器初始化失败:" + err.Error())
//		return nil, err
//	}
//
//	casbin.NewEnforcer(global.RABC_MODEL, adapter)
//	return adapter, nil
//}
