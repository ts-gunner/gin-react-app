package core

import "github.com/sony/sonyflake/v2"

func InitIDCreator() *sonyflake.Sonyflake {
	st := sonyflake.Settings{
		BitsSequence: 1,
		MachineID:    nil,
	}

	sf, err := sonyflake.New(st)
	if err != nil {
		panic("创建id生成器失败: " + err.Error())
	}
	return sf
}
