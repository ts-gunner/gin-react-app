package request

type SystemDomainPageRequest struct {
	DomainName *string `json:"domain_name"`
	PageRequest
}

type AddDomainRequest struct {
	DomainName string `json:"domain_name" binding:"required"`
}

type UpdateDomainRequest struct {
	DomainId int64 `json:"domain_id" binding:"required"`

	DomainName string `json:"domain_name" binding:"required"`
}
