package schema

/**
所有映射表
*/

// 用户 - 域 映射表
type UserDomain struct {
	Id       int64 `json:"id" gorm:"primaryKey;autoIncrement:true;type:bigint;comment:id"`
	UserId   int64 `json:"userId" gorm:"column:user_id;type:bigint;comment:用户id"`
	DomainId int64 `json:"domainId" gorm:"column:domain_id;type:bigint;comment:域id"`
	BaseSchema
}

func (_ *UserDomain) TableName() string { return "user_domain" }
