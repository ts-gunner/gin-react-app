package services

import (
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/schema"
)

type SystemUserService struct {
}

// 根据用户名获取用户对象
func (s *SystemUserService) GetSystemUserByUsername(username string) *schema.SystemUser {

	var systemUser schema.SystemUser

	global.SBG_DB.Model(schema.SystemUser{}).Where("account = ?", username).Where("is_delete = 0").First(&systemUser)

	return &systemUser
}
