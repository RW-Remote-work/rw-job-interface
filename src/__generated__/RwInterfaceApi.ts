/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UpdateSocialMediaRequest {
  /**
   * 公众号
   * @example "xxxx"
   */
  publicAccounts?: string;
  /**
   * 小红书ID
   * @example "xxxx"
   */
  redId?: string;
  /**
   * instagram账号
   * @example "xxxx"
   */
  instagramId?: string;
}

export interface UpdateSelfIntroductionRequest {
  /**
   * 自我描述
   * @example "我是一個很棒的人"
   */
  selfIntroduction?: string;
}

export interface UpdateUserDisplayNameRequest {
  /**
   * 用户昵称
   * @example "江南风景"
   */
  displayName?: string;
}

export interface UpdateAvatarResponse {
  /**
   * 头像地址
   * @example "https://rwws-avatar.s3.ap-northeast-1.amazonaws.com/avatars/2021/06/01/1622520000000.jpg"
   */
  avatarUrl?: string;
}

export interface UpdateUserAvatarUrlRequest {
  /**
   * 用户头像URL
   * @example "https://xxx/xxx.png"
   */
  avatarUrl?: string;
}

export interface AddUserRegionRequest {
  /**
   * 国家ID
   * @format int64
   * @example 1
   */
  countryId: number;
  /**
   * 城市ID
   * @format int64
   * @example 1
   */
  cityId: number;
}

export interface ResetPasswordRequest {
  /**
   * 邮件地址
   * @example "abc@hotmail.com"
   */
  email: string;
  /**
   * token
   * @example "123456"
   */
  token: string;
  /**
   * 密码
   * @example "123456"
   */
  password: string;
}

export interface AddUserCountryRequest {
  /**
   * 国家ID
   * @format int64
   * @example 1
   */
  countryId: number;
}

export interface SaveUserAuthorityRequest {
  /**
   * 权限
   * @maxItems 2147483647
   * @minItems 1
   * @example "SUPER_ADMIN"
   */
  authorityList?: (
    | "超级管理员"
    | "管理员"
    | "普通用户"
    | "匿名用户"
    | "贝壳管理"
    | "内容管理"
    | "用户管理"
    | "简历管理"
  )[];
}

export interface ResumeResponse {
  /**
   * 简历id
   * @format int64
   */
  id?: number;
  /**
   * 用户id
   * @format int64
   */
  userId?: number;
  /** 学历 */
  degree?: string;
  /** 职业 */
  career?: string;
  /** 当前职业状态 */
  careerStatus?: string;
  /** 行业 */
  industry?: string;
  /** 经验 */
  experience?: string;
  /** 月薪 */
  monthlySalary?: string;
  /** 技能 */
  skill?: string;
  /** 关注方向 */
  focusDirection?: string;
  /** 简历状态 */
  status?: string;
  /** 自我介绍 */
  profile?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updateTime?: string;
  /** 作品集 */
  portfolio?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  mobile?: string;
  /** 微信 */
  wechat?: string;
  /** 简历文件路径 */
  pdfUrl?: string;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 是否在人才库 */
  inTalentPool?: boolean;
  /** 时薪 */
  hourSalary?: string;
  /** 周薪 */
  weeklyWorkHours?: string;
  /** 语言能力 */
  userLanguage?: UserLanguageDTO[];
}

/** 语言能力 */
export interface UserLanguageDTO {
  language?: string;
  /** @format int32 */
  listen?: number;
  /** @format int32 */
  speaking?: number;
  /** @format int32 */
  reading?: number;
  /** @format int32 */
  writing?: number;
}

export interface GetVerifyCodeRequest {
  /**
   * 邮箱
   * @example "test@163.com"
   */
  email: string;
}

export interface CreateUserAvatarUrlAndDisplayNameRequest {
  /**
   * 用户头像URL
   * @example "https://xxx/xxx.png"
   */
  avatarUrl?: string;
  /**
   * 用户昵称
   * @example "https://xxx/xxx.png"
   */
  displayName?: string;
}

export interface ResetPasswordEmailLinkRequest {
  /**
   * 邮件地址
   * @example "abc@hotmail.com"
   */
  email: string;
}

export interface AddUserLabelRequest {
  /**
   * 标签名称
   * @example "靠天吃饭自由人"
   */
  labelName: string;
}

export interface AddHobbyRequest {
  name: string;
}

export interface RegisterRequest {
  /**
   * 邮箱
   * @example "test@163.com"
   */
  email: string;
  /**
   * 验证码
   * @example "123456"
   */
  code: string;
  /**
   * 密码
   * @example "123456"
   */
  password: string;
  /**
   * 邀请码
   * @example "D047CC"
   */
  invitationCode?: string;
}

export interface RegisterResponse {
  accessToken?: string;
}

/** 下线职位接口bean */
export interface OfflineJobRequest {
  /** 下线原因 */
  offlineReason: string;
}

export interface JobApplyResponse {
  /** 投递邮箱 */
  deliverEmail?: string;
  /** 投递微信号 */
  deliverWechat?: string;
  /** 投递telegram */
  deliverTelegram?: string;
  /** 投递网址 */
  deliverWebsite?: string;
  /**
   * 今日申请岗位次数
   * @format int64
   */
  todayCount?: number;
}

/** 分页查询职位列表接口bean */
export interface PagingJobRequest {
  /** 职位分类ID */
  jobClassIdList?: number[];
  /** 工作类型，JobType */
  typeList?: ("REMOTE_FULL_TIME" | "REMOTE_PART_TIME" | "REMOTE_INTERN" | "PROJECT_COOP" | "UNDEFINED")[];
  /**
   * 国家/地区ID
   * @format int64
   */
  countryId?: number;
  /** 岗位关键字 */
  name?: string;
  /**
   * 发布者ID
   * @format int64
   */
  publisherId?: number;
  /**
   * 发布日期
   * @format date
   */
  publishDate?: string;
  /**
   * 是否推荐岗位
   * @format int32
   */
  recommendFlag?: number;
}

export interface IPagePagingJobResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingJobResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

/** 职位信息 */
export interface JobDTO {
  /**
   * 职位ID
   * @format int64
   */
  id?: number;
  /** 职位名称 */
  name?: string;
  /**
   * 职位分类ID
   * @format int64
   */
  jobClassId?: number;
  /** 工作类型，JobType */
  type?: "REMOTE_FULL_TIME" | "REMOTE_PART_TIME" | "REMOTE_INTERN" | "PROJECT_COOP" | "UNDEFINED";
  /**
   * 国家/地区ID
   * @format int64
   */
  countryId?: number;
  /**
   * 薪资币种
   * @format int64
   */
  currencyId?: number;
  /**
   * 最低薪资
   * @format int64
   */
  salaryMin?: number;
  /**
   * 最高薪资
   * @format int64
   */
  salaryMax?: number;
  /** 薪资类型，JobSalaryType */
  salaryType?: "DAY_PAY" | "MONTHLY_PAY" | "YEARLY_PAY" | "HOUR_PAY" | "WEEKLY_PAY" | "UNKNOWN_PAY";
  /** 职位职责 */
  duty?: string;
  /** 职位要求 */
  requirement?: string;
  /** 公司/团队介绍 */
  companyInfo?: string;
  /** 职位状态, PENDING_REVIEW:待审核，ONLINE:已上线，OFFLINE:已下线, DENY：审核未通过 */
  status?: "PENDING_REVIEW" | "ONLINE" | "OFFLINE" | "DENY";
  /**
   * 发布者ID
   * @format int64
   */
  publisherId?: number;
  /**
   * 发布时间
   * @format date-time
   */
  publishTime?: string;
  /** 下线原因 */
  offlineReason?: string;
  /** 岗位备注 */
  remark?: string;
  /** 发布人类型 */
  publisherType?: "RECRUITER" | "MOVER" | "LINKEDIN";
  /** 岗位来源 */
  source?: "OFFICIAL_WEBSITE" | "CRAWLER" | "LINKEDIN" | "RAPID" | "WEB3_CAREER";
  /**
   * 是否推荐岗位，1是0否
   * @format int32
   */
  recommendFlag?: number;
  /** 职位分类名称 */
  jobClassName?: string;
  /** 薪资币种名称 */
  currencyName?: string;
  /** 薪资币种代码 */
  currencyCode?: string;
  /** 国家/地区名称 */
  countryName?: string;
  /** 国家/地区英文名称 */
  countryEngName?: string;
  /** 发布者名称 */
  publisherName?: string;
  /** 发布者头像 */
  publisherAvatar?: string;
}

/** 标签列表 */
export interface Label {
  /**
   * 标签ID
   * @format int64
   */
  id?: number;
  /** 标签名称 */
  name?: string;
  /** 标签类型 */
  type?: "USER" | "NOMAD" | "JOB";
}

/** 分页查询职位列表接口bean */
export interface PagingJobResponse {
  /** 职位信息 */
  job?: JobDTO;
  /**
   * 收藏数量
   * @format int64
   */
  favoriteCount?: number;
  /** 是否收藏 */
  isFavorite?: boolean;
  /** 是否申请 */
  isApply?: boolean;
  /** 标签列表 */
  labels?: Label[];
  /** 是否模糊 */
  blurEffect?: boolean;
  /**
   * 今日已查看岗位
   * @format int32
   */
  toDayViewCount?: number;
  /**
   * AI匹配分
   * @format float
   */
  matchScore?: number;
  /** 优化后的简历地址 */
  optimizedResumeUrl?: string;
}

/** 时间范围 */
export interface DateRange {
  /** @format date-time */
  start: string;
  /** @format date-time */
  end: string;
}

/** 分页查询我发布的职位列表接口bean */
export interface PagingMyJobRequest {
  /** 时间范围 */
  range?: DateRange;
}

/** 分页查询订阅职位列表接口bean */
export interface PagingJobSubscribeRequest {
  /** 职位分类ID */
  jobClassIds?: number[];
  /** 工作类型，JobType */
  types?: string[];
  /** 国家/地区ID */
  countryIds?: number[];
  /** 岗位关键字 */
  keywords?: string[];
  /**
   * 发布日期
   * @format date-time
   */
  publishTimeAfter?: string;
  /** 排序字段：publish_time ASC */
  sortBy?: string;
}

/** 添加/修改职位接口bean */
export interface AddJobRequest {
  /**
   * 岗位ID，修改时必须
   * @format int64
   */
  id?: number;
  /** 岗位名称 */
  name: string;
  /**
   * 职位分类ID
   * @format int64
   */
  jobClassId?: number;
  /** 工作类型，JobType */
  type?: "REMOTE_FULL_TIME" | "REMOTE_PART_TIME" | "REMOTE_INTERN" | "PROJECT_COOP" | "UNDEFINED";
  /**
   * 国家/地区ID
   * @format int64
   */
  countryId?: number;
  /** 邮箱 */
  deliverEmail?: string;
  /** 微信号 */
  deliverWechat?: string;
  /** Telegram */
  deliverTelegram?: string;
  /** 网址 */
  deliverWebsite?: string;
  /** 薪资类型，JobSalaryType */
  salaryType?: "DAY_PAY" | "MONTHLY_PAY" | "YEARLY_PAY" | "HOUR_PAY" | "WEEKLY_PAY" | "UNKNOWN_PAY";
  /**
   * 薪资币种ID
   * @format int64
   */
  currencyId?: number;
  /**
   * 薪资最小值
   * @format int64
   */
  salaryMin?: number;
  /**
   * 薪资最大值
   * @format int64
   */
  salaryMax?: number;
  /** 岗位职责 */
  duty: string;
  /** 岗位要求 */
  requirement: string;
  /** 公司/团队介绍 */
  companyInfo?: string;
  /** 岗位备注 */
  remark?: string;
  /** 发布人类型 */
  publisherType?: "RECRUITER" | "MOVER" | "LINKEDIN";
  /** 岗位来源 */
  source?: "OFFICIAL_WEBSITE" | "CRAWLER" | "LINKEDIN" | "RAPID" | "WEB3_CAREER";
  /** 职位标签ID列表 */
  jobLabelIds?: number[];
}

/** 批量导入职位接口bean */
export interface BatchAddJobRequest {
  /** 匹配密钥 */
  matchSecret: string;
  /** 职位标签ID列表 */
  jobs?: AddJobRequest[];
}

export interface UploadAvatarResponse {
  /**
   * 头像地址
   * @example "https://rwws-avatar.s3.ap-northeast-1.amazonaws.com/avatars/0000bb8d-afe6-4613-a3a3-dede38712332.jpeg"
   */
  avatarUrl?: string;
}

export interface LoginResponse {
  access_token?: string;
  /** @format date-time */
  expires_at?: string;
}

export interface ThirdLoginModel {
  source?: string;
  uuid?: string;
  username?: string;
  avatar?: string;
  password?: string;
  redirectUri?: string;
  state?: string;
  userId?: string;
}

export interface PagingShellFlowRecordRequest {
  /** 时间范围 */
  dateRange?: DateRange;
  /** 查询相关邮箱 */
  email?: string;
  /** 查询操作人姓名 */
  operateUserName?: string;
}

export interface IPagePagingShellFlowRecordResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingShellFlowRecordResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface PagingShellFlowRecordResponse {
  /**
   * 贝壳记录id
   * @format int64
   */
  id?: number;
  /** 变动类型 加或减 */
  type?: "PLUS" | "MINUS";
  /**
   * 记录时间
   * @format date-time
   */
  time?: string;
  /**
   * 数量
   * @format int64
   */
  quantity?: number;
  /** 原因备注 */
  reason?: string;
  /** 更新范围 */
  scope?: "ALL_USER" | "TARGET_USER";
  /** 原因类型(枚举 */
  reasonType?:
    | "GET_JOB_CONTACT"
    | "ATTEND_OFFLINE_ACTIVITY"
    | "ATTEND_ONLINE_ACTIVITY"
    | "LIVE_OFFLINE_SPACE"
    | "APPLY_JOB"
    | "OTHER"
    | "UNLOCK_RESUME_DETAIL"
    | "FULFILL_INFO"
    | "ADD_JOB"
    | "BUY_SHELL"
    | "ADD_RESUME"
    | "INVITATION";
  /** 操作人 */
  operateUserName?: string;
  /** 邮箱 */
  emails?: string[];
}

