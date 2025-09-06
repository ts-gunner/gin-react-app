package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

const (
	DEFAULT_MSG = "成功"
)

func Result(code int, msg string, data interface{}, c *gin.Context) {
	c.JSON(http.StatusOK, Response{code, msg, data})
}

func Ok(c *gin.Context) {
	Result(http.StatusOK, DEFAULT_MSG, nil, c)
}

func OkWithMessage(message string, c *gin.Context) {
	Result(http.StatusOK, message, nil, c)
}

func OkWithData(data interface{}, c *gin.Context) {
	Result(http.StatusOK, DEFAULT_MSG, data, c)
}
