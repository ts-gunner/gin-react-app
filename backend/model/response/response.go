package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Type Response[T]
type Response[T any] struct {
	Code int    `json:"code" example:"200"`
	Msg  string `json:"msg" example:"成功"`
	Data T      `json:"data"`
}

const (
	DEFAULT_MSG = "成功"
)

func Result[T any](code int, msg string, data T, c *gin.Context) {
	c.JSON(http.StatusOK, Response[T]{code, msg, data})
}

func Ok(c *gin.Context) {
	Result[any](http.StatusOK, DEFAULT_MSG, nil, c)
}

func OkWithMessage(message string, c *gin.Context) {
	Result[any](http.StatusOK, message, nil, c)
}

func OkWithData[T any](data T, c *gin.Context) {
	Result[T](http.StatusOK, DEFAULT_MSG, data, c)
}

func Fail(message string, c *gin.Context) {
	Result[any](http.StatusBadRequest, message, nil, c)
}

func FailWithCode(code int, message string, c *gin.Context) {
	Result[any](code, message, nil, c)
}