export interface PagingShellDistributionRequest {
  /** 时间范围 */
  dateRange?: DateRange;
  /** 查询相关邮箱 */
  email?: string;
  /** 查询操作用户名 */
  operateUserName?: string;
}

export interface IPagePagingShellDistributionResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingShellDistributionResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface PagingShellDistributionResponse {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  time?: string;
  /** @format int64 */
  quantity?: number;
  reason?: string;
  scope?: "ALL_USER" | "TARGET_USER";
  operateUserName?: string;
  emails?: string;
}

export interface AddShellDistributionRequest {
  scope: "ALL_USER" | "TARGET_USER";
  emails?: string[];
  /**
   * @format int64
   * @min 1
   */
  quantity: number;
  /**
   * @minLength 0
   * @maxLength 200
   */
  reason?: string;
  /** 发放原因类型 */
  reasonType?: "FULFILL_INFO" | "ADD_JOB" | "BUY_SHELL" | "INVITATION" | "ADD_RESUME" | "OTHER";
}

export interface IPagePagingShellDeductionResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingShellDeductionResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface PagingShellDeductionResponse {
  /**
   * 贝壳记录id
   * @format int64
   */
  id?: number;
  /**
   * 扣除时间
   * @format date-time
   */
  time?: string;
  /**
   * 数量
   * @format int64
   */
  quantity?: number;
  /** 原因备注 */
  reason?: string;
  /** 原因备注 */
  scope?: "ALL_USER" | "TARGET_USER";
  /** 操作人用户名 */
  operateUserName?: string;
  /** 操作人用户名 */
  emails?: string[];
  /** 扣除原因类型枚举 */
  reasonType?:
    | "GET_JOB_CONTACT"
    | "ATTEND_OFFLINE_ACTIVITY"
    | "ATTEND_ONLINE_ACTIVITY"
    | "LIVE_OFFLINE_SPACE"
    | "APPLY_JOB"
    | "UNLOCK_RESUME_DETAIL"
    | "JOB_SUBSCRIBE"
    | "OTHER";
}

export interface DeDuctShellRequest {
  /** 扣除范围 */
  scope: "ALL_USER" | "TARGET_USER";
  /** 岗位抵扣原因类型 */
  reasonType:
    | "GET_JOB_CONTACT"
    | "ATTEND_OFFLINE_ACTIVITY"
    | "ATTEND_ONLINE_ACTIVITY"
    | "LIVE_OFFLINE_SPACE"
    | "APPLY_JOB"
    | "UNLOCK_RESUME_DETAIL"
    | "JOB_SUBSCRIBE"
    | "OTHER";
  /** 用户邮箱 */
  emails?: string[];
  /**
   * 数量
   * @format int64
   * @min 1
   */
  quantity: number;
  /**
   * 备注
   * @minLength 0
   * @maxLength 200
   */
  reason?: string;
}

export interface PagingShellAccountRequest {
  email?: string;
  displayName?: string;
}

export interface IPagePagingShellAccountResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingShellAccountResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface PagingShellAccountResponse {
  /**
   * 账户id
   * @format int64
   */
  id?: number;
  /**
   * 用户id
   * @format int64
   */
  userId?: number;
  /** 邮箱 */
  email?: string;
  /** 昵称 */
  displayName?: string;
  /**
   * 总数
   * @format int64
   */
  total?: number;
  /**
   * 赚取数
   * @format int64
   */
  earnedAmount?: number;
  /**
   * 购买数
   * @format int64
   */
  purchasedAmount?: number;
}

/** RSS源类型 */
export interface RssTypeForm {
  /** 源类型名称 */
  name: string;
  /** 源类型URL */
  url?: string;
  /** 源类型ICON SVG文件 */
  icon?: string;
}

/** RSS源 */
export interface RssSourceForm {
  /** RSS源名称 */
  name: string;
  /** RSS源URL */
  url: string;
  /**
   * RSS源类型ID
   * @format int64
   */
  typeId: number;
}

export interface ToPayRequest {
  /** 单号，订单号或者交易号 */
  sn: string;
  /** 支付插件PluginId */
  paymentPluginId: string;
  /** 支付模式 */
  payMode: "normal" | "qr";
  /** 调用客户端 */
  clientType: "PC" | "H5" | "APP" | "MINI";
  /** 交易类型,购买会员套餐使用 BUY_MEMBERSHIP */
  tradeType: "ORDER" | "BUY_SHELL" | "BUY_MEMBERSHIP" | "BUY_RECOMMEND_JOB" | "debugger";
  /**
   * 币种
   * @format int64
   */
  currencyId: number;
}

export interface PagingPaymentMethodRequest {
  methodName?: string;
}

export interface PagingPaymentMethodResponse {
  /**
   * 支付方式id
   * @format int64
   */
  id?: number;
  /** 支付方式名称 */
  methodName?: string;
  /** 支付插件名称 */
  pluginId?: string;
  /** 支付方式图片 */
  image?: string;
  /**
   *  是否支持原路退回 0否1是
   * @format int32
   */
  isRetrace?: number;
}

export interface AddNomadLabelRequest {
  /** 标签名称 */
  name: string;
  /** 备注 */
  remark?: string;
}

export interface UseMembershipRedeemCodeRequest {
  /** 会员兑换码 */
  code: string;
}

export interface BuyMemberShipResponse {
  /** @format int64 */
  id?: number;
  /** 会员订单号 */
  orderSn?: string;
  /**
   * 用户id
   * @format int64
   */
  userId?: number;
  /** 会员类型 */
  membershipType?: "SuperIndividual" | "GlobalNomad";
  /** 会员订单状态 */
  status?: "ACTIVE" | "EXPIRE" | "CANCELLED" | "PAUSE" | "NOTPAY" | "CLOSED" | "REFUND";
  /** 会员来源类型 */
  sourceType?: "PURCHASE" | "ADMIN_GIFT" | "SYSTEM" | "REDEEM_CODE" | "OTHER";
  /**
   * 会员套餐id
   * @format int64
   */
  packageId?: number;
  /**
   * 会员订单权益生效开始时间
   * @format date-time
   */
  startDate?: string;
  /**
   * 会员订单权益生效结束时间
   * @format date-time
   */
  endDate?: string;
  /** 订单金额 */
  price?: number;
  /**
   * 币种id
   * @format int64
   */
  currencyId?: number;
  /** 创建人 */
  createdBy?: string;
  /**
   * 下单时间
   * @format date-time
   */
  createdDate?: string;
  /** 更新人 */
  updatedBy?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updatedTime?: string;
  /** 备注 */
  remark?: string;
}

export interface BuyMemberShipRequest {
  /**
   * 会员套餐id
   * @format int64
   */
  packageId: number;
}

export interface EmailRequest {
  /**
   * 目的邮箱列表，所有邮箱写all
   * @example ["example1@example.com","example2@example.com"]
   */
  toList?: string[];
  /**
   * 邮件主题
   * @example "这是一个测试邮件"
   */
  subject?: string;
  /**
   * 邮件内容
   * @example "这是一个测试邮件的内容"
   */
  content?: string;
  /**
   * 邮件模板key，不用模版时空着
   * @example "template_key"
   */
  templateKey?: string;
}

export interface AddJobSubscribeRequest {
  /**
   * 邮件通知类型：0:不通知，1：每天，2：每周
   * @format int32
   */
  alarmType: number;
  /** 职位分类ID */
  jobClassIds: number[];
  /** 工作类型，JobType */
  types: string[];
  /** 国家/地区ID */
  countryIds?: number[];
  /** 岗位关键字 */
  keywords: string[];
}

export interface AddJobLabelRequest {
  name: string;
  remark?: string;
}

export interface AddJobClassRequest {
  /** 分类名称 */
  name: string;
}

export interface AddFavoriteRequest {
  type: "REMOTE_WORK" | "NOMAD_ACTIVITY" | "SHARED_OFFICE" | "NOMAD_BASE" | "RESIDE_ABROAD";
  /** @format date-time */
  time: string;
  /** @format int64 */
  relatedDataId: number;
}

export interface Currency {
  /** @format int64 */
  id?: number;
  name?: string;
  code?: string;
}

export interface UpdateUserCommunityRankRequest {
  /**
   * 社区等级ID
   * @format int64
   * @example 1
   */
  communityRankId: number;
}

export interface ResumeCreateUpdateRequest {
  /** 学位 */
  degree: "BACHELOR" | "MASTER" | "DOCTORATE" | "MBA" | "COLLEGE" | "NEED_UNLOCK" | "OTHER";
  /** 职业 */
  career: string;
  /** 职业状态 */
  careerStatus: "STUDENT" | "FULL_TIME_JOB_OPEN" | "FULL_TIME_JOB_CLOSED" | "FREELANCER";
  /** 行业 */
  industry: string;
  /** 经验 */
  experience:
    | "STUDENT"
    | "LESS_THAN_3_YEARS"
    | "THREE_TO_FIVE_YEARS"
    | "FIVE_TO_TEN_YEARS"
    | "NEED_UNLOCK"
    | "OVER_TEN_YEARS";
  /** 月薪 */
  monthlySalary:
    | "BELOW_5K"
    | "BETWEEN_5K_AND_10K"
    | "BETWEEN_10K_AND_20K"
    | "BETWEEN_20K_AND_30K"
    | "BETWEEN_30K_AND_50K"
    | "BETWEEN_50K_AND_100K"
    | "NEED_UNLOCK"
    | "ABOVE_100K";
  /** 技能 */
  skill: string;
  /** 关注方向 */
  focusDirection: string;
  /** 自我介绍 */
  profile: string;
  /** 作品集 */
  portfolio?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  mobile?: string;
  /** 微信 */
  wechat?: string;
  /** 简历文件路径 */
  pdfUrl?: string;
  /** 是否隐藏 */
  hidden: boolean;
  /** 是否加入人才库 */
  inTalentPool: boolean;
  /** 时薪 */
  hourSalary:
    | "RANGE_50_100"
    | "RANGE_100_150"
    | "RANGE_150_200"
    | "RANGE_250_300"
    | "RANGE_300_400"
    | "RANGE_400_500"
    | "RANGE_500_700"
    | "RANGE_700_1000"
    | "RANGE_ABOVE_1000";
  /** 周薪 */
  weeklyWorkHours:
    | "BELOW_10_HOURS"
    | "BETWEEN_10_AND_20_HOURS"
    | "BETWEEN_20_AND_30_HOURS"
    | "BETWEEN_30_AND_40_HOURS"
    | "ABOVE_40_HOURS";
  /** 语言能力 */
  userLanguage: UserLanguageDTO[];
}

export interface ApproveResumeRequest {
  status: string;
  reason?: string;
}

export interface ResumeSearchRequest {
  keyword?: string;
}

export interface IPageResumeSummaryResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: ResumeSummaryResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface ResumeSummaryResponse {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number;
  displayName?: string;
  skill?: string;
  focusDirection?: string;
  profile?: string;
  /** @format date-time */
  lastLoginTime?: string;
}

export interface UploadResumeResponse {
  /**
   * 简历文件地址
   * @example "https://rwws-avatar.s3.ap-northeast-1.amazonaws.com/resumes/0000bb8d-afe6-4613-a3a3-dede38712332.pdf"
   */
  resumeUrl?: string;
}

export interface AddMemberShipPackageRequest {
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 套餐名称 */
  name: string;
  /** 会员类型 */
  membershipType: "SuperIndividual" | "GlobalNomad";
  /** 套餐价格 */
  price: number;
  /**
   * 会员时长（单位：天）
   * @format int32
   */
  durationDays: number;
  /** 套餐描述 */
  description: string;
  /**
   * 套餐可购买开始时间
   * @format date-time
   */
  validFrom?: string;
  /**
   * 套餐可购买结束时间
   * @format date-time
   */
  validTo?: string;
  /** 创建人 */
  createdBy?: string;
  /**
   * 修改时间
   * @format date-time
   */
  createdTime?: string;
  /** 更新人 */
  updatedBy?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updatedTime?: string;
  /**
   * 币种Id
   * @format int64
   */
  currencyId?: number;
  currencyPriceList?: MembershipPackageCurrency[];
  active?: boolean;
}

export interface MembershipPackageCurrency {
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 关联的会员套餐ID
   * @format int64
   */
  packageId?: number;
  /**
   * 币种ID
   * @format int64
   */
  currencyId?: number;
  /** 该币种对应的价格 */
  price?: number;
  /** 创建人 */
  createdBy?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createdTime?: string;
  /** 修改人 */
  updatedBy?: string;
  /**
   * 修改时间
   * @format date-time
   */
  updatedTime?: string;
}

/** 审核职位接口bean */
export interface AddJobApproveRequest {
  /** 审核状态, ADOPT:通过, REJECT:拒绝 */
  status: "ADOPT" | "REJECT";
  /** 拒绝原因 */
  reason?: string;
}

/** 分页查询职位审核列表接口bean */
export interface PagingJobApproveRequest {
  /** 时间范围 */
  range?: DateRange;
  /** 关键字（昵称/邮箱/JOBID） */
  keyword?: string;
  /** 岗位来源 */
  source?: "OFFICIAL_WEBSITE" | "CRAWLER" | "LINKEDIN" | "RAPID" | "WEB3_CAREER";
  /**
   * 国家/地区ID
   * @format int64
   */
  countryId?: number;
  /**
   * 职位分类ID
   * @format int64
   */
  jobClassId?: number;
  /** 工作类型（1:全职远程/2:兼职远程） */
  type?: "REMOTE_FULL_TIME" | "REMOTE_PART_TIME" | "REMOTE_INTERN" | "PROJECT_COOP" | "UNDEFINED";
  /**
   * 是否推荐岗位
   * @format int32
   */
  recommendFlag?: number;
}

