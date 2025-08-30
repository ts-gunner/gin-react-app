package core

import (
	"github.com/ts-gunner/steins-backend-go/config"
	"github.com/ts-gunner/steins-backend-go/global"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GormSqlite() *gorm.DB {
	return initSqlite(global.SBG_CONFIG.Sqlite)
}

func initSqlite(s config.Sqlite) *gorm.DB {
	if s.DbName == "" {
		return nil
	}
	if db, err := gorm.Open(sqlite.Open(s.Dsn()), &gorm.Config{}); err != nil {
		panic(err)
	} else {
		sqlDB, _ := db.DB()
		sqlDB.SetMaxIdleConns(s.MaxIdleConns)
		sqlDB.SetMaxOpenConns(s.MaxOpenConns)
		return db
	}
}
