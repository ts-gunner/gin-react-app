package schema

type SystemUser struct {
	UserId   string `json:"uid" gorm:"primaryKey;column:uid;comment:用户id"`
	Account  string `json:"account" gorm:"index;column:account;comment:用户账号"`
	Password string `json:"pwd" gorm:"column:pwd;comment:密码"`
	OpenId   string `json:"open_id" gorm:"column:openid;comment:小程序唯一标识id"`
	UnionId  string `json:"union_id" gorm:"column:unionid;comment:开放平台id"`
	Nickname string `json:"nickname" gorm:"column:nickname;comment:用户昵称"`
	Email    string `json:"email" gorm:"column:email;comment:邮箱"`
	Phone    string `json:"phone" gorm:"column:phone;comment:手机号码"`
	BaseSchema
}

func (user *SystemUser) TableName() string { return "system_user" }
