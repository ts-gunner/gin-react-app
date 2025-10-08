package router

import (
	"github.com/gin-gonic/gin"
	"github.com/ts-gunner/steins-backend-go/middleware"
)

type AuthRouter struct{}

func (_ *AuthRouter) InitAuthRouter(Router *gin.RouterGroup) {
	router := Router.Group("auth")
	{
		router.POST("pwd_login", authHandler.UserPwdLogin)
		router.POST("admin_pwd_login", authHandler.AdminPwdLogin)
		router.POST("logout", middleware.IdentityVerification(), authHandler.UserLogout)
	}
}
