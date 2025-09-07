package services

import (
	"context"
	"errors"

	"github.com/ts-gunner/steins-backend-go/model/request"
)

type PostgresDBInitHandler struct{}

func (p PostgresDBInitHandler) UpdateConfig(ctx context.Context) error {
	//TODO implement me
	panic("implement me")
}

func (p PostgresDBInitHandler) CreateDB(ctx context.Context, req *request.InitProjectRequest) (context.Context, error) {
	return nil, errors.New("postgres暂不支持初始化")
}

func (p PostgresDBInitHandler) InitTables(ctx context.Context) error {
	return errors.New("postgres暂不支持初始化")
}

func (p PostgresDBInitHandler) InitData(ctx context.Context) error {
	return errors.New("postgres暂不支持初始化")
}
