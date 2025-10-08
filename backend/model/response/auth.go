package response

type SystemUserVo struct {
	Token    string `json:"token"`    // token
	UserId   int64  `json:"userId"`   // 用户id
	Nickname string `json:"nickname"` // 昵称
	IsAdmin  bool   `json:"isAdmin"`  // 是否为管理员
	Phone    string `json:"phone"`    // 手机号
	Email    string `json:"email"`    // 邮箱
}
