package services

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jinzhu/copier"
	"github.com/ts-gunner/steins-backend-go/global"
	"github.com/ts-gunner/steins-backend-go/model/response"
	"github.com/ts-gunner/steins-backend-go/schema"
)

type AuthService struct{}

func (s *AuthService) CreateToken(user *schema.SystemUser, key string) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":   user.UserId,
		"name": user.Nickname,
	})
	signString, _ := token.SignedString([]byte(key))
	return signString
}

/*
*
校验密码后，用户登录
返回用户信息
*/
func (s *AuthService) Login(user *schema.SystemUser) (*response.SystemUserVo, error) {
	if user == nil {
		return nil, errors.New("用户对象不能为空")
	}
	userVo := &response.SystemUserVo{}
	if err := copier.Copy(userVo, user); err != nil {
		return nil, err
	}
	userVo.Token = s.CreateToken(user, global.SECRET_KEY)

	// 将token存放到redis中
	ctx := context.TODO()
	userVoJson, _ := json.Marshal(userVo)
	global.SBG_REDIS.Set(ctx, global.REDIS_USER_TOKEN+userVo.Token, string(userVoJson), 24*time.Hour)
	return userVo, nil
}

func (s *AuthService) Logout(token string) {
	ctx := context.TODO()
	global.SBG_REDIS.Del(ctx, global.REDIS_USER_TOKEN+token)
}

func (s *AuthService) GetUserInfoByToken(token string) (*response.SystemUserVo, error) {

	result := global.SBG_REDIS.Get(context.Background(), global.REDIS_USER_TOKEN+token)
	infoJson, err := result.Result()
	if err != nil {
		return nil, err
	}
	var infoVo *response.SystemUserVo
	if err := json.Unmarshal([]byte(infoJson), &infoVo); err != nil {
		return nil, err
	}
	return infoVo, nil
}
