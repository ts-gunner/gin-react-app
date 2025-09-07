package request

import (
	"fmt"

	"github.com/ts-gunner/steins-backend-go/config"
)

type InitProjectRequest struct {
	AdminAccount  string `json:"adminAccount" binding:"required"`  // 管理员账号
	AdminPassword string `json:"adminPassword" binding:"required"` // 管理员密码
	DbType        string `json:"dbType" binding:"required"`        // 数据库类型
	Host          string `json:"host"`                             // 服务器地址
	Port          string `json:"port"`                             // 端口
	Username      string `json:"username" binding:"required"`
	Password      string `json:"password" binding:"required"`
	DBName        string `json:"dbName" binding:"required"`
}

func (i *InitProjectRequest) ToMysqlConfig() *config.Mysql {
	if i.Host == "" {
		i.Host = "127.0.0.1"
	}
	if i.Port == "" {
		i.Port = "3306"
	}
	c := &config.Mysql{
		CommonDB: config.CommonDB{
			Path:         i.Host,
			Port:         i.Port,
			DbName:       i.DBName,
			Username:     i.Username,
			Password:     i.Password,
			MaxIdleConns: 10,
			MaxOpenConns: 100,
		},
	}
	return c

}
func (i *InitProjectRequest) MySQLEmptyDsn() string {
	if i.Host == "" {
		i.Host = "127.0.0.1"
	}
	if i.Port == "" {
		i.Port = "3306"
	}
	return fmt.Sprintf("%s:%s@tcp(%s:%s)/", i.Username, i.Password, i.Host, i.Port)
}

func (i *InitProjectRequest) PgsqlEmptyDsn() string {
	if i.Host == "" {
		i.Host = "127.0.0.1"
	}
	if i.Port == "" {
		i.Port = "5432"
	}
	return "host=" + i.Host + " user=" + i.Username + " password=" + i.Password + " port=" + i.Port + " dbname=" + "postgres" + " " + "sslmode=disable TimeZone=Asia/Shanghai"
}
