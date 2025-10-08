package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/model/request"
	"github.com/ts-gunner/steins-backend-go/model/response"
	"go.uber.org/zap"
)

type InitHandler struct{}

// @Tags initController
// @ID checkNeedInit
// @Router /init/check [get]
// @Summary 查看是否需要初始化
// @Description
// @Accept json
// @Produce json
// @Success 200 {object} response.Response[response.CheckResult]
func (h *InitHandler) CheckNeedInit(c *gin.Context) {
	if global.SBG_DB != nil {
		response.OkWithData[response.CheckResult](response.CheckResult{Result: false}, c)
		return
	}

	response.OkWithData[response.CheckResult](response.CheckResult{Result: true}, c)
	return
}

// @Tags initController
// @ID testDBConnection
// @Router /init/test_db_connection [post]
// @Summary 测试数据库是否能够连接
// @Description
// @Accept json
// @Produce json
// @Param request body request.DBConnectionRequest true "测试数据库连接相关参数"
// @Success 200 {object} response.Response[response.CheckResult]
func (h InitHandler) TestDBConnection(c *gin.Context) {
	var dbConnectionRequest request.DBConnectionRequest
	if err := c.ShouldBindJSON(&dbConnectionRequest); err != nil {
		global.LOGGER.Error("参数校验失败!!", zap.Any("request", dbConnectionRequest))
		response.Fail("参数校验失败", c)
		return
	}
	err := initService.CheckDBConnection(dbConnectionRequest)
	if err != nil {
		response.OkWithData[response.CheckResult](response.CheckResult{Result: false}, c)
		return
	} else {
		response.OkWithData[response.CheckResult](response.CheckResult{Result: true}, c)
		return
	}
}

// @Tags initController
// @ID initProject
// @Router /init/init_project [post]
// @Summary 项目初始化
// @Description 当配置文件的数据库配置为空时，需要进行项目初始化
// @Accept json
// @Produce json
// @Param user body request.InitProjectRequest true "初始化相关参数"
// @Success 200 {object} response.Response[any]
func (h InitHandler) InitProject(c *gin.Context) {
	if global.SBG_DB != nil {
		response.Fail("已存在数据库配置", c)
		return
	}
	var initRequest request.InitProjectRequest
	if err := c.ShouldBindJSON(&initRequest); err != nil {
		global.LOGGER.Error("参数校验失败", zap.Any("request", initRequest))
		response.Fail("参数校验异常", c)
		return
	}
	if err := initService.InitProject(initRequest); err != nil {
		global.LOGGER.Error("自动创建数据库失败!", zap.Error(err))
		response.Fail("自动创建数据库失败, 请查看后台日志", c)
		return
	}

	response.OkWithMessage("自动创建数据库成功", c)

}
