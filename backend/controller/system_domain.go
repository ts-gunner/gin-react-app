package controller

type SystemDomainHandler struct{}

func (s *SystemDomainHandler) GetDomainInfoPage() {

}

// @Tags systemDomainController
// @ID listDomains
// @Router /domain/list_domains [get]
// @Summary 添加用户信息
// @Description
// @Accept json
// @Produce json
// @Param request body request.SystemUserPageRequest true "获取用户页数据请求参数"
// @Success 200 {object} response.Response[response.PageResult[response.SystemUserPageVo]]
func (s *SystemDomainHandler) ListDomains() {

}
