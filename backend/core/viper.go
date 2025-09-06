package core

import (
	"flag"
	"fmt"
	"os"

	"github.com/fsnotify/fsnotify"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"github.com/ts-gunner/steins-backend-go/global"
)

func InitViperConfig() *viper.Viper {
	config := getConfigPath()
	v := viper.New()
	v.SetConfigFile(config)
	err := v.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("读取配置文件失败: %w", err))
	}
	// 监听配置文件
	v.WatchConfig()
	v.OnConfigChange(func(e fsnotify.Event) {
		fmt.Println("配置文件发生改动:", e.Name)
		if err = v.Unmarshal(&global.SBG_CONFIG); err != nil {
			fmt.Printf("动态更新失败: %s\n", err)
		}
		// 重新设置logger
		global.LOGGER = InitZapLogger()
	})
	if err = v.Unmarshal(&global.SBG_CONFIG); err != nil {
		panic(fmt.Errorf("解析配置文件失败: %w", err))
	}

	return v
}

// 获取配置文件路径， 优先级：命令行 > 环境变量 > 默认值
func getConfigPath() (config string) {
	flag.StringVar(&config, "c", "", "choose config file path")
	flag.Parse()
	if config != "" {
		fmt.Printf("正在使用命令行的[-c]参数，config的路径为: %s\n", config)
		return
	}
	if env := os.Getenv(global.ConfigEnv); env != "" {
		config = env
		fmt.Printf("您正在使用 %s 环境变量, config 的路径为 %s\n", global.ConfigEnv, config)
		return
	}

	switch gin.Mode() {
	case gin.DebugMode:
		config = global.ConfigDevelopmentFile
	case gin.ReleaseMode:
		config = global.ConfigProductionFile
	}
	fmt.Printf("您正在使用 gin 的 %s 模式运行, config 的路径为 %s\n", gin.Mode(), config)
	_, err := os.Stat(config)
	if err != nil || os.IsNotExist(err) {
		config = global.ConfigDefaultFile
		fmt.Printf("配置文件路径不存在, 使用默认配置文件路径: %s\n", config)
	}
	return
}
