package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/model/request"
	"github.com/ts-gunner/steins-backend-go/model/response"
	"go.uber.org/zap"
)

type InitHandler struct{}

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
	response.Ok(c)

}
