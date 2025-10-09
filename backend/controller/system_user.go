package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
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
		global.LOGGER.Error("参数校验异常", zap.Any("request", req))
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
	userId, _ := global.SBG_ID_CREATOR.NextID()
	newUser := &schema.SystemUser{
		UserId:   userId,
		Account:  req.Username,
		Password: utils.EncryptBySha256(req.Password),
		Nickname: req.Nickname,
		IsAdmin:  req.IsAdmin,
	}
	_ = userService.SaveSystemUser(newUser)

	// 添加用户 - 域的映射
	_ = domainService.AddUserDomainMap(userId, domainObject.DomainId)

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
	var results []response.SystemUserPageVo
	if err := copier.Copy(&results, &pageResult.Records); err != nil {
		global.LOGGER.Error("用户列表 - 复制失败", zap.Error(err))
		response.Fail("获取用户列表失败", c)
		return
	}

	var finalPageResult response.PageResult[response.SystemUserPageVo]
	_ = copier.Copy(&finalPageResult, &pageResult)
	finalPageResult.Records = results

	response.OkWithData[response.PageResult[response.SystemUserPageVo]](finalPageResult, c)
}
