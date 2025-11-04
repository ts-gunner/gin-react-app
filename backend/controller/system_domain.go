package controller

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/model/request"
	"github.com/ts-gunner/steins-backend-go/model/response"
	"github.com/ts-gunner/steins-backend-go/schema"
	"go.uber.org/zap"
)

type SystemDomainHandler struct{}

// @Tags systemDomainController
// @ID getDomainInfoPage
// @Router /domain/get_page [post]
// @Summary 获取域的页数据
// @Description
// @Accept json
// @Produce json
// @Param request body request.SystemDomainPageRequest true "获取域的页数据请求参数"
// @Success 200 {object} response.Response[response.PageResult[schema.SystemDomain]]
func (s *SystemDomainHandler) GetDomainInfoPage(c *gin.Context) {
	var req request.SystemDomainPageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		global.LOGGER.Error("参数校验异常", zap.Any("request", req), zap.Error(err))
		response.Fail("参数校验异常", c)
		return
	}
	pageResult, err := domainService.GetSystemDomainPageData(req)
	if err != nil {
		global.LOGGER.Error("获取域 页数据失败:" + err.Error())
		response.Fail("获取域 页数据失败", c)
		return
	}
	response.OkWithData[response.PageResult[schema.SystemDomain]](*pageResult, c)
}

// @Tags systemDomainController
// @ID listDomains
// @Router /domain/list_domains [get]
// @Summary 获取域列表
// @Description
// @Accept json
// @Produce json
// @Success 200 {object} response.Response[[]schema.SystemDomain]
func (s *SystemDomainHandler) ListDomains(c *gin.Context) {
	domains, err := domainService.GetDomainList()
	if err != nil {
		global.LOGGER.Error("获取域列表失败:" + err.Error())
		response.Fail("获取域列表失败!", c)
		return
	}
	response.OkWithData[[]schema.SystemDomain](*domains, c)
}

// @Tags systemDomainController
// @ID addSystemDomain
// @Router /domain/add [post]
// @Summary 添加域
// @Description
// @Accept json
// @Produce json
// @Param request body request.AddDomainRequest true "添加域请求参数"
// @Success 200 {object} response.Response[bool]
func (s *SystemDomainHandler) AddSystemDomain(c *gin.Context) {

	var req request.AddDomainRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		global.LOGGER.Error("参数校验异常", zap.Any("request", req), zap.Error(err))
		response.Fail("参数校验异常", c)
		return
	}
	domain := &schema.SystemDomain{
		DomainName: req.DomainName,
	}

	err := domainService.SaveDomain(domain)
	if err != nil {
		global.LOGGER.Error("添加域失败:" + err.Error())
		response.Fail("添加域失败!", c)
		return
	}
	response.OkWithData[bool](true, c)
}

// @Tags systemDomainController
// @ID updateDomainInfo
// @Router /domain/update [post]
// @Summary 更新域信息
// @Description
// @Accept json
// @Produce json
// @Param request body request.UpdateDomainRequest true "更新域请求参数"
// @Success 200 {object} response.Response[bool]
func (s *SystemDomainHandler) UpdateDomainInfo(c *gin.Context) {

	var req request.UpdateDomainRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		global.LOGGER.Error("参数校验异常", zap.Any("request", req), zap.Error(err))
		response.Fail("参数校验异常", c)
		return
	}

	domain, err := domainService.GetDomainById(req.DomainId)
	if err != nil {
		global.LOGGER.Error("更新域失败:" + err.Error())
		response.Fail("更新域失败!", c)
		return
	}
	if domain == nil {
		global.LOGGER.Error("更新域失败: 域不存在")
		response.Fail("更新域失败!", c)
		return
	}

	domain.DomainName = req.DomainName
	if err = domainService.SaveDomain(domain); err != nil {
		global.LOGGER.Error("更新域失败:" + err.Error())
		response.Fail("更新域失败!", c)
		return
	}

	response.OkWithData[bool](true, c)
}

// @Tags systemDomainController
// @ID removeDomainInfo
// @Router /domain/remove [post]
// @Summary 删除域信息
// @Description
// @Produce json
// @Param domainId query int64 true "域id"
// @Success 200 {object} response.Response[bool]
func (s *SystemDomainHandler) RemoveDomainInfo(c *gin.Context) {
	domainId := c.Query("domainId")
	if domainId == "" {
		global.LOGGER.Error("参数校验异常", zap.Any("domain_id", domainId))
		response.Fail("参数校验异常", c)
		return
	}
	newDomainId, err := strconv.ParseInt(domainId, 10, 64)
	if err != nil {
		global.LOGGER.Error("强转int64失败:"+err.Error(), zap.String("domainId", domainId))
		response.Fail("删除域失败!", c)
		return
	}
	if err := domainService.RemoveDomain(newDomainId); err != nil {
		global.LOGGER.Error("删除域失败:" + err.Error())
		response.Fail("删除域失败!", c)
		return
	}
	response.OkWithData[bool](true, c)
}
