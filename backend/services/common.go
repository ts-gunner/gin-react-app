package services

import (
	"github.com/ts-gunner/steins-backend-go/model/response"
	"gorm.io/gorm"
)

// 只能使用gorm结构体，简单查询时使用
func Paginate[T any](db *gorm.DB, current int, pageSize int) (*response.PageResult[T], error) {

	return CorePaginate[T](db, current, pageSize, "default")
}

// 可以灵活使用自定义的struct，联表查询时使用
func PaginateWithScan[T any](db *gorm.DB, current int, pageSize int) (*response.PageResult[T], error) {

	return CorePaginate[T](db, current, pageSize, "scan")
}

func CorePaginate[T any](db *gorm.DB, current int, pageSize int, mode string) (*response.PageResult[T], error) {
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
	if mode == "scan" {
		if err := db.Limit(pageSize).Offset(offset).Scan(&results).Error; err != nil {
			return nil, err
		}
	} else {
		if err := db.Limit(pageSize).Offset(offset).Find(&results).Error; err != nil {
			return nil, err
		}
	}
	var pageResult = &response.PageResult[T]{
		Records:  results,
		Current:  current,
		Total:    total,
		PageSize: pageSize,
	}
	return pageResult, nil
}
