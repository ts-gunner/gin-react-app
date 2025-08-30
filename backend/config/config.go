package config

type Application struct {
	System System `mapstructure:"system" json:"system" yaml:"system"` // 系统配置
	Mysql  Mysql  `mapstructure:"mysql" json:"mysql" yaml:"mysql"`    // mysql相关配置
	Pgsql  Pgsql  `mapstructure:"pgsql" json:"pgsql" yaml:"pgsql"`    // postgresql 相关配置
	Sqlite Sqlite `mapstructure:"sqlite" json:"sqlite" yaml:"sqlite"` // sqlite相关配置

}
