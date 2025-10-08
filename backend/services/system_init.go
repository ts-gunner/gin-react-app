package services

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/model/request"
	"github.com/ts-gunner/steins-backend-go/schema"
	"github.com/ts-gunner/steins-backend-go/utils"
	"gorm.io/gorm"
)

type TypedDBInitHandler interface {
	CreateDB(ctx context.Context, req *request.InitProjectRequest) (context.Context, error) // 创建库
	InitTables(ctx context.Context) error                                                   // 建表
	InitData(ctx context.Context) error
	UpdateConfig(ctx context.Context) error
}
type InitService struct{}

func (s *InitService) InitProject(req request.InitProjectRequest) error {
	ctx := context.TODO()
	ctx = context.WithValue(ctx, "adminAccount", req.AdminAccount)
	ctx = context.WithValue(ctx, "adminPassword", req.AdminPassword)
	var initDBHandler TypedDBInitHandler
	switch req.DbType {
	case "mysql":
		initDBHandler = &MysqlDBInitHandler{}
		ctx = context.WithValue(ctx, "dbtype", "mysql")
	case "pgsql":
		initDBHandler = &PostgresDBInitHandler{}
		ctx = context.WithValue(ctx, "dbtype", "pgsql")
	case "sqlite":
		initDBHandler = &SqliteDBInitHandler{}
		ctx = context.WithValue(ctx, "dbtype", "sqlite")
	default:
		initDBHandler = &MysqlDBInitHandler{}
		ctx = context.WithValue(ctx, "dbtype", "mysql")
	}

	ctx, err := initDBHandler.CreateDB(ctx, &req)
	if err != nil {
		return err
	}
	db := ctx.Value("db").(*gorm.DB)
	global.SBG_DB = db
	global.LOGGER.Info(fmt.Sprintf("%s数据库 %s 创建成功!", req.DbType, req.DBName))

	if err := initDBHandler.InitTables(ctx); err != nil {
		return err
	}
	global.LOGGER.Info(fmt.Sprintf("%s数据库 %s所有库表 创建成功!", req.DbType, req.DBName))
	if err := initDBHandler.InitData(ctx); err != nil {
		return err
	}
	if err := initDBHandler.UpdateConfig(ctx); err != nil {
		return err
	}
	return nil
}

func (s *InitService) CheckDBConnection(req request.DBConnectionRequest) error {
	var (
		dsn    string
		dbType string
	)
	switch req.DbType {
	case "mysql":
		dsn = req.MySQLEmptyDsn()
		dbType = "mysql"
	case "pgsql":
		dsn = req.PgsqlEmptyDsn()
		dbType = "pgsql"
	default:
		dsn = req.MySQLEmptyDsn()
		dbType = "mysql"
	}
	return connectDatabase(dsn, dbType)
}
func connectDatabase(dsn string, driver string) error {
	db, err := sql.Open(driver, dsn)
	if err != nil {
		return err
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			fmt.Println(err)
		}
	}(db)
	if err = db.Ping(); err != nil {
		return err
	}
	return nil
}
func createDatabase(dsn string, driver string, createSql string) error {
	db, err := sql.Open(driver, dsn)
	if err != nil {
		return err
	}
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			fmt.Println(err)
		}
	}(db)
	if err = db.Ping(); err != nil {
		return err
	}
	_, err = db.Exec(createSql)
	return nil
}

func createTables(ctx context.Context) error {
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()
	db, ok := ctx.Value("db").(*gorm.DB)
	if !ok {
		return errors.New("missing db in context")
	}
	tables := []interface{}{
		schema.SystemUser{},
	}
	if err := db.AutoMigrate(tables...); err != nil {
		return err
	}
	return nil
}

func initTableData(ctx context.Context) error {
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()
	db, ok := ctx.Value("db").(*gorm.DB)
	adminAccount, _ := ctx.Value("adminAccount").(string)
	adminPassword, _ := ctx.Value("adminPassword").(string)
	if !ok {
		return errors.New("missing db in context")
	}
	userId, _ := global.SBG_ID_CREATOR.NextID()
	newUser := schema.SystemUser{
		UserId:   userId,
		Account:  adminAccount,
		Password: utils.EncryptBySha256(adminPassword),
		Nickname: "超级管理员",
	}

	result := db.Create(&newUser)
	if result.Error != nil {
		return errors.New("新增管理员失败：" + result.Error.Error())
	}
	global.LOGGER.Info("新增超级管理员成功")
	return nil
}
