package services

import (
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/model/request"
	"github.com/ts-gunner/steins-backend-go/model/response"
	"github.com/ts-gunner/steins-backend-go/schema"
)

type SystemUserService struct {
}

// 根据用户名获取用户对象
func (s *SystemUserService) GetSystemUserByUsername(username string) *schema.SystemUser {

	var systemUser schema.SystemUser

	global.SBG_DB.Where("account = ?", username).Where("is_delete = 0").First(&systemUser)

	return &systemUser
}

// 添加用户
func (s *SystemUserService) SaveSystemUser(user *schema.SystemUser) error {
	tx := global.SBG_DB.Begin()

	tx.Save(user)

	tx.Commit()

	return nil
}

// 获取用户页数据
func (s *SystemUserService) GetSystemUserPageData(req request.SystemUserPageRequest) (*response.PageResult[schema.SystemUser], error) {

	tx := global.SBG_DB.Where("is_delete = 0")
	if req.Account != nil && *req.Account != "" {
		tx = tx.Where("account like ?", "%"+*req.Account+"%")
	}
	if req.Nickname != nil && *req.Nickname != "" {
		tx = tx.Where("nickname like ?", "%"+*req.Nickname+"%")
	}
	if req.IsAdmin != nil {
		if *req.IsAdmin {
			tx = tx.Where("is_admin = 1")
		} else {
			tx = tx.Where("is_admin = 0")
		}
	}
	if req.Status != nil {
		tx = tx.Where("status = ?", *req.Status)
	}
	result, err := Paginate[schema.SystemUser](tx, req.Current, req.PageSize)
	if err != nil {
		return nil, err
	}
	return result, nil
}
