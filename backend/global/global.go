package global

import (
	"github.com/spf13/viper"
	"github.com/ts-gunner/steins-backend-go/config"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

var (
	SBG_CONFIG *config.Application
	SBG_VP     *viper.Viper
	SBG_DB     *gorm.DB
	LOGGER     *zap.Logger
)
