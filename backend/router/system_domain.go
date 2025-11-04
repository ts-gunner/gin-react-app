package router

import "github.com/gin-gonic/gin"

type SystemDomainRouter struct{}

func (r *SystemDomainRouter) InitSystemDomainRouter(Router *gin.RouterGroup) {
	router := Router.Group("domain")
	{
		router.POST("get_page", systemDomainHandler.GetDomainInfoPage)
		router.GET("list_domains", systemDomainHandler.ListDomains)
		router.POST("add", systemDomainHandler.AddSystemDomain)
		router.POST("update", systemDomainHandler.UpdateDomainInfo)
		router.POST("remove", systemDomainHandler.RemoveDomainInfo)
	}
}
