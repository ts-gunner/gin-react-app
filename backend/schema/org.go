package schema

/**
组织架构相关表
*/
// 域
type SystemDomain struct {
	DomainId   int64  `json:"domain_id" gorm:"primaryKey;autoIncrement:true;column:domain_id;type:bigint unsigned;not null;comment:域id"`
	DomainName string `json:"domain_name" gorm:"colum:domain_name;comment:域名"`
	BaseSchema
}

func (s *SystemDomain) TableName() string { return "system_domain" }
