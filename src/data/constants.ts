export enum JobSalaryType {
    MONTHLY_PAY = '月薪',
    YEARLY_PAY = '年薪',
    HOUR_PAY = '时薪',
    WEEKLY_PAY = '周薪',
    DAY_PAY = '日薪',
    UNKNOWN_PAY = '薪资面议'
}

export enum JobType {
    REMOTE_FULL_TIME = "全职远程",
    REMOTE_PART_TIME = "兼职远程",
    REMOTE_INTERN = "实习远程",
    PROJECT_COOP = "项目合作",
    UNDEFINED = "未定义"
}

export enum Degree {
    BACHELOR = 'BACHELOR',
    MASTER = 'MASTER',
    DOCTORATE = 'DOCTORATE',
    MBA = 'MBA',
    COLLEGE = 'COLLEGE',
    NEED_UNLOCK = 'NEED_UNLOCK',
    OTHER = 'OTHER'
}

export const HighestEducationOptions = [
    {
        label: '学士',
        value: Degree.BACHELOR
    },
    {
        label: '硕士',
        value: Degree.MASTER
    },
    {
        label: '博士',
        value: Degree.DOCTORATE
    },
    {
        label: 'MBA',
        value: Degree.MBA
    },
    {
        label: '大专',
        value: Degree.COLLEGE
    },
    {
        label: '其他',
        value: Degree.OTHER
    }
]


export enum CareerStatus {
    STUDENT = 'STUDENT',
    FULL_TIME_JOB_OPEN = 'FULL_TIME_JOB_OPEN',
    FULL_TIME_JOB_CLOSED = 'FULL_TIME_JOB_CLOSED',
    FREELANCER = 'FREELANCER'
}

// 职业状态
export const CareerStatusOptions = [
    {
        label: '在读',
        value: CareerStatus.STUDENT
    },
    {
        label: '全职工作（看机会）',
        value: CareerStatus.FULL_TIME_JOB_OPEN
    },
    {
        label: '全职工作（不看机会）',
        value: CareerStatus.FULL_TIME_JOB_CLOSED
    },
    {
        label: '自由职业',
        value: CareerStatus.FREELANCER
    }
]


export enum WorkExperience {
    STUDENT = 'STUDENT',
    LESS_THAN_3_YEARS = 'LESS_THAN_3_YEARS',
    THREE_TO_FIVE_YEARS = 'THREE_TO_FIVE_YEARS',
    FIVE_TO_TEN_YEARS = 'FIVE_TO_TEN_YEARS',
    NEED_UNLOCK = 'NEED_UNLOCK',
    OVER_TEN_YEARS = 'OVER_TEN_YEARS'
}

// 工作经验
export const WorkExperienceOptions = [
    {
        label: '在校生',
        value: WorkExperience.STUDENT
    },
    {
        label: '3年以内',
        value: WorkExperience.LESS_THAN_3_YEARS
    },
    {
        label: '3-5年',
        value: WorkExperience.THREE_TO_FIVE_YEARS
    },
    {
        label: '5-10年',
        value: WorkExperience.FIVE_TO_TEN_YEARS
    },
    {
        label: '10年以上',
        value: WorkExperience.OVER_TEN_YEARS
    }
]


export enum SalaryExpectation {
    BELOW_5K = 'BELOW_5K',
    BETWEEN_5K_AND_10K = 'BETWEEN_5K_AND_10K',
    BETWEEN_10K_AND_20K = 'BETWEEN_10K_AND_20K',
    BETWEEN_20K_AND_30K = 'BETWEEN_20K_AND_30K',
    BETWEEN_30K_AND_50K = 'BETWEEN_30K_AND_50K',
    BETWEEN_50K_AND_100K = 'BETWEEN_50K_AND_100K',
    NEED_UNLOCK = 'NEED_UNLOCK',
    ABOVE_100K = 'ABOVE_100K'
}

