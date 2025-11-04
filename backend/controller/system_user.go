package controller

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/model/request"
	"github.com/ts-gunner/steins-backend-go/model/response"
	"github.com/ts-gunner/steins-backend-go/schema"
	"github.com/ts-gunner/steins-backend-go/utils"
	"go.uber.org/zap"
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

// @Tags systemUserController
// @ID addSystemUser
// @Router /user/add [post]
// @Summary 添加用户信息
// @Description
// @Accept json
// @Produce json
// @Param request body request.AddSystemUserRequest true "添加用户请求参数"
// @Success 200 {object} response.Response[bool]
func (h *SystemUserHandler) AddSystemUser(c *gin.Context) {
	var req request.AddSystemUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		global.LOGGER.Error("参数校验异常", zap.Any("request", req), zap.Error(err))
		response.Fail("参数校验异常", c)
		return
	}
	user := userService.GetSystemUserByUsername(req.Username)
	if user != nil {
		response.Fail("用户已存在", c)
		return
	}
	// 查看域是否存在
	domainObject, err := domainService.GetDomainById(req.DomainId)
	if err != nil || domainObject == nil {
		response.Fail("域不存在或域信息错误", c)
		return
	}
	newUser := &schema.SystemUser{
		Account:  req.Username,
		Password: utils.EncryptBySha256(req.Password),
		Nickname: req.Nickname,
		IsAdmin:  *req.IsAdmin,
	}
	_ = userService.SaveSystemUser(newUser)

	// 添加用户 - 域的映射
	if err := domainService.AddUserDomainMap(newUser.UserId, domainObject.DomainId); err != nil {
		global.LOGGER.Error("添加用户域映射失败:" + err.Error())
		response.Fail("添加用户域映射失败", c)
		return
	}

	response.OkWithData[bool](true, c)
}

// @Tags systemUserController
// @ID getSystemUserPageData
// @Router /user/get_page [post]
// @Summary 添加用户信息
// @Description
// @Accept json
// @Produce json
// @Param request body request.SystemUserPageRequest true "获取用户页数据请求参数"
// @Success 200 {object} response.Response[response.PageResult[response.SystemUserPageVo]]
func (h *SystemUserHandler) GetSystemUserPageData(c *gin.Context) {
	var req request.SystemUserPageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		global.LOGGER.Error("参数校验异常", zap.Any("request", req), zap.Error(err))
		response.Fail("参数校验异常", c)
		return
	}
	pageResult, err := userService.GetSystemUserPageData(req)
	if err != nil {
		global.LOGGER.Error("获取用户列表失败", zap.Error(err))
		response.Fail("获取用户列表失败", c)
		return
	}

	response.OkWithData[response.PageResult[response.SystemUserPageVo]](*pageResult, c)
}

// @Tags systemUserController
// @ID updateSystemUserInfo
// @Router /user/update [post]
// @Summary 更新用户信息
// @Description
// @Accept json
// @Produce json
// @Param request body request.UpdateSystemUserRequest true "更新用户数据请求参数"
// @Success 200 {object} response.Response[bool]
func (h *SystemUserHandler) UpdateSystemUserInfo(c *gin.Context) {
	var req request.UpdateSystemUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		global.LOGGER.Error("参数校验异常", zap.Any("request", req), zap.Error(err))
		response.Fail("参数校验异常", c)
		return
	}
	user := userService.GetSystemUserById(req.UserId)
	if user == nil {
		response.Fail("用户不存在", c)
		return
	}

	if req.Nickname != nil && *req.Nickname != "" {
		user.Nickname = *req.Nickname
	}
	if req.Account != nil && *req.Account != "" {
		user.Account = *req.Account
	}
	if req.Email != nil && *req.Email != "" {
		user.Email = *req.Email
	}
	if req.Phone != nil && *req.Phone != "" {
		user.Phone = *req.Phone
	}
	if req.IsAdmin != nil {
		user.IsAdmin = *req.IsAdmin
	}
	if req.Status != nil {
		user.Status = *req.Status
	}
	if err := userService.SaveSystemUser(user); err != nil {
		global.LOGGER.Error("更新用户信息失败:" + err.Error())
		response.Fail("更新用户信息失败!!", c)
		return
	}
	response.OkWithData[bool](true, c)
}

// @Tags systemUserController
// @ID removeSystemUserInfo
// @Router /user/remove [post]
// @Summary 删除用户信息
// @Description
// @Accept json
// @Produce json
// @Param userId query int64 true "用户id"
// @Success 200 {object} response.Response[bool]
func (h *SystemUserHandler) RemoveSystemUserInfo(c *gin.Context) {
	userId := c.Query("userId")
	if userId == "" {
		global.LOGGER.Error("参数校验异常", zap.Any("userId", userId))
		response.Fail("参数校验异常", c)
		return
	}
	newUserId, err := strconv.ParseInt(userId, 10, 64)
	if err != nil {
		global.LOGGER.Error("强转int64失败:"+err.Error(), zap.String("userId", userId))
		response.Fail("删除用户失败!", c)
		return
	}
	if err := userService.DeleteSystemUser(newUserId); err != nil {
		global.LOGGER.Error("删除域失败:" + err.Error())
		response.Fail("删除用户失败!", c)
		return
	}
	response.OkWithData[bool](true, c)
}

// @Tags systemUserController
// @ID resetUserPassword
// @Router /user/reset_pwd [post]
// @Summary 重置用户密码
// @Description
// @Accept json
// @Produce json
// @Param request body request.ResetUserPwdRequest true "重置密码参数"
// @Success 200 {object} response.Response[bool]
func (h *SystemUserHandler) ResetUserPassword(c *gin.Context) {
	var req request.ResetUserPwdRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		global.LOGGER.Error("参数校验异常", zap.Any("request", req), zap.Error(err))
		response.Fail("参数校验异常", c)
		return
	}

	user := userService.GetSystemUserById(req.UserId)
	if user == nil {
		response.Fail("用户不存在", c)
		return
	}

	user.Password = utils.EncryptBySha256(req.Password)
	if err := userService.SaveSystemUser(user); err != nil {
		global.LOGGER.Error("重置密码失败:" + err.Error())
		response.Fail("重置密码失败!", c)
		return
	}
	response.OkWithData[bool](true, c)
}