export interface IPagePagingJobApproveResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingJobApproveResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

/** 审核记录 */
export interface JobApproveRecord {
  /** 审核人 */
  userName?: string;
  /**
   * 审核时间
   * @format date-time
   */
  time?: string;
  /** 审核状态 */
  status?: "ADOPT" | "REJECT";
  /** 审核原因 */
  reason?: string;
}

/** 分页查询职位审核列表接口bean */
export interface PagingJobApproveResponse {
  /**
   * 职位ID
   * @format int64
   */
  id?: number;
  /** 职位名称 */
  name?: string;
  /**
   * 职位分类ID
   * @format int64
   */
  jobClassId?: number;
  /** 工作类型，JobType */
  type?: "REMOTE_FULL_TIME" | "REMOTE_PART_TIME" | "REMOTE_INTERN" | "PROJECT_COOP" | "UNDEFINED";
  /**
   * 国家/地区ID
   * @format int64
   */
  countryId?: number;
  /**
   * 薪资币种
   * @format int64
   */
  currencyId?: number;
  /**
   * 最低薪资
   * @format int64
   */
  salaryMin?: number;
  /**
   * 最高薪资
   * @format int64
   */
  salaryMax?: number;
  /** 薪资类型，JobSalaryType */
  salaryType?: "DAY_PAY" | "MONTHLY_PAY" | "YEARLY_PAY" | "HOUR_PAY" | "WEEKLY_PAY" | "UNKNOWN_PAY";
  /** 职位职责 */
  duty?: string;
  /** 职位要求 */
  requirement?: string;
  /** 公司/团队介绍 */
  companyInfo?: string;
  /** 岗位备注 */
  remark?: string;
  /** 发布人类型 */
  publisherType?: "RECRUITER" | "MOVER" | "LINKEDIN";
  /** 邮箱 */
  deliverEmail?: string;
  /** 微信号 */
  deliverWechat?: string;
  /** Telegram */
  deliverTelegram?: string;
  /** 网址 */
  deliverWebsite?: string;
  /** 职位状态, PENDING_REVIEW:待审核，ONLINE:已上线，OFFLINE:已下线, DENY：审核未通过 */
  status?: "PENDING_REVIEW" | "ONLINE" | "OFFLINE" | "DENY";
  /**
   * 发布者ID
   * @format int64
   */
  publisherId?: number;
  /**
   * 发布时间
   * @format date-time
   */
  publishTime?: string;
  /** 岗位来源 */
  source?: "OFFICIAL_WEBSITE" | "CRAWLER" | "LINKEDIN" | "RAPID" | "WEB3_CAREER";
  /**
   * 是否推荐岗位，1是0否
   * @format int32
   */
  recommendFlag?: number;
  /** 下线原因 */
  offlineReason?: string;
  /** 职位分类名称 */
  jobClassName?: string;
  /** 薪资币种名称 */
  currencyName?: string;
  /** 国家/地区名称 */
  countryName?: string;
  /** 发布者名称 */
  publisherName?: string;
  /** 发布者头像 */
  publisherAvatar?: string;
  /** 标签列表 */
  labels?: string[];
  /** 审核记录 */
  jobApproveRecord?: JobApproveRecord;
}

export interface GetUserProfileResponse {
  /**
   * 用户ID
   * @format int64
   */
  id?: number;
  /** 电子邮箱 */
  email?: string;
  /** 昵称 */
  displayName?: string;
  /** 头像URL */
  avatarUrl?: string;
  /** Base国家 */
  country?: string;
  /**
   * Base国家ID
   * @format int64
   */
  countryId?: number;
  /** Base城市 */
  city?: string;
  /**
   * Base城市ID
   * @format int64
   */
  areaId?: number;
  /** 标签列表 */
  labelList?: string[];
  /** 兴趣爱好列表 */
  hobbyList?: string[];
  /** 自我介绍 */
  selfIntroduction?: string;
  /** 社区等级 */
  communityRankName?: string;
  /** 权限列表 */
  authorityList?: string[];
  /** 邀请码 */
  invitationCode?: string;
  /** 会员等级 */
  membershipType?: "SuperIndividual" | "GlobalNomad";
  /**
   * 会员有效期-开始时间
   * @format date-time
   */
  membershipStartTime?: string;
  /**
   * 会员有效期-结束时间
   * @format date-time
   */
  membershipEndTime?: string;
}

export interface GetIsFirstLoginResponse {
  isFirstLogin?: boolean;
}

export interface UserCommunityInfoResponse {
  /**
   * 用户ID
   * @format int64
   */
  id?: number;
  /** 用户昵称 */
  displayName?: string;
  /** 公众号 */
  publicAccounts?: string;
  /** 小红书账号 */
  redId?: string;
  /** ins账号 */
  instagramId?: string;
  /**
   * 粉丝数量
   * @format int32
   */
  followerAmount?: number;
  /**
   * 关注数量
   * @format int32
   */
  followingAmount?: number;
  /**
   * 贝壳数量
   * @format int64
   */
  shellAccountAmount?: number;
  /**
   * 共建次数
   * @format int64
   */
  numberOfCollaborations?: number;
  /** 用户社区等级 */
  communityRankName?: string;
  /** 用户权限列表 */
  authorityNameList?: string[];
  /**
   * 注册时间
   * @format date-time
   */
  registerTime?: string;
}

export interface Hobby {
  /** @format int64 */
  id?: number;
  name?: string;
}

export interface ListUserHobbyResponse {
  hobbies?: Hobby[];
}

export interface WebResumeListQueryRequest {
  carrer?: string;
  /** @format int64 */
  countryId?: number;
  /** @format int64 */
  cityId?: number;
}

export interface IPagePagingResumeResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingResumeResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface PagingResumeResponse {
  /**
   * 简历ID
   * @format int64
   */
  id?: number;
  /** 头像 */
  avatarUrl?: string;
  /** 姓名 */
  name?: string;
  /** 职业 */
  career?: string;
  /** 自我介绍 */
  profile?: string;
  /** 技能 */
  skill?: string;
  /** 关注方向 */
  focusDirection?: string;
  /** 语言 */
  userLanguage?: UserLanguageDTO[];
  /** 行业 */
  industry?: string;
  /** 工作经验 */
  experience?: string;
  /** 当前职业状态 */
  careerStatus?: string;
  /** 电话 */
  mobile?: string;
  /** 邮箱 */
  email?: string;
  /** 社交账号 */
  wechat?: string;
  /** 简历链接 */
  pdfUrl?: string;
  /** 期望月薪 */
  monthlySalary?: string;
  /** 期望时薪 */
  hourSalary?: string;
  /** 每周工作时长 */
  weeklyWorkHours?: string;
  /** 是否隐身 */
  hidden?: boolean;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
  /** 简历状态 */
  status?: string;
  /** 审批人 */
  approver?: string;
  /** 审批理由 */
  reason?: string;
}

export interface ResumeDetailResponse {
  /**
   * 简历ID
   * @format int64
   */
  id?: number;
  /** @format int64 */
  userId?: number;
  degree?: string;
  career?: string;
  /** 行业 */
  industry?: string;
  experience?: string;
  /** 薪酬预期（月薪） */
  monthlySalary?: string;
  /** 技能 */
  skill?: string;
  /** 关注方向 */
  focusDirection?: string;
  status?: string;
  profile?: string;
  /** @format date-time */
  createTime?: string;
  /** @format date-time */
  updateTime?: string;
  /** 作品集 */
  portfolio?: string;
  /** 邮箱 */
  email?: string;
  /** 电话 */
  mobile?: string;
  /** 微信 */
  wechat?: string;
  pdfUrl?: string;
  hidden?: boolean;
  inTalentPool?: boolean;
  hourSalary?: string;
  weeklyWorkHours?: string;
  /** 是否已解锁该简历 是ture 否flase */
  unlockFlag?: boolean;
}

export interface EmailCheckResponse {
  exists?: boolean;
}

/** 职位投递信息 */
export interface JobDeliverResponse {
  /**
   * 职位ID
   * @format int64
   */
  id?: number;
  /** 投递邮箱 */
  deliverEmail?: string;
  /** 投递微信号 */
  deliverWechat?: string;
  /** 投递Telegram */
  deliverTelegram?: string;
  /** 投递网址 */
  deliverWebsite?: string;
}

export interface GetJobContactResponse {
  /** 投递邮箱 */
  deliverEmail?: string;
  /** 投递微信号 */
  deliverWechat?: string;
  /** 投递telegram */
  deliverTelegram?: string;
  /** 投递网址 */
  deliverWebsite?: string;
}

/** 职位指标数据响应 */
export interface JobMetricsResponse {
  /**
   * 招聘渠道数量
   * @format int32
   */
  channelCount?: number;
  /**
   * 累计上线岗位
   * @format int64
   */
  cumulativeJobCount?: number;
  /**
   * 昨日上线岗位
   * @format int64
   */
  yesterdayJobCount?: number;
}

export interface ResUserInfoResponse {
  /** @format int32 */
  code?: number;
  username?: string;
  avatar?: string;
  uuid?: string;
}

export interface ShellTotalResponse {
  /**
   * 贝壳总数
   * @format int64
   */
  total?: number;
  /**
   * 贝壳流通数
   * @format int64
   */
  circulationAmount?: number;
  /**
   * RW社区持有贝壳数
   * @format int64
   */
  rwAmount?: number;
}

export interface IPagePagingShellAccoutFlowResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingShellAccoutFlowResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface PagingShellAccoutFlowResponse {
  /**
   * 贝壳流水记录id
   * @format int64
   */
  id?: number;
  /**
   * 贝壳账户id
   * @format int64
   */
  shellAccountId?: number;
  /**
   * 用户id
   * @format int64
   */
  userId?: number;
  /** 用户名 */
  userName?: string;
  /** 变动类型 加或减 */
  type?: "PLUS" | "MINUS";
  /**
   * 记录时间
   * @format date-time
   */
  time?: string;
  /**
   * 数量
   * @format int64
   */
  quantity?: number;
  /** 原因备注 */
  reason?: string;
  /** 原因类型(枚举 */
  reasonType?:
    | "GET_JOB_CONTACT"
    | "ATTEND_OFFLINE_ACTIVITY"
    | "ATTEND_ONLINE_ACTIVITY"
    | "LIVE_OFFLINE_SPACE"
    | "APPLY_JOB"
    | "OTHER"
    | "UNLOCK_RESUME_DETAIL"
    | "FULFILL_INFO"
    | "ADD_JOB"
    | "BUY_SHELL"
    | "ADD_RESUME"
    | "INVITATION";
}

export interface GetCurrentUserAccountResponse {
  /** @format int64 */
  total?: number;
  /** @format int64 */
  earnedAmount?: number;
  /** @format int64 */
  purchasedAmount?: number;
}

export interface RssType {
  /** @format int64 */
  id?: number;
  name?: string;
  url?: string;
  icon?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format int32 */
  visible?: number;
}

export interface RssSource {
  /** @format int64 */
  id?: number;
  name?: string;
  url?: string;
  icon?: string;
  /** @format int64 */
  typeId?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  description?: string;
}

export interface RssArticle {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  sourceId?: number;
  title?: string;
  link?: string;
  image?: string;
  description?: string;
  guid?: string;
  author?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  pubDate?: string;
  orgData?: string;
  mp3Url?: string;
}

export interface IPageRssArticleResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: RssArticleResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface RssArticleResponse {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  sourceId?: number;
  title?: string;
  link?: string;
  image?: string;
  guid?: string;
  author?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  pubDate?: string;
  mp3Url?: string;
}

export interface RegionDetailResponse {
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /**
   * 父级id
   * @format int64
   */
  parentId?: number;
  /**
   * 层级
   * @format int64
   */
  level?: number;
  /** 中文名 */
  name?: string;
  /** 英文名 */
  englishName?: string;
  /** 代码 */
  code?: string;
}

export interface ListNomadLabelResponse {
  /**
   * 游民标签ID
   * @format int64
   */
  id?: number;
  /** 游民标签内容 */
  name?: string;
}

export interface PagingMemberShipOrderRequest {
  /**
   * 用户id
   * @format int64
   */
  userId?: number;
  email?: string;
  displayName?: string;
  membershipType?: "SuperIndividual" | "GlobalNomad";
  status?: "ACTIVE" | "EXPIRE" | "CANCELLED" | "PAUSE" | "NOTPAY" | "CLOSED" | "REFUND";
  /** 时间范围 */
  createdDate?: DateRange;
  /** @format int64 */
  packageId?: number;
}

export interface IPagePagingMemberShipOrderResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingMemberShipOrderResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface PagingMemberShipOrderResponse {
  /** @format int64 */
  id?: number;
  /** 会员订单号 */
  orderSn?: string;
  /**
   * 用户id
   * @format int64
   */
  userId?: number;
  /** 会员类型 */
  membershipType?: "SuperIndividual" | "GlobalNomad";
  /** 会员订单状态 */
  status?: "ACTIVE" | "EXPIRE" | "CANCELLED" | "PAUSE" | "NOTPAY" | "CLOSED" | "REFUND";
  /** 会员来源类型 */
  sourceType?: "PURCHASE" | "ADMIN_GIFT" | "SYSTEM" | "REDEEM_CODE" | "OTHER";
  /**
   * 会员套餐id
   * @format int64
   */
  packageId?: number;
  /**
   * 会员订单权益生效开始时间
   * @format date-time
   */
  startDate?: string;
  /**
   * 会员订单权益生效结束时间
   * @format date-time
   */
  endDate?: string;
  /** 订单金额 */
  price?: number;
  /**
   * 币种id
   * @format int64
   */
  currencyId?: number;
  /** 创建人 */
  createdBy?: string;
  /**
   * 下单时间
   * @format date-time
   */
  createdDate?: string;
  /** 更新人 */
  updatedBy?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updatedTime?: string;
  /** 备注 */
  remark?: string;
  /** 币种 */
  currencyName?: string;
  /** 用户名 */
  displayName?: string;
  /** 用户邮箱 */
  email?: string;
  /** 支付账单编号（提交给第三方平台单号） */
  paymentBillSn?: string;
  /** 第三方平台返回交易号 */
  returnTradeNo?: string;
  /** 支付插件id */
  paymentPluginId?: string;
}

export interface IPagePagingLoginRecordResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingLoginRecordResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface PagingLoginRecordResponse {
  /** @format int64 */
  userId?: number;
  ip?: string;
  /** @format date-time */
  time?: string;
}

export interface JobSubscribeResponse {
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 职位分类ID */
  jobClassIds?: number[];
  /** 工作类型，JobType */
  types?: string[];
  /** 国家/地区ID */
  countryIds?: number[];
  /** 岗位关键字 */
  keywords?: string[];
  /**
   * 邮件通知类型：0:不通知，1：每天，2：每周
   * @format int32
   */
  alarmType?: number;
  /**
   * 失效日期
   * @format date-time
   */
  expirationDate?: string;
  /**
   * 订阅者ID
   * @format int64
   */
  subscriberId?: number;
  /**
   * 创建时间
   * @format date-time
   */
  createTime?: string;
}

export interface ListJobLabelResponse {
  /**
   * 标签ID
   * @format int64
   */
  id?: number;
  /** 标签名称 */
  name?: string;
}

export interface ListJobClassResponse {
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 分类名称 */
  name?: string;
  /**
   * 分类工作数量
   * @format int32
   */
  jobCount?: number;
}

export interface ListHobbyResponse {
  hobbies?: Hobby[];
}

export interface Country {
  /**
   * 国家ID
   * @format int64
   */
  id?: number;
  /** 国家名称 */
  name?: string;
  /** 国家编码 */
  code?: string;
}

export interface ListCountryResponse {
  countries?: Country[];
}

export interface Breakdown {
  /** @format float */
  semanticComponent?: number;
  /** @format float */
  structuredComponent?: number;
  details?: Details;
}

export interface Details {
  /** @format float */
  skillScore?: number;
  /** @format float */
  experienceScore?: number;
  /** @format float */
  educationScore?: number;
  /** @format float */
  languageScore?: number;
}

export interface SearchResult {
  /** @format int64 */
  id?: number;
  /** @format float */
  totalScore?: number;
  /** @format float */
  semanticScore?: number;
  /** @format float */
  structuredScore?: number;
  breakdown?: Breakdown;
}

export interface MatchDetail {
  /** @format int64 */
  id?: number;
  /** @format int64 */
  userId?: number;
  /** @format int64 */
  jobId?: number;
  /** @format float */
  matchScore?: number;
  /** @format float */
  totalScore?: number;
  /** @format float */
  semanticScore?: number;
  /** @format float */
  structuredScore?: number;
  /** @format float */
  skillScore?: number;
  /** @format float */
  experienceScore?: number;
  /** @format float */
  educationScore?: number;
  /** @format float */
  languageScore?: number;
  summary?: string;
  coreSkillsAnalysis?: string;
  projectExperienceAnalysis?: string;
  educationAnalysis?: string;
  languageAnalysis?: string;
  optimizedResumeUrl?: string;
  /** @format date-time */
  createTime?: string;
  /** @format date-time */
  updateTime?: string;
}

export interface UserQueryRequest {
  email?: string;
}

export interface IPagePagingUserResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingUserResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface PagingUserResponse {
  /**
   * 用户ID
   * @format int64
   */
  id?: number;
  /** 用户昵称 */
  displayName?: string;
  /** 用户邮箱 */
  email?: string;
  /** 社区等级 */
  communityRankName?: string;
  /** 用户权限列表 */
  authorityList?: (
    | "超级管理员"
    | "管理员"
    | "普通用户"
    | "匿名用户"
    | "贝壳管理"
    | "内容管理"
    | "用户管理"
    | "简历管理"
  )[];
  /** 会员等级 */
  membershipType?: "SuperIndividual" | "GlobalNomad";
  /**
   * 会员有效期-开始时间(即加入会员时间)
   * @format date-time
   */
  membershipStartTime?: string;
  /**
   * 会员有效期-结束时间（即到期时间）
   * @format date-time
   */
  membershipEndTime?: string;
}

export interface ResumeQueryRequest {
  /** @format date-time */
  createTimeStart?: string;
  /** @format date-time */
  createTimeEnd?: string;
  email?: string;
  industry?: string;
  userLanguage?: string;
  inTalentPool?: boolean;
}

export interface MemberQueryRequest {
  email?: string;
  /** 用户昵称 */
  displayName?: string;
  /** 时间范围 */
  registerTime?: DateRange;
  /** 时间范围 */
  membershipStartTime?: DateRange;
  /** 会员类型 */
  type?: "SuperIndividual" | "GlobalNomad";
  /** 会员来源 */
  source?: "PURCHASE" | "ADMIN_GIFT" | "SYSTEM" | "REDEEM_CODE" | "OTHER";
  /** 时间范围 */
  membershipEndTime?: DateRange;
  /** 关键词搜索 */
  keyword?: string;
}

export interface IPagePagingMemberResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingMemberResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface PagingMemberResponse {
  /**
   * 用户ID
   * @format int64
   */
  id?: number;
  /** 用户昵称 */
  displayName?: string;
  /** 用户邮箱 */
  email?: string;
  /** 社区等级 */
  communityRankName?: string;
  /** 用户权限列表 */
  authorityList?: (
    | "超级管理员"
    | "管理员"
    | "普通用户"
    | "匿名用户"
    | "贝壳管理"
    | "内容管理"
    | "用户管理"
    | "简历管理"
  )[];
  /** 会员等级 */
  membershipType?: "SuperIndividual" | "GlobalNomad";
  /**
   * 会员有效期-开始时间(即加入会员时间)
   * @format date-time
   */
  membershipStartTime?: string;
  /**
   * 会员有效期-结束时间（即到期时间）
   * @format date-time
   */
  membershipEndTime?: string;
  /**
   * 注册时间
   * @format date-time
   */
  registerTime?: string;
  /** 会员来源 */
  source?: "PURCHASE" | "ADMIN_GIFT" | "SYSTEM" | "REDEEM_CODE" | "OTHER";
  /** 付费金额 */
  price?: number;
  /** 币种名称 */
  currencyName?: string;
}

export interface RedeemCodeQueryRequest {
  /** 是否已使用 */
  used?: boolean;
  /** 兑换码 */
  code?: string;
  /** 时间范围 */
  usedTime?: DateRange;
  /** 会员类型 */
  membershipType?: "SuperIndividual" | "GlobalNomad";
  /** 用户昵称 */
  displayName?: string;
  /** 用户邮箱 */
  email?: string;
  /**
   * 使用用户id
   * @format int64
   */
  usedByUserId?: number;
}

export interface IPagePagingMemberShipRedeemCodeResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingMemberShipRedeemCodeResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface PagingMemberShipRedeemCodeResponse {
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 兑换码 */
  code?: string;
  /**
   * 生成时间
   * @format date-time
   */
  createdTime?: string;
  /** 是否已使用 */
  used?: boolean;
  /**
   * 兑换时间
   * @format date-time
   */
  usedTime?: string;
  /**
   * 使用兑换码的用户ID
   * @format int64
   */
  usedByUserId?: number;
  /**
   * 兑换码对应会员时长（天）
   * @format int32
   */
  durationDays?: number;
  /** 会员类型 */
  membershipType?: "SuperIndividual" | "GlobalNomad";
  /**
   * 关联生成的会员订单ID
   * @format int64
   */
  membershipOrderId?: number;
  /** 创建人 */
  createdBy?: string;
  /**
   * 会员到期时间
   * @format date-time
   */
  endTime?: string;
  /** 用户昵称 */
  displayName?: string;
  /** 用户邮箱 */
  email?: string;
}

export interface MemberShipPackageRequest {
  /** 套餐名称 */
  name?: string;
  /** 会员类型 */
  membershipType?: "SuperIndividual" | "GlobalNomad";
  /**
   * 有效时间
   * @format int32
   */
  durationDays?: number;
  /** 描述 */
  description?: string;
  /** 是否可购买 */
  isActive?: boolean;
  /**
   * 币种
   * @format int64
   */
  currencyId?: number;
}

