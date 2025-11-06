package schema

import (
	"time"

	gormadapter "github.com/casbin/gorm-adapter/v3"
)

var DBTables = []interface{}{
	gormadapter.CasbinRule{}, // casbin的规则表
	SystemUser{},
	SystemDomain{},
	UserDomain{},
}

type BaseSchema struct {
	IsDelete   bool      `json:"isDelete" gorm:"default:0;column:is_delete"`
	CreateTime time.Time `json:"createTime" gorm:"column:create_time;autoCreateTime:milli"`
	UpdateTime time.Time `json:"updateTime" gorm:"column:update_time;autoUpdateTime:milli"`
}

// func (b *BaseSchema) BeforeCreate(tx *gorm.DB) error {
// 	b.CreateTime = time.Now()
// 	b.UpdateTime = time.Now()
// 	return nil
// }

// func (b *BaseSchema) BeforeUpdate(tx *gorm.DB) error {
// 	b.UpdateTime = time.Now()
// 	return nil
// }
