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

	result := global.SBG_DB.Where("account = ?", username).Where("is_delete = 0").First(&systemUser)
	if result.Error != nil {
		return nil
	}

	return &systemUser
}

// 根据用户名获取用户对象
func (s *SystemUserService) GetSystemUserById(userId int64) *schema.SystemUser {

	var systemUser schema.SystemUser

	result := global.SBG_DB.Where("uid = ?", userId).Where("is_delete = 0").First(&systemUser)
	if result.Error != nil {
		return nil
	}

	return &systemUser
}

// 添加用户
func (s *SystemUserService) SaveSystemUser(user *schema.SystemUser) error {
	tx := global.SBG_DB.Begin()

	if err := tx.Save(user).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Commit().Error; err != nil {
		return err
	}

	return nil
}

// 删除用户
func (s *SystemUserService) DeleteSystemUser(userId int64) error {
	tx := global.SBG_DB.Begin()

	if err := tx.Model(&schema.SystemUser{}).Where("uid = ?", userId).Update("is_delete", 1).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 将user -domain映射清理
	if err := tx.Model(&schema.UserDomain{}).Where("user_id = ?", userId).Update("is_delete", 1).Error; err != nil {
		tx.Rollback()
		return err
	}
	if err := tx.Commit().Error; err != nil {
		return err
	}
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
