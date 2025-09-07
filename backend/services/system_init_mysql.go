package services

import (
	"context"
	"errors"
	"fmt"

	"github.com/ts-gunner/steins-backend-go/config"
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/model/request"
	"github.com/ts-gunner/steins-backend-go/utils"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type MysqlDBInitHandler struct{}

func (h *MysqlDBInitHandler) CreateDB(ctx context.Context, req *request.InitProjectRequest) (context.Context, error) {
	if c, ok := ctx.Value("dbtype").(string); !ok || c != "mysql" {
		return ctx, errors.New("db type类型异常")
	}
	dsn := req.MySQLEmptyDsn()
	createSql := fmt.Sprintf("CREATE DATABASE IF NOT EXISTS `%s` DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci", req.DBName)
	err := createDatabase(dsn, "mysql", createSql)
	if err != nil {
		return nil, err
	}

	mc := req.ToMysqlConfig()
	ctx = context.WithValue(ctx, "db_config", mc)
	var db *gorm.DB
	if db, err = gorm.Open(mysql.New(mysql.Config{
		DSN:                       mc.Dsn(),
		DefaultStringSize:         256,
		SkipInitializeWithVersion: true,
	}), &gorm.Config{}); err != nil {
		return ctx, err
	}
	next := context.WithValue(ctx, "db", db)
	return next, nil
}

func (h *MysqlDBInitHandler) InitTables(ctx context.Context) error {
	return createTables(ctx)
}

func (h *MysqlDBInitHandler) InitData(ctx context.Context) error {
	return initTableData(ctx)
}

func (h *MysqlDBInitHandler) UpdateConfig(ctx context.Context) error {
	c, ok := ctx.Value("db_config").(*config.Mysql)
	if !ok {
		return errors.New("mysql配置读取失败")
	}
	global.SBG_CONFIG.System.DbType = "mysql"
	global.SBG_CONFIG.Mysql = *c
	sm := utils.StructToMap(*global.SBG_CONFIG)
	for k, v := range sm {
		global.SBG_VP.Set(k, v)
	}
	return global.SBG_VP.WriteConfig()
}
