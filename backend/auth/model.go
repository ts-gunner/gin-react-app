package auth

type GTokenInfo struct {
	TokenName      string
	TokenValue     string
	IsLogin        bool
	LoginId        bool
	TokenTimeout   int64
	SessionTimeout int64
	Tag            string
}

type GTokenConfig struct {
	// token名称
	TokenName string `mapstructure:"token-name" json:"token-name" yaml:"token-name"`
	// token有效期（单位秒），默认30天，-1代表永久不过期
	Timeout int64 `mapstructure:"timeout" json:"timeout" yaml:"timeout"`
	// 是否允许同一账号多地同时登录（true：允许一起登录，false：新登录挤掉旧登录）
	IsConcurrent bool `mapstructure:"is-concurrent" json:"is-concurrent" yaml:"is-concurrent"`
	// 多人登录同一账号时，是否共用一个token（true时所有登录共用一个token，为false时每次登录新建一个token）
	IsShare bool `mapstructure:"is-share" json:"is-share" yaml:"is-share"`
	// token风格（默认可取值：uuid、simple-uuid、random-32、random-64、random-128）
	TokenStyle string `mapstructure:"token-style" json:"token-style" yaml:"token-style"`
}
