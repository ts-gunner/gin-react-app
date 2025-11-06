package internal

import (
	"os"
	"time"

	"github.com/ts-gunner/steins-backend-go/global"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type CustomZapCore struct {
	level zapcore.Level
	zapcore.Core
}

func NewZapCore(level zapcore.Level) *CustomZapCore {
	entity := &CustomZapCore{level: level}
	syncer := entity.WriteSyncer()
	// 过滤掉小于level等级的日志
	levelEnabler := zap.LevelEnablerFunc(func(l zapcore.Level) bool {
		return l >= level
	})
	entity.Core = zapcore.NewCore(global.SBG_CONFIG.Zap.Encoder(), syncer, levelEnabler)
	return entity
}

func (c *CustomZapCore) WriteSyncer() zapcore.WriteSyncer {
	cutter := NewCutter(
		global.SBG_CONFIG.Zap.Director,
		global.SBG_CONFIG.Zap.Level,
		CutterWithLayout(time.DateOnly),
		CutterWithFormat(),
	)
	if global.SBG_CONFIG.Zap.LogInConsole {
		return zapcore.AddSync(zapcore.NewMultiWriteSyncer(os.Stdout, cutter))
	}
	return zapcore.AddSync(cutter)
}
