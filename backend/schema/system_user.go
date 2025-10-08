package schema

type SystemUser struct {
	UserId   int64  `json:"uid" gorm:"primaryKey;column:uid;type:bigint;not null;comment:用户id"`
	Account  string `json:"account" gorm:"index:idx_user_account;column:account;not null;comment:用户账号"`
	Password string `json:"pwd" gorm:"column:pwd;not null;comment:密码"`
	OpenId   string `json:"open_id" gorm:"column:openid;comment:小程序唯一标识id"`
	UnionId  string `json:"union_id" gorm:"column:unionid;comment:开放平台id"`
	Nickname string `json:"nickname" gorm:"column:nickname;not null;comment:用户昵称"`
	Email    string `json:"email" gorm:"column:email;comment:邮箱"`
	Phone    string `json:"phone" gorm:"column:phone;not null;comment:手机号码"`
	IsAdmin  bool   `json:"is_admin" gorm:"column:is_admin;default:false;not null;comment:是否为管理员"`
	BaseSchema
}

func (user *SystemUser) TableName() string { return "system_user" }
