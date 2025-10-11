package request

type SystemDomainPageRequest struct {
	DomainName *string `json:"domainName"`
	PageRequest
}

type AddDomainRequest struct {
	DomainName string `json:"domainName" binding:"required"`
}

type UpdateDomainRequest struct {
	DomainId int64 `json:"domainId" binding:"required"`

	DomainName string `json:"domainName" binding:"required"`
}
