package core

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/ts-gunner/steins-backend-go/global"
)

func RunServer() {
	routerGroup := initRouter()
	fmt.Printf(global.INIT_BANNER, global.SBG_CONFIG.System.Port)
	// 启动web服务
	initServer(global.SBG_CONFIG.System.Port, routerGroup)
}

func initServer(port string, router *gin.Engine) {
	// 创建服务
	server := &http.Server{
		Addr:           fmt.Sprintf(":%s", port),
		Handler:        router,
		ReadTimeout:    5 * time.Minute,
		WriteTimeout:   5 * time.Minute,
		MaxHeaderBytes: 1 << 29,
	}
	go func() {
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Printf("listen: %s\n", err)
			os.Exit(1)
		}
	}()

	// 等待中断信号以优雅地关闭服务器
	quit := make(chan os.Signal, 1)
	// kill (无参数) 默认发送 syscall.SIGTERM
	// kill -2 发送 syscall.SIGINT
	// kill -9 发送 syscall.SIGKILL，但是无法被捕获，所以不需要添加
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	fmt.Println("Shutdown Server ...")

	// 设置5秒的超时时间
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

	defer cancel()
	if err := server.Shutdown(ctx); err != nil {
		fmt.Printf("WEB服务关闭异常%s", err)
	}
}
