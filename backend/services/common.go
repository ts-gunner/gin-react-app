package services

import (
	"github.com/ts-gunner/steins-backend-go/model/response"
	"gorm.io/gorm"
)

func Paginate[T any](db *gorm.DB, current int, pageSize int) (*response.PageResult[T], error) {
	if current <= 0 {
		current = 1
	}
	if pageSize <= 0 {
		pageSize = 20
	}

	offset := (current - 1) * pageSize
	var model T
	var total int64
	if err := db.Model(&model).Count(&total).Error; err != nil {
		return nil, err
	}
	var results []T
	if err := db.Limit(pageSize).Offset(offset).Find(&results).Error; err != nil {
		return nil, err
	}
	var pageResult = &response.PageResult[T]{
		Records:  results,
		Current:  current,
		Total:    total,
		PageSize: pageSize,
	}
	return pageResult, nil
}
