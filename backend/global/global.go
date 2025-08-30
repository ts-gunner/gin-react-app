package global

import (
	"github.com/spf13/viper"
	"github.com/ts-gunner/steins-backend-go/config"
	"gorm.io/gorm"
)

var (
	SBG_CONFIG *config.Application
	SBG_VP     *viper.Viper
	SBG_DB     *gorm.DB
)
