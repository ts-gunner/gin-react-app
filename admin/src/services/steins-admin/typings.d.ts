declare namespace API {
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

  type ResponseResponseCheckResult = {
    code?: number;
    data?: CheckResult;
    msg?: string;
  };

  type ResponseResponseSystemUserVo = {
    code?: number;
    data?: SystemUserVo;
    msg?: string;
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
