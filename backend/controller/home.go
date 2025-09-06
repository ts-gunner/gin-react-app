package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/ts-gunner/steins-backend-go/model/response"
)

type HomeHandler struct{}

func (h *HomeHandler) GetAppInfo(c *gin.Context) {
	response.OkWithData(gin.H{
		"author":  "Jun Jian Yang",
		"email":   "yang995854654@outlook.com",
		"version": "1.0.0",
	}, c)
}
