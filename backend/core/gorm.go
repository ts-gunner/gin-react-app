package core

import (
	"fmt"

	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/schema"
	"gorm.io/gorm"
)

func Gorm() *gorm.DB {
	switch global.SBG_CONFIG.System.DbType {
	case "mysql":
		return GormMysql()
	case "pgsql":
		return GormPgsql()
	case "mssql":
		return GormMssql()
	case "sqlite":
		return GormSqlite()
	default:
		return GormMysql()
	}
}

func RegisterTables() {
	db := global.SBG_DB

	err := db.AutoMigrate(
		schema.SystemUser{},
		schema.SystemDomain{},
		schema.UserDomain{},
	)
	if err != nil {
		fmt.Println("migrate database tables failed:", err)
		panic(err)
	}

}
