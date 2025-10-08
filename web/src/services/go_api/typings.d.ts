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
}
