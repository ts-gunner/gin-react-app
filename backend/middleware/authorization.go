package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/model/response"
)

// 身份验证
func IdentityVerification() gin.HandlerFunc {

	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token == "" {
			c.Abort()
			response.FailWithCode(http.StatusUnauthorized, "身份验证失败", c)
			//return
		}
		_, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
			return []byte(global.SECRET_KEY), nil
		})
		if err != nil {
			global.LOGGER.Info(err.Error())
			c.Abort()
			response.FailWithCode(http.StatusUnauthorized, "鉴权失败", c)
		}
		c.Next()
	}
}
