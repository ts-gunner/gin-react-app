declare namespace API {
  type AddDomainRequest = {
    domain_name: string;
  };

  type AddSystemUserRequest = {
    /** 域id */
    domain_id: number;
    /** 是否为管理员 */
    is_admin: boolean;
    /** 昵称 */
    nickname: string;
    /** 密码 */
    password: string;
    /** 用户名 */
    username: string;
  };

  type CheckResult = {
    result?: boolean;
  };

  type DBConnectionRequest = {
    /** 数据库类型 */
    dbType: string;
    /** 服务器地址 */
    host?: string;
    /** 密码 */
    password: string;
    /** 端口 */
    port?: string;
    /** 用户名 */
    username: string;
  };

  type InitProjectRequest = {
    /** 管理员账号 */
    adminAccount: string;
    /** 管理员密码 */
    adminPassword: string;
    /** 数据库名 */
    dbName: string;
    /** 数据库类型 */
    dbType: string;
    /** 服务器地址 */
    host?: string;
    /** 密码 */
    password: string;
    /** 端口 */
    port?: string;
    /** 用户名 */
    username: string;
  };

  type PageResultResponseSystemUserPageVo = {
    /** 当前页 */
    current?: number;
    /** 每页条数 */
    pageSize?: number;
    /** 数据列表 */
    records?: SystemUserPageVo[];
    /** 总记录数 */
    total?: number;
  };

  type PageResultSchemaSystemDomain = {
    /** 当前页 */
    current?: number;
    /** 每页条数 */
    pageSize?: number;
    /** 数据列表 */
    records?: SystemDomain[];
    /** 总记录数 */
    total?: number;
  };

  type PwdLogin = {
    /** 密码 */
    password: string;
    /** 用户名 */
    username: string;
  };

  type removeDomainInfoParams = {
    /** 域id */
    domain_id: number;
  };

  type ResponseAny = {
    code?: number;
    data?: any;
    msg?: string;
  };

  type ResponseArraySchemaSystemDomain = {
    code?: number;
    data?: SystemDomain[];
    msg?: string;
  };

  type ResponseBool = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type ResponseResponseCheckResult = {
    code?: number;
    data?: CheckResult;
    msg?: string;
  };

  type ResponseResponsePageResultResponseSystemUserPageVo = {
    code?: number;
    data?: PageResultResponseSystemUserPageVo;
    msg?: string;
  };

  type ResponseResponsePageResultSchemaSystemDomain = {
    code?: number;
    data?: PageResultSchemaSystemDomain;
    msg?: string;
  };

  type ResponseResponseSystemUserVo = {
    code?: number;
    data?: SystemUserVo;
    msg?: string;
  };

  type SystemDomain = {
    create_time?: string;
    domain_id?: number;
    domain_name?: string;
    is_delete?: boolean;
    update_time?: string;
  };

  type SystemDomainPageRequest = {
    /** 当前页 */
    current?: number;
    domain_name?: string;
    /** 页数据量 */
    pageSize?: number;
  };

  type SystemUserPageRequest = {
    /** 账户名称 */
    account?: string;
    /** 当前页 */
    current?: number;
    /** 是否管理员 */
    is_admin?: boolean;
    /** 昵称 */
    nickname?: string;
    /** 页数据量 */
    pageSize?: number;
    /** 账号状态 */
    status?: number;
  };

  type SystemUserPageVo = {
    /** 账号 */
    account?: string;
    /** 创建时间 */
    createTime?: string;
    /** 所属域 */
    domainName?: string;
    /** 邮箱 */
    email?: string;
    /** 是否为管理员 */
    isAdmin?: boolean;
    /** 昵称 */
    nickname?: string;
    /** 手机号 */
    phone?: string;
    /** 状态 */
    status?: number;
    /** 用户id */
    userId?: number;
  };

  type SystemUserVo = {
    /** 邮箱 */
    email?: string;
    /** 是否为管理员 */
    isAdmin?: boolean;
    /** 昵称 */
    nickname?: string;
    /** 手机号 */
    phone?: string;
    /** token */
    token?: string;
    /** 用户id */
    userId?: number;
  };

  type UpdateDomainRequest = {
    domain_id: number;
    domain_name: string;
  };
}
