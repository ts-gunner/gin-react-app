package config

import "fmt"

type Pgsql struct {
	CommonDB `yaml:",inline" mapstructure:",squash"`
}

func (p *Pgsql) Dsn() string {
	return fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai",
		p.Path, p.Username, p.Password, p.DbName, p.Port,
	)
}
