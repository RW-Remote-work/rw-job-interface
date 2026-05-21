export interface ErrorResponse {
  /**
   * 错误信息
   * 4XX 错误时，detail 字段为错误信息
   * 注意：在业务方中，detail 字段有就Toast， 没有就不 Toast 
   * 5XX 错误时
   * 在业务方中，detail 字段值为空， 因为5XX错误会在API.ts 处理掉， 业务方不用Toast 这个Error
   *  */
  detail: string;
  /**
   * HTTP 状态码
   */
  status: number;
  /**
   * 错误标题
   *  */
  title: string;

  /**
   * HTTP 状态码
   */
  httpStatus: number;
}
