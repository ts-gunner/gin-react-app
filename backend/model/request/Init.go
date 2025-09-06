package request

type InitProjectRequest struct {
	AdminAccount  string `json:"adminAccount" binding:"required"`  // 管理员账号
	AdminPassword string `json:"adminPassword" binding:"required"` // 管理员密码
	DbType        string `json:"dbType" binding:"required"`        // 数据库类型
	
}
