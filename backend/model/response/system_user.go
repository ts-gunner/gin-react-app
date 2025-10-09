package response

import "time"

type SystemUserVo struct {
	Token    string `json:"token"`    // token
	UserId   int64  `json:"userId"`   // 用户id
	Nickname string `json:"nickname"` // 昵称
	IsAdmin  bool   `json:"isAdmin"`  // 是否为管理员
	Phone    string `json:"phone"`    // 手机号
	Email    string `json:"email"`    // 邮箱
}

type SystemUserPageVo struct {
	Account    string    `json:"account"`    // 账号
	UserId     int64     `json:"userId"`     // 用户id
	Nickname   string    `json:"nickname"`   // 昵称
	IsAdmin    bool      `json:"isAdmin"`    // 是否为管理员
	Phone      string    `json:"phone"`      // 手机号
	Email      string    `json:"email"`      // 邮箱
	Status     int16     `json:"status"`     // 状态
	DomainName string    `json:"domainName"` // 所属域
	CreateTime time.Time `json:"createTime"` // 创建时间
}
