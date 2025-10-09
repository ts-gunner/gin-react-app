package services

import (
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/schema"
)

type SystemDomainService struct{}

func (s *SystemDomainService) GetDomainById(domainId int64) (*schema.SystemDomain, error) {
	tx := global.SBG_DB.Begin()
	var domain *schema.SystemDomain
	tx.Where("domain_id = ?", domainId).Where("is_delete = 0").First(&domain)
	return domain, nil
}

// 添加用户 - 域的映射
func (s *SystemDomainService) AddUserDomainMap(userId int64, domainId int64) error {
	tx := global.SBG_DB.Begin()
	m := &schema.UserDomain{
		DomainId: domainId,
		UserId:   userId,
	}
	tx.Save(m)
	tx.Commit()
	return nil
}
