package test

import (
	"fmt"
	"testing"

	"github.com/ts-gunner/steins-backend-go/utils"
)

func TestEncrypt(t *testing.T) {

	d := utils.EncryptBySha256("e10adc3949ba59abbe56e057f20f883e")
	fmt.Println(d)
}
