package test

import (
	"fmt"
	"testing"

	"github.com/ts-gunner/steins-backend-go/schema"
	"github.com/ts-gunner/steins-backend-go/services"
)

func TestCreateToken(t *testing.T) {

	service := services.AuthService{}

	sign := service.CreateToken(&schema.SystemUser{
		UserId:   111,
		Nickname: "Steins",
	}, "steins")
	fmt.Println(sign)
}