// 薪酬预期
export const SalaryExpectationOptions = [
    {
        label: '5k以内',
        value: SalaryExpectation.BELOW_5K
    },
    {
        label: '5k-10k',
        value: SalaryExpectation.BETWEEN_5K_AND_10K
    },
    {
        label: '10k-20k',
        value: SalaryExpectation.BETWEEN_10K_AND_20K
    },
    {
        label: '20k-30k',
        value: SalaryExpectation.BETWEEN_20K_AND_30K
    },
    {
        label: '30k-50k',
        value: SalaryExpectation.BETWEEN_30K_AND_50K
    },
    {
        label: '50k-100k',
        value: SalaryExpectation.BETWEEN_50K_AND_100K
    },
    {
        label: '100k以上',
        value: SalaryExpectation.ABOVE_100K
    }
]


// 职业类型
export const IndustryOptions = [
    {
        label: 'AI',
        value: 'AI'
    },
    {
        label: 'Fintech',
        value: 'Fintech'
    },
    {
        label: 'IOT',
        value: 'IOT'
    },

    {
        label: 'SaaS',
        value: 'SaaS'
    },
    {
        label: 'Web3',
        value: 'Web3'
    },
    {
        label: 'XR',
        value: 'XR'
    },
    {
        label: '电商',
        value: '电商'
    },
    {
        label: '社交社区',
        value: '社交社区'
    },
    {
        label: '数字化',
        value: '数字化'
    },
    {
        label: '新消费/新零售',
        value: '新消费/新零售'
    },
    {
        label: '医疗健康',
        value: '医疗健康'
    },
    {
        label: '游戏',
        value: '游戏'
    },
    {
        label: '直播/短视频',
        value: '直播/短视频'
    },
    {
        label: '智慧城市',
        value: '智慧城市'
    },
    {
        label: '智能制造',
        value: '智能制造'
    },
    {
        label: '云计算',
        value: '云计算'
    },
    {
        label: 'O2O',
        value: 'O2O'
    },
    {
        label: '内容/媒体',
        value: '内容/媒体'
    },
    {
        label: '教育',
        value: '教育'
    },
    {
        label: 'PaaS',
        value: 'PaaS'
    },
    {
        label: '其他',
        value: '其他'
    }
];

export const CareerTypeOptions = [
    {
        label: '前端开发工程师',
        value: '前端开发工程师'
    },
    {
        label: '移动开发工程师',
        value: '移动开发工程师'
    },
    {
        label: '后端开发工程师',
        value: '后端开发工程师'
    },

    {
        label: '全栈开发工程师',
        value: '全栈开发工程师'
    },
    {
        label: '机器学习/算法工程师',
        value: '机器学习/算法工程师'
    },
    {
        label: '数据仓库工程师',
        value: '数据仓库工程师'
    },
    {
        label: '区块链/Web3 开发人员',
        value: '区块链/Web3 开发人员'
    },
    {
        label: '运维工程师',
        value: '运维工程师'
    },
    {
        label: '测试工程师',
        value: '测试工程师'
    },
    {
        label: 'UI/UX 设计师',
        value: 'UI/UX 设计师'
    },
    {
        label: '平面设计师',
        value: '平面设计师'
    },
    {
        label: '视觉设计师',
        value: '视觉设计师'
    },
    {
        label: '数据分析师',
        value: '数据分析师'
    },
    {
        label: 'C端产品经理',
        value: 'C端产品经理'
    },
    {
        label: 'B端产品经理',
        value: 'B端产品经理'
    },
    {
        label: '策略/数值产品经理',
        value: '策略/数值产品经理'
    },
    {
        label: '产品经理（其他方向）',
        value: '产品经理（其他方向）'
    },
    {
        label: '项目经理',
        value: '项目经理'
    },
    {
        label: '运营经理',
        value: '运营经理'
    },
    {
        label: '战略/咨询',
        value: '战略/咨询'
    },
    {
        label: '市场营销',
        value: '市场营销'
    },
    {
        label: '新媒体运营',
        value: '新媒体运营'
    },
    {
        label: '法务',
        value: '法务'
    },
    {
        label: '人力资源',
        value: '人力资源'
    },
    {
        label: '翻译',
        value: '翻译'
    },
    {
        label: '其他',
        value: '其他'
    }
];

