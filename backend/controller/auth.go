package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/model/request"
	"github.com/ts-gunner/steins-backend-go/model/response"
	"github.com/ts-gunner/steins-backend-go/utils"
	"go.uber.org/zap"
)

type AuthHandler struct{}

// @Tags authController
// @ID adminPwdLogin
// @Router /auth/admin_pwd_login [post]
// @Summary 管理端密码登录
// @Description
// @Accept json
// @Produce json
// @Param request body request.PwdLogin true "密码登录参数"
// @Success 200 {object} response.Response[response.SystemUserVo]
func (a *AuthHandler) AdminPwdLogin(c *gin.Context) {
	var loginRequest request.PwdLogin
	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		global.LOGGER.Error("参数校验异常", zap.Any("request", loginRequest))
		response.Fail("参数校验异常", c)
		return
	}
	user := userService.GetSystemUserByUsername(loginRequest.Username)
	if user == nil {
		global.LOGGER.Error("用户不存在")
		response.FailWithCode(http.StatusForbidden, "用户名或密码错误", c)
		return
	}
	if user.Password != utils.EncryptBySha256(loginRequest.Password) {
		global.LOGGER.Error("密码校验错误")
		response.FailWithCode(http.StatusForbidden, "用户名或密码错误", c)
		return
	}
	if !user.IsAdmin {
		global.LOGGER.Error("非管理员，无权限登录")
		response.FailWithCode(http.StatusForbidden, "非管理员，无权限登录", c)
		return
	}
	vo, err := authService.Login(user)
	if err != nil {
		global.LOGGER.Error(err.Error())
		response.Fail("用户信息创建失败！！", c)
		return
	}
	response.OkWithData[response.SystemUserVo](*vo, c)
}

// @Tags authController
// @ID userPwdLogin
// @Router /auth/pwd_login [post]
// @Summary 用户端密码登录
// @Description
// @Accept json
// @Produce json
// @Success 200 {object} response.Response[any]
func (a *AuthHandler) UserPwdLogin(c *gin.Context) {

	response.Ok(c)
}

// @Tags authController
// @ID userLogout
// @Router /auth/logout [post]
// @Summary 用户退出登录
// @Description
// @Accept json
// @Produce json
// @Success 200 {object} response.Response[any]
func (a *AuthHandler) UserLogout(c *gin.Context) {
	token := c.GetHeader("Authorization")
	authService.Logout(token)
	response.Ok(c)
}
