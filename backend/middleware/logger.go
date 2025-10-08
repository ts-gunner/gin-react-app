package middleware

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/ts-gunner/steins-backend-go/global"
)

func RequestLog() gin.HandlerFunc {

	return func(c *gin.Context) {
		global.LOGGER.Info(fmt.Sprintf("call api --> %s", c.Request.URL.Path))
		c.Next()
	}
}