// 时薪
export enum HourlyWage {
    RANGE_50_100 = 'RANGE_50_100',
    RANGE_100_150 = 'RANGE_100_150',
    RANGE_150_200 = 'RANGE_150_200',
    RANGE_250_300 = 'RANGE_250_300',
    RANGE_300_400 = 'RANGE_300_400',
    RANGE_400_500 = 'RANGE_400_500',
    RANGE_500_700 = 'RANGE_500_700',
    RANGE_700_1000 = 'RANGE_700_1000',
    RANGE_ABOVE_1000 = 'RANGE_ABOVE_1000',
}


export const HourlyWageOptions = [
    {
        label: '50-100元',
        value: HourlyWage.RANGE_50_100
    },
    {
        label: '100-150元',
        value: HourlyWage.RANGE_100_150
    },
    {
        label: '150-200元',
        value: HourlyWage.RANGE_150_200
    },
    {
        label: '200-250元',
        value: HourlyWage.RANGE_250_300
    },
    {
        label: '300-400元',
        value: HourlyWage.RANGE_300_400
    },
    {
        label: '400-500元',
        value: HourlyWage.RANGE_400_500
    },
    {
        label: '500-700元',
        value: HourlyWage.RANGE_500_700
    },
    {
        label: '700-1000元',
        value: HourlyWage.RANGE_700_1000
    },
    {
        label: '1000元以上',
        value: HourlyWage.RANGE_ABOVE_1000
    }
]


// 周工作时长
export enum WeeklyWorkHours {
    BELOW_10_HOURS = 'BELOW_10_HOURS',
    BETWEEN_10_AND_20_HOURS = 'BETWEEN_10_AND_20_HOURS',
    BETWEEN_20_AND_30_HOURS = 'BETWEEN_20_AND_30_HOURS',
    BETWEEN_30_AND_40_HOURS = 'BETWEEN_30_AND_40_HOURS',
    ABOVE_40_HOURS = 'ABOVE_40_HOURS'
}

export const WeeklyWorkHoursOptions = [
    {
        label: '10小时以内',
        value: WeeklyWorkHours.BELOW_10_HOURS
    },
    {
        label: '10-20小时',
        value: WeeklyWorkHours.BETWEEN_10_AND_20_HOURS
    },
    {
        label: '20-30小时',
        value: WeeklyWorkHours.BETWEEN_20_AND_30_HOURS
    },
    {
        label: '30-40小时',
        value: WeeklyWorkHours.BETWEEN_30_AND_40_HOURS


    },
    {
        label: '40小时以上',
        value: WeeklyWorkHours.ABOVE_40_HOURS
    }
]

export const languageOptions = [
    {
        label: '普通话',
        value: 'chinese'
    },
    {
        label: '粤语',
        value: 'cantonese'
    },
    {
        label: '英语',
        value: 'english'
    },
    {
        label: '日语',
        value: 'japanese'
    },
    {
        label: '法语',
        value: 'french'
    },
    {
        label: '德语',
        value: 'german'
    },
    {
        label: '泰语',
        value: 'thai'
    },
    {
        label: '西班牙语',
        value: 'spanish'
    },
    {
        label: '葡萄牙语',
        value: 'portuguese'
    },
    {
        label: '俄罗斯语',
        value: 'russian'
    },
    {
        label: '土耳其语',
        value: 'turkish'
    },
    {
        label: '阿拉伯语',
        value: 'arabic'
    },
    {
        label: '越南语',
        value: 'vietnamese'
    },
    {
        label: '印尼语',
        value: 'indonesian'
    },
    {
        label: '菲律宾语',
        value: 'filipino'
    },
    {
        label: '韩语',
        value: 'korean'
    },
    {
        label: '意大利语',
        value: 'italian'
    }
]
