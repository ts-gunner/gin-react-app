package config

import "path/filepath"

type Sqlite struct {
	CommonDB `mapstructure:",squash" yaml:",inline"`
}

func (s *Sqlite) Dsn() string {
	return filepath.Join(s.Path, s.DbName+".db")
}