export interface IPagePagingMemberShipPackageResponse {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  records?: PagingMemberShipPackageResponse[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  pages?: number;
}

export interface PagingMemberShipPackageResponse {
  /**
   * 主键
   * @format int64
   */
  id?: number;
  /** 套餐名称 */
  name: string;
  /** 会员类型 */
  membershipType: "SuperIndividual" | "GlobalNomad";
  /** 套餐价格 */
  price: number;
  /**
   * 会员时长（单位：天）
   * @format int32
   */
  durationDays: number;
  /** 套餐描述 */
  description: string;
  /**
   * 套餐可购买开始时间
   * @format date-time
   */
  validFrom?: string;
  /**
   * 套餐可购买结束时间
   * @format date-time
   */
  validTo?: string;
  /** 创建人 */
  createdBy?: string;
  /**
   * 修改时间
   * @format date-time
   */
  createdTime?: string;
  /** 更新人 */
  updatedBy?: string;
  /**
   * 更新时间
   * @format date-time
   */
  updatedTime?: string;
  /**
   * 币种Id
   * @format int64
   */
  currencyId?: number;
  currencyPriceList?: MembershipPackageCurrency[];
  active?: boolean;
}

export interface IndustryDetail {
  /** @format int64 */
  id?: number;
  name?: string;
}

export interface ThirdAuthCallback {
  code?: string;
  auth_code?: string;
  state?: string;
  authorization_code?: string;
  oauth_token?: string;
  oauth_verifier?: string;
}

export interface ResTokenResponse {
  /** @format int32 */
  code?: number;
  result?: string;
  message?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://test.rwnomad.com:10086",
      // 配置数组参数序列化为重复键格式
      paramsSerializer: {
        serialize: (params) => {
          const searchParams = new URLSearchParams();

          const processValue = (key: string, value: any) => {
            if (Array.isArray(value)) {
              // 数组使用重复键格式：arr=1&arr=2
              value.forEach((item) => {
                if (item !== null && item !== undefined) {
                  searchParams.append(key, String(item));
                }
              });
            } else if (value !== null && value !== undefined) {
              searchParams.append(key, String(value));
            }
          };

          for (const [key, value] of Object.entries(params)) {
            processValue(key, value);
          }

          return searchParams.toString();
        },
      },
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      // @ts-ignore
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      formData.append(
        key,
        property instanceof Blob
          ? property
          : typeof property === "object" && property !== null
          ? JSON.stringify(property)
          : `${property}`,
      );
      return formData;
    }, new FormData());
  }

  public flattenQuery = (obj: Record<string, any>, prefix = ""): Record<string, any> => {
    const flattened: Record<string, any> = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        // 特殊处理：如果key是orderQueryRequest，直接将其内部属性提升到顶层
        if (
          key === "orderQueryRequest" &&
          typeof value === "object" &&
          value !== null &&
          !Array.isArray(value) &&
          !(value instanceof Date) &&
          !(value instanceof File)
        ) {
          // 直接将orderQueryRequest内的属性合并到顶层
          Object.assign(flattened, this.flattenQuery(value, ""));
        } else {
          const newKey = prefix ? `${prefix}.${key}` : key;

          if (value !== null && value !== undefined) {
            if (
              typeof value === "object" &&
              !Array.isArray(value) &&
              !(value instanceof Date) &&
              !(value instanceof File)
            ) {
              // 递归扁平化嵌套对象，但跳过特殊对象类型
              Object.assign(flattened, this.flattenQuery(value, newKey));
            } else {
              // 直接赋值基本类型、数组、日期等
              flattened[newKey] = value;
            }
          }
        }
      }
    }

    return flattened;
  };

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      // @ts-ignore
      requestParams.headers.common = { Accept: "*/*" };
      // @ts-ignore
      requestParams.headers.post = {};
      // @ts-ignore
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
          ...(requestParams.headers || {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title OpenAPI definition* @version v0* @baseUrl http://test.rwnomad.com:10086*/
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;
  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  web = {
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name UpdateSocialMedia
     * @summary 更新用户社交媒体
     * @request PUT:/web/users/social-media
     * @secure
     * @response `200` `void` OK
     */
    updateSocialMedia: (data: UpdateSocialMediaRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/users/social-media`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name CreateSocialMedia
     * @summary 创建用户社交媒体
     * @request POST:/web/users/social-media
     * @secure
     * @response `200` `void` OK
     */,
    createSocialMedia: (data: UpdateSocialMediaRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/users/social-media`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name UpdateSelfIntroduction
     * @summary 更新用户自我介绍
     * @request PUT:/web/users/self-introduction
     * @secure
     * @response `200` `void` OK
     */,
    updateSelfIntroduction: (data: UpdateSelfIntroductionRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/users/self-introduction`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name SaveSelfIntroduction
     * @summary 创建用户自我介绍
     * @request POST:/web/users/self-introduction
     * @secure
     * @response `200` `void` OK
     */,
    saveSelfIntroduction: (data: UpdateSelfIntroductionRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/users/self-introduction`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name UpdateDisplayName
     * @summary 更新昵称
     * @request PUT:/web/users/display-name
     * @secure
     * @response `200` `void` OK
     */,
    updateDisplayName: (data: UpdateUserDisplayNameRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/users/display-name`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name UpdateAvatar
     * @summary 更新用户头像
     * @request PUT:/web/users/avatar
     * @secure
     * @response `200` `UpdateAvatarResponse` OK
     */,
    updateAvatar: (
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<UpdateAvatarResponse, any>({
        path: `/web/users/avatar`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name UpdateAvatarUrl
     * @summary 更新用户头像URL
     * @request PUT:/web/users/avatar-url
     * @secure
     * @response `200` `void` OK
     */,
    updateAvatarUrl: (data: UpdateUserAvatarUrlRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/users/avatar-url`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-region-controller
     * @name UpdateUserRegion
     * @summary 修改用户Base地区
     * @request PUT:/web/user/regions
     * @secure
     * @response `200` `void` OK
     */,
    updateUserRegion: (data: AddUserRegionRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/user/regions`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-region-controller
     * @name AddUserRegion
     * @summary 添加用户Base地区
     * @request POST:/web/user/regions
     * @secure
     * @response `200` `void` OK
     */,
    addUserRegion: (data: AddUserRegionRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/user/regions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags reset-password-controller
     * @name ResetPassword
     * @summary 重置密码
     * @request PUT:/web/user/password/reset-password
     * @secure
     * @response `200` `void` OK
     */,
    resetPassword: (data: ResetPasswordRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/user/password/reset-password`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-label-controller
     * @name UpdateUserLabel
     * @summary 更新游民标签列表
     * @request PUT:/web/user/labels
     * @secure
     * @response `200` `void` OK
     */,
    updateUserLabel: (data: string[], params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/user/labels`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-label-controller
     * @name AddUserLabel
     * @summary 添加游民标签
     * @request POST:/web/user/labels
     * @secure
     * @response `200` `void` OK
     */,
    addUserLabel: (data: AddUserLabelRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/user/labels`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-hobby-controller
     * @name UpdateUserHobbyList
     * @summary 更新用户兴趣爱好列表
     * @request PUT:/web/user/hobbies
     * @secure
     * @response `200` `void` OK
     */,
    updateUserHobbyList: (data: string[], params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/user/hobbies`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-country-controller
     * @name UpdateUserCountry
     * @summary 修改用户Base国家
     * @request PUT:/web/user/countries
     * @secure
     * @response `200` `void` OK
     */,
    updateUserCountry: (data: AddUserCountryRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/user/countries`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-country-controller
     * @name AddUserCountry
     * @summary 添加用户Base国家
     * @request POST:/web/user/countries
     * @secure
     * @response `200` `void` OK
     */,
    addUserCountry: (data: AddUserCountryRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/user/countries`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags verify-code-controller
     * @name GetVerifyCode
     * @summary 获取验证码
     * @request POST:/web/verify-code
     * @secure
     * @response `200` `void` OK
     */,
    getVerifyCode: (data: GetVerifyCodeRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/verify-code`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-follow-controller
     * @name Follow
     * @summary 关注用户
     * @request POST:/web/users/followings/{followingUserId}
     * @secure
     * @response `200` `void` OK
     */,
    follow: (followingUserId: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/users/followings/${followingUserId}`,
        method: "POST",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-follow-controller
     * @name Unfollow
     * @summary 取消关注用户
     * @request DELETE:/web/users/followings/{followingUserId}
     * @secure
     * @response `200` `void` OK
     */,
    unfollow: (followingUserId: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/users/followings/${followingUserId}`,
        method: "DELETE",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name CreateAvatarUrlAndNickName
     * @summary 创建用户头像URL和昵称
     * @request POST:/web/users/avatar-display-name
     * @secure
     * @response `200` `void` OK
     */,
    createAvatarUrlAndNickName: (data: CreateUserAvatarUrlAndDisplayNameRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/users/avatar-display-name`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags reset-password-controller
     * @name SendResetPasswordEmail
     * @summary 发送重置密码邮件
     * @request POST:/web/user/password/reset-password-email
     * @secure
     * @response `200` `void` OK
     */,
    sendResetPasswordEmail: (data: ResetPasswordEmailLinkRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/user/password/reset-password-email`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * No description
     *
     * @tags user-hobby-controller
     * @name AddUserHobby
     * @request POST:/web/user/hobbies/add
     * @secure
     * @response `200` `void` OK
     */,
    addUserHobby: (data: AddHobbyRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/user/hobbies/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags register-controller
     * @name Register
     * @summary 注册
     * @request POST:/web/register
     * @secure
     * @response `200` `RegisterResponse` OK
     */,
    register: (data: RegisterRequest, params: RequestParams = {}) =>
      this.http.request<RegisterResponse, any>({
        path: `/web/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-controller
     * @name OffLineJob
     * @summary 用户职位标记失效
     * @request POST:/web/jobs/{jobId}/offline
     * @secure
     * @response `200` `void` OK
     */,
    offLineJob: (jobId: number, data: OfflineJobRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/jobs/${jobId}/offline`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：我去整点薯条
     *
     * @tags job-controller
     * @name Apply
     * @summary 职位申请
     * @request POST:/web/jobs/{jobId}/apply
     * @secure
     * @response `200` `JobApplyResponse` OK
     */,
    apply: (jobId: number, params: RequestParams = {}) =>
      this.http.request<JobApplyResponse, any>({
        path: `/web/jobs/${jobId}/apply`,
        method: "POST",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-controller
     * @name PagingJob
     * @summary 分页获取职位信息
     * @request POST:/web/jobs/paging
     * @secure
     * @response `200` `IPagePagingJobResponse` OK
     */,
    pagingJob: (
      data: PagingJobRequest,
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingJobResponse, any>({
        path: `/web/jobs/paging`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-controller
     * @name PagingMyJob
     * @summary 分页获取自己发布的职位信息
     * @request POST:/web/jobs/pagingMyJob
     * @secure
     * @response `200` `IPagePagingJobResponse` OK
     */,
    pagingMyJob: (
      data: PagingMyJobRequest,
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingJobResponse, any>({
        path: `/web/jobs/pagingMyJob`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-controller
     * @name ListJob
     * @summary 分页获取订阅岗位/所有岗位
     * @request POST:/web/jobs/list
     * @secure
     * @response `200` `IPagePagingJobResponse` OK
     */,
    listJob: (
      data: PagingJobSubscribeRequest,
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingJobResponse, any>({
        path: `/web/jobs/list`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-controller
     * @name GetJob
     * @summary 根据jobId获取职位详情信息
     * @request POST:/web/jobs/detail/{jobId}
     * @secure
     * @response `200` `PagingJobResponse` OK
     */,
    getJob: (jobId: number, params: RequestParams = {}) =>
      this.http.request<PagingJobResponse, any>({
        path: `/web/jobs/detail/${jobId}`,
        method: "POST",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：乐白
     *
     * @tags job-controller
     * @name BatchAddJob
     * @summary 批量导入职位信息
     * @request POST:/web/jobs/batchAdd
     * @secure
     * @response `200` `void` OK
     */,
    batchAddJob: (data: BatchAddJobRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/jobs/batchAdd`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-controller
     * @name AddJob
     * @summary 添加职位信息
     * @request POST:/web/jobs/add
     * @secure
     * @response `200` `void` OK
     */,
    addJob: (data: AddJobRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/jobs/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags avatar-controller
     * @name UploadAvatar
     * @summary 上传用户头像
     * @request POST:/web/avatars
     * @secure
     * @response `200` `UploadAvatarResponse` OK
     */,
    uploadAvatar: (
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<UploadAvatarResponse, any>({
        path: `/web/avatars`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      })
    /**
     * No description
     *
     * @tags auth-controller
     * @name Logout
     * @request POST:/web/auth/logout
     * @secure
     * @response `200` `void` OK
     */,
    logout: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/auth/logout`,
        method: "POST",
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags auth-controller
     * @name Login
     * @request POST:/web/auth/login
     * @secure
     * @response `200` `LoginResponse` OK
     */,
    login: (
      query: {
        username: string;
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<LoginResponse, any>({
        path: `/web/auth/login`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name GetUserProfile
     * @summary 获取用户信息
     * @request GET:/web/users/profile
     * @secure
     * @response `200` `GetUserProfileResponse` OK
     */,
    getUserProfile: (params: RequestParams = {}) =>
      this.http.request<GetUserProfileResponse, any>({
        path: `/web/users/profile`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：我去整点薯条
     *
     * @tags user-controller
     * @name CurrentUserIsFirstLogin
     * @summary 用户是否第一次登陆
     * @request GET:/web/users/is-first-login
     * @secure
     * @response `200` `GetIsFirstLoginResponse` OK
     */,
    currentUserIsFirstLogin: (params: RequestParams = {}) =>
      this.http.request<GetIsFirstLoginResponse, any>({
        path: `/web/users/is-first-login`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name GetUserCommunityInfo
     * @summary 获取用户社区信息
     * @request GET:/web/users/community
     * @secure
     * @response `200` `UserCommunityInfoResponse` OK
     */,
    getUserCommunityInfo: (params: RequestParams = {}) =>
      this.http.request<UserCommunityInfoResponse, any>({
        path: `/web/users/community`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags user-hobby-controller
     * @name ListUserHobby
     * @request GET:/web/user/hobbies/list
     * @secure
     * @response `200` `ListUserHobbyResponse` OK
     */,
    listUserHobby: (params: RequestParams = {}) =>
      this.http.request<ListUserHobbyResponse, any>({
        path: `/web/user/hobbies/list`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags web-resume-controller
     * @name PagingResume
     * @summary 【官网】分页查询简历信息
     * @request GET:/web/resume/page
     * @secure
     * @response `200` `IPagePagingResumeResponse` OK
     */,
    pagingResume: (
      query: {
        resumeQueryRequest: WebResumeListQueryRequest;
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingResumeResponse, any>({
        path: `/web/resume/page`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags web-resume-controller
     * @name GetResumePart
     * @summary 【官网】查看简历部分详情
     * @request GET:/web/resume/detail/{id}
     * @secure
     * @response `200` `ResumeDetailResponse` OK
     */,
    getResumePart: (id: number, params: RequestParams = {}) =>
      this.http.request<ResumeDetailResponse, any>({
        path: `/web/resume/detail/${id}`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags web-resume-controller
     * @name GetResumeAll
     * @summary 【官网】花费贝壳解锁简历全部详情
     * @request GET:/web/resume/detail/unlock/{id}
     * @secure
     * @response `200` `void` OK
     */,
    getResumeAll: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/resume/detail/unlock/${id}`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags register-controller
     * @name CheckEmailExists
     * @summary 校验Email是否存在
     * @request GET:/web/register/{email}/check
     * @secure
     * @response `200` `EmailCheckResponse` OK
     */,
    checkEmailExists: (email: string, params: RequestParams = {}) =>
      this.http.request<EmailCheckResponse, any>({
        path: `/web/register/${email}/check`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-controller
     * @name GetJobDeliver
     * @summary 获取职位投递信息
     * @request GET:/web/jobs/{jobId}/deliver
     * @secure
     * @response `200` `JobDeliverResponse` OK
     */,
    getJobDeliver: (jobId: number, params: RequestParams = {}) =>
      this.http.request<JobDeliverResponse, any>({
        path: `/web/jobs/${jobId}/deliver`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：我去整点薯条
     *
     * @tags job-controller
     * @name GetJobContact
     * @summary 职位联系方式
     * @request GET:/web/jobs/{jobId}/contact
     * @secure
     * @response `200` `GetJobContactResponse` OK
     */,
    getJobContact: (jobId: number, params: RequestParams = {}) =>
      this.http.request<GetJobContactResponse, any>({
        path: `/web/jobs/${jobId}/contact`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：GitHub Copilot
     *
     * @tags job-controller
     * @name GetOnlineJobCount
     * @summary 获取当前所有在线岗位的数量
     * @request GET:/web/jobs/online/count
     * @secure
     * @response `200` `number` OK
     */,
    getOnlineJobCount: (params: RequestParams = {}) =>
      this.http.request<number, any>({
        path: `/web/jobs/online/count`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-controller
     * @name GetJobMetrics
     * @summary 获取职位指标数据
     * @request GET:/web/jobs/metrics
     * @secure
     * @response `200` `JobMetricsResponse` OK
     */,
    getJobMetrics: (params: RequestParams = {}) =>
      this.http.request<JobMetricsResponse, any>({
        path: `/web/jobs/metrics`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-label-controller
     * @name DeleteUserLabel
     * @summary 删除用户标签
     * @request DELETE:/web/user/labels/{id}
     * @secure
     * @response `200` `void` OK
     */,
    deleteUserLabel: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/user/labels/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags user-hobby-controller
     * @name DeleteUserHobby
     * @request DELETE:/web/user/hobbies/{id}
     * @secure
     * @response `200` `void` OK
     */,
    deleteUserHobby: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/web/user/hobbies/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  admin = {
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-authority-controller
     * @name UpdateAuthority
     * @summary 更新权限
     * @request PUT:/admin/{userId}/user-authorities
     * @secure
     * @response `200` `void` OK
     */
    updateAuthority: (userId: number, data: SaveUserAuthorityRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/${userId}/user-authorities`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-authority-controller
     * @name AddAuthority
     * @summary 添加权限
     * @request POST:/admin/{userId}/user-authorities
     * @secure
     * @response `200` `void` OK
     */,
    addAuthority: (userId: number, data: SaveUserAuthorityRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/${userId}/user-authorities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * No description
     *
     * @tags resume-controller
     * @name UpdateResume
     * @request PUT:/admin/resumes/update
     * @secure
     * @response `200` `void` OK
     */,
    updateResume: (data: ResumeResponse, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/resumes/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name UpdateSelfIntroduction1
     * @summary 创建用户自我介绍
     * @request POST:/admin/users/{userId}/self-introduction
     * @secure
     * @response `200` `void` OK
     */,
    updateSelfIntroduction1: (userId: number, data: UpdateSelfIntroductionRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/users/${userId}/self-introduction`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name UpdateCommunityRank
     * @summary 创建用户社区等级
     * @request POST:/admin/users/{userId}/community-rank
     * @secure
     * @response `200` `void` OK
     */,
    updateCommunityRank: (userId: number, data: UpdateUserCommunityRankRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/users/${userId}/community-rank`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-label-controller
     * @name AddUserLabel1
     * @summary 添加用户标签
     * @request POST:/admin/user/labels
     * @secure
     * @response `200` `void` OK
     */,
    addUserLabel1: (data: AddUserLabelRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/user/labels`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-country-controller
     * @name AddUserCountry1
     * @summary 添加用户Base国家
     * @request POST:/admin/user/countries
     * @secure
     * @response `200` `void` OK
     */,
    addUserCountry1: (data: AddUserCountryRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/user/countries`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags resume-controller
     * @name PagingResume1
     * @summary 分页查询简历信息
     * @request GET:/admin/resumes
     * @secure
     * @response `200` `IPagePagingResumeResponse` OK
     */,
    pagingResume1: (
      query: {
        resumeQueryRequest: ResumeQueryRequest;
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingResumeResponse, any>({
        path: `/admin/resumes`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags resume-controller
     * @name CreateResume
     * @request POST:/admin/resumes
     * @secure
     * @response `200` `void` OK
     */,
    createResume: (data: ResumeCreateUpdateRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/resumes`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags resume-controller
     * @name Offline
     * @summary 下线简历
     * @request POST:/admin/resumes/{id}/offline
     * @secure
     * @response `200` `void` OK
     */,
    offline: (id: number, data: ApproveResumeRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/resumes/${id}/offline`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * No description
     *
     * @tags resume-controller
     * @name HideResume
     * @request POST:/admin/resumes/{id}/hidden
     * @secure
     * @response `200` `void` OK
     */,
    hideResume: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/resumes/${id}/hidden`,
        method: "POST",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags resume-controller
     * @name Approve
     * @summary 审核简历
     * @request POST:/admin/resumes/{id}/approve
     * @secure
     * @response `200` `void` OK
     */,
    approve: (id: number, data: ApproveResumeRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/resumes/${id}/approve`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * No description
     *
     * @tags resume-controller
     * @name Search
     * @request POST:/admin/resumes/search
     * @secure
     * @response `200` `IPageResumeSummaryResponse` OK
     */,
    search: (
      data: ResumeSearchRequest,
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPageResumeSummaryResponse, any>({
        path: `/admin/resumes/search`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags resume-controller
     * @name UploadResume
     * @summary 上传用户简历附件
     * @request POST:/admin/resumes/file
     * @secure
     * @response `200` `UploadResumeResponse` OK
     */,
    uploadResume: (
      data: {
        /** @format binary */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<UploadResumeResponse, any>({
        path: `/admin/resumes/file`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-admin-controller
     * @name EditMemberShipPackage
     * @summary 修改会员套餐
     * @request POST:/admin/members/packages/edit
     * @secure
     * @response `200` `void` OK
     */,
    editMemberShipPackage: (data: AddMemberShipPackageRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/members/packages/edit`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-admin-controller
     * @name AddMemberShipPackage
     * @summary 新增会员套餐
     * @request POST:/admin/members/packages/add
     * @secure
     * @response `200` `void` OK
     */,
    addMemberShipPackage: (data: AddMemberShipPackageRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/members/packages/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-approve-controller
     * @name OffLineJob1
     * @summary 下线职位
     * @request POST:/admin/job/{jobId}/offline
     * @secure
     * @response `200` `void` OK
     */,
    offLineJob1: (jobId: number, data: OfflineJobRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/job/${jobId}/offline`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-approve-controller
     * @name AddJobApprove
     * @summary 职位审核
     * @request POST:/admin/job/{jobId}/approves
     * @secure
     * @response `200` `void` OK
     */,
    addJobApprove: (jobId: number, data: AddJobApproveRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/job/${jobId}/approves`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-approve-controller
     * @name UpdateJob
     * @summary 职位修改
     * @request POST:/admin/job/modify
     * @secure
     * @response `200` `void` OK
     */,
    updateJob: (data: AddJobRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/job/modify`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-approve-controller
     * @name PagingJobApprove
     * @summary 分页获取职位信息
     * @request POST:/admin/job/list
     * @secure
     * @response `200` `IPagePagingJobApproveResponse` OK
     */,
    pagingJobApprove: (
      data: PagingJobApproveRequest,
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingJobApproveResponse, any>({
        path: `/admin/job/list`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name PagingUser
     * @summary 分页查询用户信息
     * @request GET:/admin/users
     * @secure
     * @response `200` `IPagePagingUserResponse` OK
     */,
    pagingUser: (
      query: {
        userQueryRequest: UserQueryRequest;
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingUserResponse, any>({
        path: `/admin/users`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name GetUserProfile1
     * @summary 获取指定用户信息
     * @request GET:/admin/users/{userId}/profile
     * @secure
     * @response `200` `GetUserProfileResponse` OK
     */,
    getUserProfile1: (userId: number, params: RequestParams = {}) =>
      this.http.request<GetUserProfileResponse, any>({
        path: `/admin/users/${userId}/profile`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name PagingJob1
     * @summary 分页查询用户发布的岗位信息
     * @request GET:/admin/users/{userId}/jobs
     * @secure
     * @response `200` `IPagePagingJobResponse` OK
     */,
    pagingJob1: (
      userId: number,
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingJobResponse, any>({
        path: `/admin/users/${userId}/jobs`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name GetUserCommunityInfo1
     * @summary 获取用户社区信息
     * @request GET:/admin/users/{userId}/community
     * @secure
     * @response `200` `UserCommunityInfoResponse` OK
     */,
    getUserCommunityInfo1: (userId: number, params: RequestParams = {}) =>
      this.http.request<UserCommunityInfoResponse, any>({
        path: `/admin/users/${userId}/community`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags user-controller
     * @name GetSelfProfile
     * @summary 获取用户信息
     * @request GET:/admin/users/profile
     * @secure
     * @response `200` `GetUserProfileResponse` OK
     */,
    getSelfProfile: (params: RequestParams = {}) =>
      this.http.request<GetUserProfileResponse, any>({
        path: `/admin/users/profile`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags resume-controller
     * @name GetResume
     * @request GET:/admin/resumes/{id}
     * @secure
     * @response `200` `ResumeResponse` OK
     */,
    getResume: (id: number, params: RequestParams = {}) =>
      this.http.request<ResumeResponse, any>({
        path: `/admin/resumes/${id}`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags resume-controller
     * @name GetSelfResume
     * @summary 获取用户自己的简历
     * @request GET:/admin/resumes/self
     * @secure
     * @response `200` `ResumeResponse` OK
     */,
    getSelfResume: (params: RequestParams = {}) =>
      this.http.request<ResumeResponse, any>({
        path: `/admin/resumes/self`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-admin-controller
     * @name PagingMember
     * @summary 分页查询会员列表
     * @request GET:/admin/members
     * @secure
     * @response `200` `IPagePagingMemberResponse` OK
     */,
    pagingMember: (
      query: {
        memberQueryRequest: MemberQueryRequest;
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingMemberResponse, any>({
        path: `/admin/members`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-admin-controller
     * @name Cancel
     * @summary 取消某个会员资格
     * @request GET:/admin/members/{userId}/cancel
     * @secure
     * @response `200` `void` OK
     */,
    cancel: (userId: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/members/${userId}/cancel`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-admin-controller
     * @name PagingMemberShipRedeemCodes
     * @summary 分页查询会员兑换码
     * @request GET:/admin/members/redeemCodes
     * @secure
     * @response `200` `IPagePagingMemberShipRedeemCodeResponse` OK
     */,
    pagingMemberShipRedeemCodes: (
      query: {
        redeemCOdeQueryRequest: RedeemCodeQueryRequest;
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingMemberShipRedeemCodeResponse, any>({
        path: `/admin/members/redeemCodes`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-admin-controller
     * @name DelMemberShipRedeemCodes
     * @summary 删除兑换码
     * @request GET:/admin/members/redeemCodes/{codeId}/del
     * @secure
     * @response `200` `void` OK
     */,
    delMemberShipRedeemCodes: (codeId: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/members/redeemCodes/${codeId}/del`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-admin-controller
     * @name GenerateMemberShipRedeemCodes
     * @summary 生成若干个兑换码
     * @request GET:/admin/members/redeemCodes/generate
     * @secure
     * @response `200` `void` OK
     */,
    generateMemberShipRedeemCodes: (
      query?: {
        /**
         * 生成兑换码数量，不传默认为10个
         * @format int32
         */
        num?: number;
        /** 生成兑换码的会员类型，不传默认为高级会员PREMIUM */
        memberShipType?: "SuperIndividual" | "GlobalNomad";
        /**
         * 生成兑换码的会员时长，不传默认为365天即1年
         * @format int32
         */
        days?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<void, any>({
        path: `/admin/members/redeemCodes/generate`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-admin-controller
     * @name PagingMemberShipPackage
     * @summary 分页查询会员套餐
     * @request GET:/admin/members/packages
     * @secure
     * @response `200` `IPagePagingMemberShipPackageResponse` OK
     */,
    pagingMemberShipPackage: (
      query: {
        packageQueryRequest: MemberShipPackageRequest;
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingMemberShipPackageResponse, any>({
        path: `/admin/members/packages`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-admin-controller
     * @name ActiveOrNotPackage
     * @summary 激活或使某个会员套餐失效
     * @request GET:/admin/members/packages/{packageId}/activeOrNot
     * @secure
     * @response `200` `void` OK
     */,
    activeOrNotPackage: (packageId: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/admin/members/packages/${packageId}/activeOrNot`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-admin-controller
     * @name PagingMemberShipOrders1
     * @summary 管理端分页查询会员订单
     * @request GET:/admin/members/orders
     * @secure
     * @response `200` `IPagePagingMemberShipOrderResponse` OK
     */,
    pagingMemberShipOrders1: (
      query: {
        orderQueryRequest: PagingMemberShipOrderRequest;
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingMemberShipOrderResponse, any>({
        path: `/admin/members/orders`,
        method: "GET",
        query: this.http.flattenQuery(query),
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-admin-controller
     * @name AddMembershipDays
     * @summary 增加会员时长
     * @request GET:/admin/members/addDays
     * @secure
     * @response `200` `void` OK
     */,
    addMembershipDays: (
      query: {
        /** @format int64 */
        userId: number;
        /** @format int32 */
        days: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<void, any>({
        path: `/admin/members/addDays`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：keyi
     *
     * @tags job-approve-controller
     * @name RecommendFlagSetOrCancel
     * @summary 设置或取消岗位推荐
     * @request GET:/admin/job/{jobId}/recommend
     * @secure
     * @response `200` `void` OK
     */,
    recommendFlagSetOrCancel: (
      jobId: number,
      query?: {
        /**
         * 推荐标识，1表示推荐，0表示取消推荐，不传的情况下会根据该岗位现有的值取反
         * @format int32
         */
        recommendFlag?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<void, any>({
        path: `/admin/job/${jobId}/recommend`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags job-approve-controller
     * @name GetJob1
     * @summary 根据jobId获取职位详情信息
     * @request GET:/admin/job/detail/{jobId}
     * @secure
     * @response `200` `AddJobRequest` OK
     */,
    getJob1: (jobId: number, params: RequestParams = {}) =>
      this.http.request<AddJobRequest, any>({
        path: `/admin/job/detail/${jobId}`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags industry-controller
     * @name FindAll
     * @request GET:/admin/industries
     * @secure
     * @response `200` `(IndustryDetail)[]` OK
     */,
    findAll: (params: RequestParams = {}) =>
      this.http.request<IndustryDetail[], any>({
        path: `/admin/industries`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：江南阿甘
     *
     * @tags authority-controller
     * @name GetAuthorityList
     * @summary 获取权限列表
     * @request GET:/admin/authorities
     * @secure
     * @response `200` `(string)[]` OK
     */,
    getAuthorityList: (params: RequestParams = {}) =>
      this.http.request<string[], any>({
        path: `/admin/authorities`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user-hobby-controller
     * @name AddUserHobby1
     * @request POST:/user/hobbies/add
     * @secure
     * @response `200` `void` OK
     */
    addUserHobby1: (data: AddHobbyRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/user/hobbies/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * No description
     *
     * @tags user-hobby-controller
     * @name ListUserHobby1
     * @request GET:/user/hobbies/list
     * @secure
     * @response `200` `ListUserHobbyResponse` OK
     */,
    listUserHobby1: (params: RequestParams = {}) =>
      this.http.request<ListUserHobbyResponse, any>({
        path: `/user/hobbies/list`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags user-hobby-controller
     * @name DeleteUserHobby1
     * @request DELETE:/user/hobbies/{id}
     * @secure
     * @response `200` `void` OK
     */,
    deleteUserHobby1: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/user/hobbies/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  third = {
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name Auth
     * @summary 第三方登录鉴权
     * @request POST:/third/login/oauth2/auth
     * @secure
     * @response `200` `string` OK
     */
    auth: (
      query: {
        thirdLoginModel: ThirdLoginModel;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<string, any>({
        path: `/third/login/oauth2/auth`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name Auth1
     * @summary 用户详情接口
     * @request GET:/third/login/oauth2/{source}/userInfo
     * @secure
     * @response `200` `ResUserInfoResponse` OK
     */,
    auth1: (
      source: string,
      query: {
        "cliend-id": string;
        "cliend-secret": string;
        /** @format int64 */
        code: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ResUserInfoResponse, any>({
        path: `/third/login/oauth2/${source}/userInfo`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name Render
     * @summary 获取第三方登录认证地址
     * @request GET:/third/login/render/{source}
     * @secure
     * @response `200` `void` OK
     */,
    render: (source: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/third/login/render/${source}`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name Render3
     * @summary 获取第三方登录认证地址
     * @request PUT:/third/login/render/{source}
     * @secure
     * @response `200` `void` OK
     */,
    render3: (source: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/third/login/render/${source}`,
        method: "PUT",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name Render2
     * @summary 获取第三方登录认证地址
     * @request POST:/third/login/render/{source}
     * @secure
     * @response `200` `void` OK
     */,
    render2: (source: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/third/login/render/${source}`,
        method: "POST",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name Render5
     * @summary 获取第三方登录认证地址
     * @request DELETE:/third/login/render/{source}
     * @secure
     * @response `200` `void` OK
     */,
    render5: (source: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/third/login/render/${source}`,
        method: "DELETE",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name Render6
     * @summary 获取第三方登录认证地址
     * @request OPTIONS:/third/login/render/{source}
     * @secure
     * @response `200` `void` OK
     */,
    render6: (source: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/third/login/render/${source}`,
        method: "OPTIONS",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name Render1
     * @summary 获取第三方登录认证地址
     * @request HEAD:/third/login/render/{source}
     * @secure
     * @response `200` `void` OK
     */,
    render1: (source: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/third/login/render/${source}`,
        method: "HEAD",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name Render4
     * @summary 获取第三方登录认证地址
     * @request PATCH:/third/login/render/{source}
     * @secure
     * @response `200` `void` OK
     */,
    render4: (source: string, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/third/login/render/${source}`,
        method: "PATCH",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name LoginThirdEx
     * @summary 获取第三方登录回调入口
     * @request GET:/third/login/loginThird/{source}/callback
     * @secure
     * @response `200` `ResTokenResponse` OK
     */,
    loginThirdEx: (
      source: string,
      query: {
        callback: ThirdAuthCallback;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ResTokenResponse, any>({
        path: `/third/login/loginThird/${source}/callback`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name LoginThirdEx3
     * @summary 获取第三方登录回调入口
     * @request PUT:/third/login/loginThird/{source}/callback
     * @secure
     * @response `200` `ResTokenResponse` OK
     */,
    loginThirdEx3: (
      source: string,
      query: {
        callback: ThirdAuthCallback;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ResTokenResponse, any>({
        path: `/third/login/loginThird/${source}/callback`,
        method: "PUT",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name LoginThirdEx2
     * @summary 获取第三方登录回调入口
     * @request POST:/third/login/loginThird/{source}/callback
     * @secure
     * @response `200` `ResTokenResponse` OK
     */,
    loginThirdEx2: (
      source: string,
      query: {
        callback: ThirdAuthCallback;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ResTokenResponse, any>({
        path: `/third/login/loginThird/${source}/callback`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name LoginThirdEx5
     * @summary 获取第三方登录回调入口
     * @request DELETE:/third/login/loginThird/{source}/callback
     * @secure
     * @response `200` `ResTokenResponse` OK
     */,
    loginThirdEx5: (
      source: string,
      query: {
        callback: ThirdAuthCallback;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ResTokenResponse, any>({
        path: `/third/login/loginThird/${source}/callback`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name LoginThirdEx6
     * @summary 获取第三方登录回调入口
     * @request OPTIONS:/third/login/loginThird/{source}/callback
     * @secure
     * @response `200` `ResTokenResponse` OK
     */,
    loginThirdEx6: (
      source: string,
      query: {
        callback: ThirdAuthCallback;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ResTokenResponse, any>({
        path: `/third/login/loginThird/${source}/callback`,
        method: "OPTIONS",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name LoginThirdEx1
     * @summary 获取第三方登录回调入口
     * @request HEAD:/third/login/loginThird/{source}/callback
     * @secure
     * @response `200` `ResTokenResponse` OK
     */,
    loginThirdEx1: (
      source: string,
      query: {
        callback: ThirdAuthCallback;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ResTokenResponse, any>({
        path: `/third/login/loginThird/${source}/callback`,
        method: "HEAD",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：A001
     *
     * @tags third-auth-controller
     * @name LoginThirdEx4
     * @summary 获取第三方登录回调入口
     * @request PATCH:/third/login/loginThird/{source}/callback
     * @secure
     * @response `200` `ResTokenResponse` OK
     */,
    loginThirdEx4: (
      source: string,
      query: {
        callback: ThirdAuthCallback;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<ResTokenResponse, any>({
        path: `/third/login/loginThird/${source}/callback`,
        method: "PATCH",
        query: query,
        secure: true,
        ...params,
      }),
  };
  shell = {
    /**
     * @description 开发者：ko
     *
     * @tags shell-record-controller
     * @name PagingShellFlowRecord
     * @summary 贝壳记录接口
     * @request POST:/shell/record/paging
     * @secure
     * @response `200` `IPagePagingShellFlowRecordResponse` OK
     */
    pagingShellFlowRecord: (
      data: PagingShellFlowRecordRequest,
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingShellFlowRecordResponse, any>({
        path: `/shell/record/paging`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：我去整点薯条
     *
     * @tags shell-distribution-controller
     * @name PagingShellDistribution
     * @summary 贝壳分发记录接口
     * @request POST:/shell/distribution/paging
     * @secure
     * @response `200` `IPagePagingShellDistributionResponse` OK
     */,
    pagingShellDistribution: (
      data: PagingShellDistributionRequest,
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingShellDistributionResponse, any>({
        path: `/shell/distribution/paging`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：我去整点薯条
     *
     * @tags shell-distribution-controller
     * @name AddShellDistribution
     * @summary 分发贝壳接口
     * @request POST:/shell/distribution/add
     * @secure
     * @response `200` `void` OK
     */,
    addShellDistribution: (data: AddShellDistributionRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/shell/distribution/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags shell-deduction-controller
     * @name PagingShellDeduct
     * @summary (后台管理员主动)扣除的贝壳记录接口
     * @request POST:/shell/deduction/paging
     * @secure
     * @response `200` `IPagePagingShellDeductionResponse` OK
     */,
    pagingShellDeduct: (
      data: PagingShellDistributionRequest,
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingShellDeductionResponse, any>({
        path: `/shell/deduction/paging`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags shell-deduction-controller
     * @name ShellDeduct
     * @summary (后台管理员主动)扣除贝壳接口
     * @request POST:/shell/deduction/deduct
     * @secure
     * @response `200` `void` OK
     */,
    shellDeduct: (data: DeDuctShellRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/shell/deduction/deduct`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：我去整点薯条
     *
     * @tags shell-account-controller
     * @name PagingShellAccount
     * @summary 贝壳账户分页接口
     * @request POST:/shell/accounts
     * @secure
     * @response `200` `IPagePagingShellAccountResponse` OK
     */,
    pagingShellAccount: (
      data: PagingShellAccountRequest,
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingShellAccountResponse, any>({
        path: `/shell/accounts`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags shell-account-controller
     * @name GetShellTotal
     * @summary 获取：贝壳总数 贝壳流通数 RW社区持有贝壳数
     * @request GET:/shell/accounts/total
     * @secure
     * @response `200` `ShellTotalResponse` OK
     */,
    getShellTotal: (params: RequestParams = {}) =>
      this.http.request<ShellTotalResponse, any>({
        path: `/shell/accounts/total`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags shell-account-controller
     * @name GetUserAccountFlow
     * @summary 当前用户贝壳账户流水记录接口
     * @request GET:/shell/accounts/flow
     * @secure
     * @response `200` `IPagePagingShellAccoutFlowResponse` OK
     */,
    getUserAccountFlow: (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingShellAccoutFlowResponse, any>({
        path: `/shell/accounts/flow`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：我去整点薯条
     *
     * @tags shell-account-controller
     * @name GetCurrentUserAccount
     * @summary 当前用户贝壳账户接口
     * @request GET:/shell/accounts/current-user
     * @secure
     * @response `200` `GetCurrentUserAccountResponse` OK
     */,
    getCurrentUserAccount: (params: RequestParams = {}) =>
      this.http.request<GetCurrentUserAccountResponse, any>({
        path: `/shell/accounts/current-user`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  rss = {
    /**
     * @description 只需要name、url、icon，后端负责人：qingchen
     *
     * @tags 公共部分:RSS
     * @name AddType
     * @summary 新增RSS源类型
     * @request POST:/rss/type/add
     * @secure
     * @response `200` `void` OK
     */
    addType: (data: RssTypeForm, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/rss/type/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 只需要name、url、typeId，后端负责人：qingchen
     *
     * @tags 公共部分:RSS
     * @name AddSource
     * @summary 新增RSS源
     * @request POST:/rss/sources/add
     * @secure
     * @response `200` `void` OK
     */,
    addSource: (data: RssSourceForm, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/rss/sources/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 后端负责人：qingchen
     *
     * @tags 公共部分:RSS
     * @name GetAllTypes
     * @summary 获取所有RSS源类型
     * @request GET:/rss/type/list
     * @secure
     * @response `200` `(RssType)[]` OK
     */,
    getAllTypes: (params: RequestParams = {}) =>
      this.http.request<RssType[], any>({
        path: `/rss/type/list`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 后端负责人：qingchen
     *
     * @tags 公共部分:RSS
     * @name GetAllSources
     * @summary 根据TypeID获取所有RSS源列表
     * @request GET:/rss/sources/list/{typeId}
     * @secure
     * @response `200` `(RssSource)[]` OK
     */,
    getAllSources: (typeId: number, params: RequestParams = {}) =>
      this.http.request<RssSource[], any>({
        path: `/rss/sources/list/${typeId}`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 后端负责人：qingchen
     *
     * @tags 公共部分:RSS
     * @name GetArticlesId
     * @summary 根据articleID获取文章详情
     * @request GET:/rss/article/{articleId}
     * @secure
     * @response `200` `RssArticle` OK
     */,
    getArticlesId: (articleId: number, params: RequestParams = {}) =>
      this.http.request<RssArticle, any>({
        path: `/rss/article/${articleId}`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 后端负责人：qingchen
     *
     * @tags 公共部分:RSS
     * @name GetArticlesBySourceId
     * @summary 根据sourceID获取列表
     * @request GET:/rss/article/list/{sourceId}
     * @secure
     * @response `200` `IPageRssArticleResponse` OK
     */,
    getArticlesBySourceId: (
      sourceId: number,
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPageRssArticleResponse, any>({
        path: `/rss/article/list/${sourceId}`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  payment = {
    /**
     * @description 返回的code_url是二维码的内容，time_expire是订单过期时间(开发者：ko)
     *
     * @tags payment-controller
     * @name Pay
     * @summary 发起支付
     * @request POST:/payment/toPay
     * @secure
     * @response `200` `Record<string,object>` OK
     */
    pay: (data: ToPayRequest, params: RequestParams = {}) =>
      this.http.request<Record<string, object>, any>({
        path: `/payment/toPay`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags payment-controller
     * @name Methods
     * @summary 查询支付方式列表
     * @request POST:/payment/methods
     * @secure
     * @response `200` `(PagingPaymentMethodResponse)[]` OK
     */,
    methods: (data: PagingPaymentMethodRequest, params: RequestParams = {}) =>
      this.http.request<PagingPaymentMethodResponse[], any>({
        path: `/payment/methods`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 返回结果 成功 SUCCESS 未支付 NOTPAY 已关闭（取消支付或者超时关闭） CLOSED  （开发者：ko
     *
     * @tags payment-controller
     * @name Query
     * @summary 主动查询支付结果
     * @request GET:/payment/query/{trade_type}/{sn}
     * @secure
     * @response `200` `"NOTPAY" | "SUCCESS" | "CLOSED" | "REFUND"` OK
     */,
    query: (
      tradeType: "ORDER" | "BUY_SHELL" | "BUY_MEMBERSHIP" | "BUY_RECOMMEND_JOB" | "debugger",
      sn: string,
      params: RequestParams = {},
    ) =>
      this.http.request<"NOTPAY" | "SUCCESS" | "CLOSED" | "REFUND", any>({
        path: `/payment/query/${tradeType}/${sn}`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags payment-controller
     * @name PayCallback
     * @summary 接收支付异步回调
     * @request GET:/payment/callback/{trade_type}/{plugin_id}/{client_type}
     * @secure
     * @response `200` `Record<string,string>` OK
     */,
    payCallback: (tradeType: string, pluginId: string, clientType: string, params: RequestParams = {}) =>
      this.http.request<Record<string, string>, any>({
        path: `/payment/callback/${tradeType}/${pluginId}/${clientType}`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags payment-controller
     * @name PayCallback3
     * @summary 接收支付异步回调
     * @request PUT:/payment/callback/{trade_type}/{plugin_id}/{client_type}
     * @secure
     * @response `200` `Record<string,string>` OK
     */,
    payCallback3: (tradeType: string, pluginId: string, clientType: string, params: RequestParams = {}) =>
      this.http.request<Record<string, string>, any>({
        path: `/payment/callback/${tradeType}/${pluginId}/${clientType}`,
        method: "PUT",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags payment-controller
     * @name PayCallback2
     * @summary 接收支付异步回调
     * @request POST:/payment/callback/{trade_type}/{plugin_id}/{client_type}
     * @secure
     * @response `200` `Record<string,string>` OK
     */,
    payCallback2: (tradeType: string, pluginId: string, clientType: string, params: RequestParams = {}) =>
      this.http.request<Record<string, string>, any>({
        path: `/payment/callback/${tradeType}/${pluginId}/${clientType}`,
        method: "POST",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags payment-controller
     * @name PayCallback5
     * @summary 接收支付异步回调
     * @request DELETE:/payment/callback/{trade_type}/{plugin_id}/{client_type}
     * @secure
     * @response `200` `Record<string,string>` OK
     */,
    payCallback5: (tradeType: string, pluginId: string, clientType: string, params: RequestParams = {}) =>
      this.http.request<Record<string, string>, any>({
        path: `/payment/callback/${tradeType}/${pluginId}/${clientType}`,
        method: "DELETE",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags payment-controller
     * @name PayCallback6
     * @summary 接收支付异步回调
     * @request OPTIONS:/payment/callback/{trade_type}/{plugin_id}/{client_type}
     * @secure
     * @response `200` `Record<string,string>` OK
     */,
    payCallback6: (tradeType: string, pluginId: string, clientType: string, params: RequestParams = {}) =>
      this.http.request<Record<string, string>, any>({
        path: `/payment/callback/${tradeType}/${pluginId}/${clientType}`,
        method: "OPTIONS",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags payment-controller
     * @name PayCallback1
     * @summary 接收支付异步回调
     * @request HEAD:/payment/callback/{trade_type}/{plugin_id}/{client_type}
     * @secure
     * @response `200` `Record<string,string>` OK
     */,
    payCallback1: (tradeType: string, pluginId: string, clientType: string, params: RequestParams = {}) =>
      this.http.request<Record<string, string>, any>({
        path: `/payment/callback/${tradeType}/${pluginId}/${clientType}`,
        method: "HEAD",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags payment-controller
     * @name PayCallback4
     * @summary 接收支付异步回调
     * @request PATCH:/payment/callback/{trade_type}/{plugin_id}/{client_type}
     * @secure
     * @response `200` `Record<string,string>` OK
     */,
    payCallback4: (tradeType: string, pluginId: string, clientType: string, params: RequestParams = {}) =>
      this.http.request<Record<string, string>, any>({
        path: `/payment/callback/${tradeType}/${pluginId}/${clientType}`,
        method: "PATCH",
        secure: true,
        ...params,
      }),
  };
  nomad = {
    /**
     * @description 用于后台管理端，后端负责人：ko
     *
     * @tags 公共部分:游民标签
     * @name AddNomadLabel
     * @summary 新增游民标签
     * @request POST:/nomad/labels/add
     * @secure
     * @response `200` `void` OK
     */
    addNomadLabel: (data: AddNomadLabelRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/nomad/labels/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 后端负责人：ko
     *
     * @tags 公共部分:游民标签
     * @name ListNomadLabel
     * @summary 获取游民标签列表
     * @request GET:/nomad/labels/list
     * @secure
     * @response `200` `(ListNomadLabelResponse)[]` OK
     */,
    listNomadLabel: (params: RequestParams = {}) =>
      this.http.request<ListNomadLabelResponse[], any>({
        path: `/nomad/labels/list`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 用于后台管理端，后端负责人：ko
     *
     * @tags 公共部分:游民标签
     * @name DeleteNomadLabel
     * @summary 删除游民标签
     * @request DELETE:/nomad/labels/{id}
     * @secure
     * @response `200` `void` OK
     */,
    deleteNomadLabel: (id: number, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/nomad/labels/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  memberShip = {
    /**
     * @description 开发者：ko
     *
     * @tags member-controller
     * @name UseMembershipRedeemCode
     * @summary 使用兑换码成为会员
     * @request POST:/memberShip/useRedeemCode
     * @secure
     * @response `200` `BuyMemberShipResponse` OK
     */
    useMembershipRedeemCode: (data: UseMembershipRedeemCodeRequest, params: RequestParams = {}) =>
      this.http.request<BuyMemberShipResponse, any>({
        path: `/memberShip/useRedeemCode`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-controller
     * @name BuyMemberShipPackage
     * @summary 购买会员套餐成为会员
     * @request POST:/memberShip/buyPackage
     * @secure
     * @response `200` `BuyMemberShipResponse` OK
     */,
    buyMemberShipPackage: (data: BuyMemberShipRequest, params: RequestParams = {}) =>
      this.http.request<BuyMemberShipResponse, any>({
        path: `/memberShip/buyPackage`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags member-controller
     * @name PagingMemberShipOrders
     * @summary 分页查询会员订单
     * @request GET:/memberShip/orders
     * @secure
     * @response `200` `IPagePagingMemberShipOrderResponse` OK
     */,
    pagingMemberShipOrders: (
      query: {
        orderQueryRequest: PagingMemberShipOrderRequest;
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingMemberShipOrderResponse, any>({
        path: `/memberShip/orders`,
        method: "GET",
        query: this.http.flattenQuery(query),
        secure: true,
        ...params,
      }),
  };
  mail = {
    /**
     * @description 开发者：qingchen
     *
     * @tags mail-controller
     * @name SendTemplateEmail
     * @summary 批量发送模版邮件接口
     * @request POST:/mail/sendTemplateEmail
     * @secure
     * @response `200` `void` OK
     */
    sendTemplateEmail: (data: EmailRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/mail/sendTemplateEmail`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：qingchen
     *
     * @tags mail-controller
     * @name SendEmail
     * @summary 发送邮件通用接口
     * @request POST:/mail/sendEmail
     * @secure
     * @response `200` `void` OK
     */,
    sendEmail: (data: EmailRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/mail/sendEmail`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  job = {
    /**
     * @description 开发者：qingchen
     *
     * @tags job-subscribe-controller
     * @name UpdateJobSubscribe
     * @summary 修改订阅
     * @request POST:/job/subscribes/update
     * @secure
     * @response `200` `void` OK
     */
    updateJobSubscribe: (data: AddJobSubscribeRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/job/subscribes/update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：BingLi.Wu
     *
     * @tags job-subscribe-controller
     * @name AddJobSubscribe
     * @summary 添加订阅
     * @request POST:/job/subscribes/add
     * @secure
     * @response `200` `void` OK
     */,
    addJobSubscribe: (data: AddJobSubscribeRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/job/subscribes/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * No description
     *
     * @tags job-label-controller
     * @name AddJobLabel
     * @request POST:/job/labels/add
     * @secure
     * @response `200` `void` OK
     */,
    addJobLabel: (
      query: {
        request: AddJobLabelRequest;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<void, any>({
        path: `/job/labels/add`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 用于后台管理端，开发者：ko
     *
     * @tags 公共部分:职位分类
     * @name Add
     * @summary 增加职位分类
     * @request POST:/job/classes/add
     * @secure
     * @response `200` `void` OK
     */,
    add: (data: AddJobClassRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/job/classes/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：BingLi.Wu
     *
     * @tags job-subscribe-controller
     * @name GetJobSubscribeById
     * @summary 获取订阅
     * @request GET:/job/subscribes/get
     * @secure
     * @response `200` `JobSubscribeResponse` OK
     */,
    getJobSubscribeById: (params: RequestParams = {}) =>
      this.http.request<JobSubscribeResponse, any>({
        path: `/job/subscribes/get`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags job-label-controller
     * @name ListJobLabel
     * @request GET:/job/labels/list
     * @secure
     * @response `200` `(ListJobLabelResponse)[]` OK
     */,
    listJobLabel: (params: RequestParams = {}) =>
      this.http.request<ListJobLabelResponse[], any>({
        path: `/job/labels/list`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags 公共部分:职位分类
     * @name ListJobClass
     * @summary 获取职位分类接口列表
     * @request GET:/job/classes/list
     * @secure
     * @response `200` `(ListJobClassResponse)[]` OK
     */,
    listJobClass: (params: RequestParams = {}) =>
      this.http.request<ListJobClassResponse[], any>({
        path: `/job/classes/list`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：BingLi.Wu
     *
     * @tags job-subscribe-controller
     * @name CancelJobSubscribe
     * @summary 取消订阅
     * @request DELETE:/job/subscribes/cancel
     * @secure
     * @response `200` `void` OK
     */,
    cancelJobSubscribe: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/job/subscribes/cancel`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  favorites = {
    /**
     * @description 开发者：我去整点薯条
     *
     * @tags favorite-controller
     * @name AddFavorite
     * @summary 添加收藏接口
     * @request POST:/favorites
     * @secure
     * @response `200` `void` OK
     */
    addFavorite: (data: AddFavoriteRequest, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/favorites`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：我去整点薯条
     *
     * @tags favorite-controller
     * @name PagingJobFavorite
     * @summary 远程工作收藏列表接口
     * @request GET:/favorites/jobs
     * @secure
     * @response `200` `IPagePagingJobResponse` OK
     */,
    pagingJobFavorite: (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingJobResponse, any>({
        path: `/favorites/jobs`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * @description 开发者：我去整点薯条
     *
     * @tags favorite-controller
     * @name DeleteFavorite
     * @summary 删除收藏接口
     * @request DELETE:/favorites/{type}/{id}
     * @secure
     * @response `200` `void` OK
     */,
    deleteFavorite: (
      type: "REMOTE_WORK" | "NOMAD_ACTIVITY" | "SHARED_OFFICE" | "NOMAD_BASE" | "RESIDE_ABROAD",
      id: number,
      params: RequestParams = {},
    ) =>
      this.http.request<void, any>({
        path: `/favorites/${type}/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  currency = {
    /**
     * @description 开发者：ko
     *
     * @tags 公共部分:币种
     * @name Add1
     * @summary 增加币种
     * @request POST:/currency/add
     * @secure
     * @response `200` `void` OK
     */
    add1: (data: Currency, params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/currency/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      })
    /**
     * @description 开发者：ko
     *
     * @tags 公共部分:币种
     * @name GetAll
     * @summary 获取币种列表
     * @request GET:/currency/all
     * @secure
     * @response `200` `(Currency)[]` OK
     */,
    getAll: (params: RequestParams = {}) =>
      this.http.request<Currency[], any>({
        path: `/currency/all`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  api = {
    /**
     * No description
     *
     * @tags embedding-controller
     * @name GenerateResumeEmbeddings
     * @request POST:/api/embedding/generate/resume
     * @secure
     * @response `200` `void` OK
     */
    generateResumeEmbeddings: (
      query: {
        /** @format int64 */
        resumeId: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<void, any>({
        path: `/api/embedding/generate/resume`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags embedding-controller
     * @name GenerateJobEmbeddings
     * @request POST:/api/embedding/generate/job
     * @secure
     * @response `200` `void` OK
     */,
    generateJobEmbeddings: (
      query: {
        /** @format int64 */
        jobId: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<void, any>({
        path: `/api/embedding/generate/job`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),
  };
  ai = {
    /**
     * No description
     *
     * @tags match-controller
     * @name SyncVector
     * @request POST:/ai/vector/sync
     * @secure
     * @response `200` `void` OK
     */
    syncVector: (
      query?: {
        type?: string;
        /**
         * @format int64
         * @default 0
         */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<void, any>({
        path: `/ai/vector/sync`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags match-controller
     * @name GetMatchingJobs
     * @request GET:/ai/match/user/{userId}
     * @secure
     * @response `200` `(SearchResult)[]` OK
     */,
    getMatchingJobs: (
      userId: number,
      query?: {
        job_ids?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<SearchResult[], any>({
        path: `/ai/match/user/${userId}`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags match-controller
     * @name GetTopNMatchingJobs
     * @request GET:/ai/match/user/top
     * @secure
     * @response `200` `IPagePagingJobResponse` OK
     */,
    getTopNMatchingJobs: (
      query: {
        /** @format int32 */
        topN: number;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingJobResponse, any>({
        path: `/ai/match/user/top`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags match-controller
     * @name O
     * @request GET:/ai/match/optimize/{jobId}
     * @secure
     * @response `200` `Record<string,object>` OK
     */,
    o: (jobId: number, params: RequestParams = {}) =>
      this.http.request<Record<string, object>, any>({
        path: `/ai/match/optimize/${jobId}`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags match-controller
     * @name GetMatchingResumes
     * @request GET:/ai/match/job/{jobId}
     * @secure
     * @response `200` `(SearchResult)[]` OK
     */,
    getMatchingResumes: (
      jobId: number,
      query?: {
        resume_ids?: number[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<SearchResult[], any>({
        path: `/ai/match/job/${jobId}`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags match-controller
     * @name GetMatchDetails
     * @request GET:/ai/match/detail/{jobId}
     * @secure
     * @response `200` `MatchDetail` OK
     */,
    getMatchDetails: (jobId: number, params: RequestParams = {}) =>
      this.http.request<MatchDetail, any>({
        path: `/ai/match/detail/${jobId}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  resumes = {
    /**
     * @description 开发者：Antigravity
     *
     * @tags resume-access-controller
     * @name DownloadResume
     * @summary 下载/查看简历原始文件 (私有桶代理)
     * @request GET:/resumes/download
     * @secure
     * @response `200` `File` OK
     */
    downloadResume: (
      query: {
        key: string;
      },
      params: RequestParams = {},
    ) =>
      this.http.request<File, any>({
        path: `/resumes/download`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  regions = {
    /**
     * No description
     *
     * @tags region-controller
     * @name GetCountries
     * @request GET:/regions/countries
     * @secure
     * @response `200` `(RegionDetailResponse)[]` OK
     */
    getCountries: (params: RequestParams = {}) =>
      this.http.request<RegionDetailResponse[], any>({
        path: `/regions/countries`,
        method: "GET",
        secure: true,
        ...params,
      })
    /**
     * No description
     *
     * @tags region-controller
     * @name GetProvinces
     * @request GET:/regions/countries/{countryId}/provinces
     * @secure
     * @response `200` `(RegionDetailResponse)[]` OK
     */,
    getProvinces: (countryId: number, params: RequestParams = {}) =>
      this.http.request<RegionDetailResponse[], any>({
        path: `/regions/countries/${countryId}/provinces`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  loginRecords = {
    /**
     * @description 开发者：我去整点薯条
     *
     * @tags login-record-controller
     * @name PagingLoginRecord
     * @summary 登陆记录接口
     * @request GET:/login-records
     * @secure
     * @response `200` `IPagePagingLoginRecordResponse` OK
     */
    pagingLoginRecord: (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingLoginRecordResponse, any>({
        path: `/login-records`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  hobbies = {
    /**
     * @description 开发者：我去整点薯条
     *
     * @tags hobby-controller
     * @name ListHobby
     * @summary 爱好列表接口
     * @request GET:/hobbies
     * @secure
     * @response `200` `ListHobbyResponse` OK
     */
    listHobby: (params: RequestParams = {}) =>
      this.http.request<ListHobbyResponse, any>({
        path: `/hobbies`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  countries = {
    /**
     * @description 后端负责人：ko
     *
     * @tags 公共部分:国家地区
     * @name ListCountry
     * @summary 获取国家地区列表
     * @request GET:/countries
     * @secure
     * @response `200` `ListCountryResponse` OK
     */
    listCountry: (params: RequestParams = {}) =>
      this.http.request<ListCountryResponse, any>({
        path: `/countries`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  apply = {
    /**
     * @description 开发者：
     *
     * @tags 工作申请记录
     * @name PagingAppliedJobs
     * @summary 用户已申请远程工作列表接口
     * @request GET:/apply/jobs
     * @secure
     * @response `200` `IPagePagingJobResponse` OK
     */
    pagingAppliedJobs: (
      query?: {
        /**
         * Zero-based page index (0..N)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * The size of the page to be returned
         * @min 1
         * @default 20
         */
        size?: number;
        /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
        sort?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.http.request<IPagePagingJobResponse, any>({
        path: `/apply/jobs`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
}
