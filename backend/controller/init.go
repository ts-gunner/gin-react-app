package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/ts-gunner/steins-backend-go/model/response"
)

type InitHandler struct{}

func (h InitHandler) InitProject(c *gin.Context) {
	response.Ok(c)
}
