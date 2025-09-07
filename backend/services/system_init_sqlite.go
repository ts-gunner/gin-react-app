package services

import (
	"context"
	"errors"

	"github.com/ts-gunner/steins-backend-go/model/request"
)

type SqliteDBInitHandler struct{}

func (s SqliteDBInitHandler) UpdateConfig(ctx context.Context) error {
	//TODO implement me
	panic("implement me")
}

func (s SqliteDBInitHandler) CreateDB(ctx context.Context, req *request.InitProjectRequest) (context.Context, error) {
	return nil, errors.New("sqlite暂不支持初始化")
}

func (s SqliteDBInitHandler) InitTables(ctx context.Context) error {
	return errors.New("sqlite暂不支持初始化")
}

func (s SqliteDBInitHandler) InitData(ctx context.Context) error {
	return errors.New("sqlite暂不支持初始化")
}
