package schema

import (
	"time"

	"gorm.io/gorm"
)

type BaseSchema struct {
	IsDelete   bool      `json:"is_delete" gorm:"default:0;column:is_delete"`
	CreateTime time.Time `json:"create_time" gorm:"column:create_time"`
	UpdateTime time.Time `json:"update_time" gorm:"column:update_time"`
}

func (b *BaseSchema) BeforeCreate(tx *gorm.DB) error {
	b.CreateTime = time.Now()
	b.UpdateTime = time.Now()
	return nil
}

func (b *BaseSchema) BeforeUpdate(tx *gorm.DB) error {
	b.UpdateTime = time.Now()
	return nil
}
