package controller

import "github.com/gin-gonic/gin"

type HomeHandler struct{}

func (h *HomeHandler) GetAppInfo(c *gin.Context) {
	c.JSON(200, gin.H{
		"author":  "Jun Jian Yang",
		"email":   "yang995854654@outlook.com",
		"version": "1.0.0",
	})
}
