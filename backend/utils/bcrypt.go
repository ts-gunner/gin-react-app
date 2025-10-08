package utils

import (
	"crypto/sha256"
	"encoding/hex"
)

// 使用sha256加密, 64个字符
func EncryptBySha256(str string) string {
	hashStr := sha256.Sum256([]byte(str))
	return hex.EncodeToString(hashStr[:])
}
