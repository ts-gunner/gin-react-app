package utils

import "reflect"

// StructToMap 利用反射，将结构体转成map
func StructToMap(obj interface{}) map[string]interface{} {
	t := reflect.TypeOf(obj)
	v := reflect.ValueOf(obj)
	var data = make(map[string]interface{})
	for i := 0; i < t.NumField(); i++ {
		if t.Field(i).Tag.Get("mapstructure") != "" {
			data[t.Field(i).Tag.Get("mapstructure")] = v.Field(i).Interface()
		} else {
			data[t.Field(i).Name] = v.Field(i).Interface()
		}
	}
	return data
}
