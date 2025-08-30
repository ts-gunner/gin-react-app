package schema

import (
	"time"

	"gorm.io/gorm"
)

type BaseSchema struct {
	isDelete   bool
	CreateTime time.Time      `json:"create_time"`
	UpdateTime time.Time      `json:"update_time"`
	DeleteTime gorm.DeletedAt `json:"-"`
}
