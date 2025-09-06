package core

import (
	"fmt"
	"os"

	"github.com/ts-gunner/steins-backend-go/core/internal"
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/utils"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func InitZapLogger() (logger *zap.Logger) {
	if ok, _ := utils.FolderPathExists(global.SBG_CONFIG.Zap.Director); !ok {
		fmt.Printf("创建日志文件夹 --> %s\n", global.SBG_CONFIG.Zap.Director)
		_ = os.Mkdir(global.SBG_CONFIG.Zap.Director, os.ModePerm)
	}
	level, err := zapcore.ParseLevel(global.SBG_CONFIG.Zap.Level)
	if err != nil {
		level = zapcore.InfoLevel
	}
	logger = zap.New(internal.NewZapCore(level))

	if global.SBG_CONFIG.Zap.ShowLine {
		logger = logger.WithOptions(zap.AddCaller())
	}
	return logger
}
