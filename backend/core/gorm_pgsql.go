package core

import (
	"github.com/ts-gunner/steins-backend-go/config"
	"github.com/ts-gunner/steins-backend-go/global"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GormPgsql() *gorm.DB {
	return initPgsql(global.SBG_CONFIG.Pgsql)
}

func initPgsql(p config.Pgsql) *gorm.DB {
	if p.DbName == "" {
		return nil
	}
	pgConfig := postgres.Config{
		DSN:                  p.Dsn(),
		PreferSimpleProtocol: true,
	}
	if db, err := gorm.Open(postgres.New(pgConfig), &gorm.Config{}); err != nil {
		panic(err)
	} else {
		sqlDB, _ := db.DB()
		sqlDB.SetMaxIdleConns(p.MaxIdleConns)
		sqlDB.SetMaxOpenConns(p.MaxOpenConns)
		return db
	}
}
