package core

import (
	"github.com/ts-gunner/steins-backend-go/config"
	"github.com/ts-gunner/steins-backend-go/global"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func GormMysql() *gorm.DB {
	return initMysql(global.SBG_CONFIG.Mysql)
}

func initMysql(m config.Mysql) *gorm.DB {
	if m.DbName == "" {
		return nil
	}

	mysqlConfig := mysql.Config{
		DSN:                       m.Dsn(),
		DefaultStringSize:         256,   // string类型字段默认长度
		SkipInitializeWithVersion: false, // 禁用根据当前mysql版本自动配置
	}
	if db, err := gorm.Open(mysql.New(mysqlConfig), &gorm.Config{}); err != nil {
		panic(err)
	} else {
		sqlDB, _ := db.DB()
		sqlDB.SetMaxOpenConns(m.MaxOpenConns)
		sqlDB.SetMaxIdleConns(m.MaxIdleConns)
		return db
	}
}
