package core

import (
	"context"
	"fmt"

	"github.com/go-redis/redis/v8"
	"github.com/ts-gunner/steins-backend-go/global"
)

func RedisConnection() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     global.SBG_CONFIG.Redis.Addr(),
		Password: global.SBG_CONFIG.Redis.Password,
		DB:       global.SBG_CONFIG.Redis.DB,
	})
	ctx := context.TODO()
	status := client.Ping(ctx)
	if status.Err() != nil {
		panic(fmt.Errorf("redis connection fail: %v", status.Err()))
	}
	return client
}
