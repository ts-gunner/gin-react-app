package request

type AddSystemUserRequest struct {
	Username string `json:"username" binding:"required"`  // 用户名
	Password string `json:"password" binding:"required"`  // 密码
	Nickname string `json:"nickname" binding:"required"`  // 昵称
	IsAdmin  bool   `json:"is_admin" binding:"required"`  // 是否为管理员
	DomainId int64  `json:"domain_id" binding:"required"` // 域id

}

type SystemUserPageRequest struct {
	Account  *string `json:"account"`  // 账户名称
	Nickname *string `json:"nickname"` // 昵称
	IsAdmin  *bool   `json:"is_admin"` // 是否管理员
	Status   *int    `json:"status"`   // 账号状态
	PageRequest
}
