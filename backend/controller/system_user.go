package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/ts-gunner/steins-backend-go/model/response"
)

type SystemUserHandler struct{}

// @Tags systemUserController
// @ID getUserInfo
// @Router /user/get_info [get]
// @Summary 获取登录用户信息
// @Description
// @Accept json
// @Produce json
// @Success 200 {object} response.Response[response.SystemUserVo]
func (h *SystemUserHandler) GetUserInfo(c *gin.Context) {
	token := c.GetHeader("Authorization")
	userVo, err := authService.GetUserInfoByToken(token)
	if err != nil || userVo == nil {
		response.Fail("获取用户信息失败", c)
		return
	}
	response.OkWithData[response.SystemUserVo](*userVo, c)
}
