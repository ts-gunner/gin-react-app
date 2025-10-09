package response

type PageResult[T any] struct {
	Records  []T   `json:"records"`  // 数据列表
	Total    int64 `json:"total"`    // 总记录数
	Current  int   `json:"current"`  // 当前页
	PageSize int   `json:"pageSize"` // 每页条数
}
