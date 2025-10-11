package services

import (
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/model/request"
	"github.com/ts-gunner/steins-backend-go/model/response"
	"github.com/ts-gunner/steins-backend-go/schema"
)

type SystemDomainService struct{}

func (s *SystemDomainService) GetDomainById(domainId int64) (*schema.SystemDomain, error) {
	tx := global.SBG_DB.Begin()
	var domain *schema.SystemDomain
	if result := tx.Where("domain_id = ?", domainId).Where("is_delete = 0").First(&domain); result.Error != nil {
		return nil, nil
	}
	return domain, nil
}

func (s *SystemDomainService) GetDomainList() (*[]schema.SystemDomain, error) {
	tx := global.SBG_DB.Begin()
	var domains []schema.SystemDomain
	tx.Where("is_delete = 0").Find(&domains)
	return &domains, nil
}

func (s *SystemDomainService) SaveDomain(domain *schema.SystemDomain) error {
	tx := global.SBG_DB.Begin()
	if err := tx.Save(domain).Error; err != nil {
		tx.Rollback()
		return err
	}
	tx.Commit()
	return nil
}

func (s *SystemDomainService) RemoveDomain(domainId int64) error {

	tx := global.SBG_DB.Begin()
	if err := tx.Model(&schema.SystemDomain{}).Where("domain_id = ?", domainId).Update("is_delete", 1).Error; err != nil {
		tx.Rollback()
		return err
	}
	tx.Commit()
	return nil
}

// 添加用户 - 域的映射
func (s *SystemDomainService) AddUserDomainMap(userId int64, domainId int64) error {
	tx := global.SBG_DB.Begin()
	m := &schema.UserDomain{
		DomainId: domainId,
		UserId:   userId,
	}
	if err := tx.Save(m).Error; err != nil {
		tx.Rollback()
		return err
	}
	if err := tx.Commit().Error; err != nil {
		return err
	}
	return nil
}

func (s *SystemDomainService) GetSystemDomainPageData(req request.SystemDomainPageRequest) (*response.PageResult[schema.SystemDomain], error) {
	tx := global.SBG_DB.Begin()
	tx = tx.Where("is_delete = 0")
	if req.DomainName != nil && *req.DomainName != "" {
		tx = tx.Where("domain_name like ?", "%"+*req.DomainName+"%")
	}
	result, err := Paginate[schema.SystemDomain](tx, req.Current, req.PageSize)
	if err != nil {
		return nil, err
	}
	return result, nil
}
