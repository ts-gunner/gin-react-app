package global

import (
	"github.com/go-redis/redis/v8"
	"github.com/sony/sonyflake/v2"
	"github.com/spf13/viper"
	"github.com/ts-gunner/steins-backend-go/config"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

var (
	SBG_CONFIG     *config.Application
	SBG_VP         *viper.Viper
	SBG_DB         *gorm.DB
	LOGGER         *zap.Logger
	SBG_ID_CREATOR *sonyflake.Sonyflake
	SBG_REDIS      *redis.Client
)
