package auth

import "context"

// 会话登录： loginID
func Login(ctx *context.Context, id interface{}) error {
	return nil
}

// 注销会话
func Logout(ctx *context.Context) error {
	return nil
}

// 获取当前会话是否已经登录, true 已登录， false 未登录
func IsLoggedIn(ctx *context.Context) (bool, error) {
	return true, nil
}

/*
获取当前会话的类型
*/
func GetLoginType(ctx *context.Context) (string, error) {
	return "", nil
}

/*
获取token信息
*/
func GetTokenInfo(ctx *context.Context) (*GTokenInfo, error) {

	return nil, nil
}

/*
* 获取token名称
 */
func TokenName(ctx *context.Context) (string, error) {
	return "", nil
}

/*
*
根据指定token获取对应的账号ID
*/
func GetLoginIDByToken(ctx *context.Context, tokenValue string) (interface{}, error) {

	return nil, nil
}

/*
*
获取当前token剩余存活时间（单位：秒， -1 表示永久有效）
*/
func GetCurrentTokenTTL(ctx *context.Context) int64 {
	return -1
}
