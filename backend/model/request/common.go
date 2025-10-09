package request

type PageRequest struct {
	Current  int `json:"current" form:"current"`   // 当前页
	PageSize int `json:"pageSize" form:"pageSize"` // 页数据量
}
