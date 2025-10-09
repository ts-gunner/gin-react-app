declare namespace API {
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
    /** 总页数 */
    totalPage?: number;
  };

  type PwdLogin = {
    /** 密码 */
    password: string;
    /** 用户名 */
    username: string;
  };

  type ResponseAny = {
    code?: number;
    data?: any;
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

  type ResponseResponseSystemUserVo = {
    code?: number;
    data?: SystemUserVo;
    msg?: string;
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
}
