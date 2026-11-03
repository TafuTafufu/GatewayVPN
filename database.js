// ============================
// Gateway VPN - 数据库与彩蛋配置
// ============================

// 1. 预设账号与密钥（彩蛋密码）
const accountDb = {
    "tafu": { password: "Schnell", profileKey: "tafu" },
    "schnell": { password: "Tafu", profileKey: "schnell" },
    "wallace": { password: "123456", profileKey: "wallace" },
    "cool": { password: "mit2016", profileKey: "cool" },
    "vicki": { password: "kick408", profileKey: "vicki" },
    "guest": { password: "", profileKey: "guest" }
};

// 2. 不同账号登录后的欢迎语与初始历史记录
const userProfiles = {
    "tafu": {
        name: "Tafu [主控专属节点]",
        welcome: "欢迎回来，Tafu。高密通道已成功建立，算法正在为您自动整理关联线索。",
        consoleLog: "[SYSTEM LOG]\nUser: Tafu\nGateway Protocol: SECURE_TUNNEL\nNote: 关联节点 Schnell 处于连线就绪状态。",
        history: ["Schnell", "Gateway VPN 核心架构", "麻省理工学院 库尔教授", "周五屠杀夜 视频提取"]
    },
    "schnell": {
        name: "Schnell [高级协同节点]",
        welcome: "通道已链接，Schnell。加密签名对齐完毕。",
        consoleLog: "[SYSTEM LOG]\nUser: Schnell\nGateway Protocol: HIGH_PRIORITY\nNote: 绑定账号 Tafu。",
        history: ["Tafu", "工业焊接高频谐振", "极右翼拖车公园监控", "班戈市网络日志"]
    },
    "wallace": {
        name: "Robert Wallace [霜橡节点]",
        welcome: "注意：已接入沃尔斯将军的私有服务器（Proliant dl380）。",
        consoleLog: "[SYSTEM LOG]\nUser: Robert Wallace (General Wallace)\nNode: Frost Pine Trailer Park\nWarning: ANTIFA 数据流防御壁垒开启。",
        history: [
            "ANTIFA 超级战士 威胁评估",
            "霜松拖车公园 极右翼抵抗运动",
            "惠普 Proliant dl380 服务器 硬件固件更新",
            "U盘 标签:表弟快醒醒 恢复代码"
        ]
    },
    "cool": {
        name: "Wesley Cool [麻省理工节点]",
        welcome: "欢迎回来，库尔教授。系统正在对齐物理子结构交互算子...",
        consoleLog: "[SYSTEM LOG]\nUser: Prof. Wesley Cool\nAccess Level: ROOT / ARCHITECT\nNote: 观测者偏置指数 99.4%。底层算子已绑定。",
        history: ["《无主之谛》 论文出版前言", "博耶教授 戏剧系 协议设置", "维姬·金 门禁日志提取", "物理子结构 交互测试"]
    },
    "vicki": {
        name: "Vicki King [踢泉镇节点]",
        welcome: "高密通道建立。检测到高频电磁辐射环境。",
        consoleLog: "[SYSTEM LOG]\nUser: Vicki King\nAccess Level: RESTRICTED\nWarning: 侦测到节点信号源重叠。",
        history: ["踢泉镇 住宅查封 通知", "孪生姐妹 生理年龄异常 报告", "极高频电磁辐射 屏蔽罩"]
    },
    "guest": {
        name: "GUEST / 访客账号",
        welcome: "本软件通过底层微结构路由协议为您提供无痕访问体验。请输入案宗关键词或人员姓名开始检索。",
        consoleLog: "[SYSTEM LOG]\nUser: Anonymous Guest\nAccess Level: STANDARD\nGateway Status: ACTIVE",
        history: ["康奈尔大学 姐妹会枪案", "伊萨卡警方 物证鉴定"]
    }
};

// 3. 自定义特定账号专属搜索词条
const customUserResults = {
    "tafu": {
        "schnell": {
            title: "🔐 [专属加密文档] 关于 Schnell 的通信与协同记录",
            domain: "aegis.gateway.internal/user/tafu/schnell-telemetry",
            snippet: "【双向握手成功】关联签名: Schnell。该节点与 Tafu 的物理算子呈现 100% 谐振。历史拦截日志显示多次高频工业谐振数据传输，底盘及信号节点均已锁定。",
            footer: "机密等级: ROOT ONLY / 独家解读权限"
        }
    },
    "schnell": {
        "tafu": {
            title: "🔐 [专属加密文档] 关于 Tafu 的主控节点联络日志",
            domain: "aegis.gateway.internal/user/schnell/tafu-telemetry",
            snippet: "【协同隧道状态: 稳定】关联签名: Tafu。主控节点授权已通过，检测到高密数据映射气泡正常运转。",
            footer: "机密等级: ROOT ONLY / 独家解读权限"
        }
    }
};

// 4. 全局模组/暗网案宗数据库
const database = {
    "mckay": {
        title: "康奈尔大学姐妹会枪案 - 嫌疑人布拉德利·麦凯 (Bradley McKay) 案宗记录",
        domain: "ithaca-pd.gov/restricted/file-CAR-5-58",
        snippet: "【物证鉴定与矛盾报告】嫌疑人麦凯使用无序列号的定制步枪(5.58mm口径)。其设备缓存中发现多张虐杀照片，显示数名女性在姐妹会解剖艾弗里·贝尔。然而警方物理核查确认：贝尔毫发无损，照片中的女性（加尔珀等）均具有绝对的不在场证明，且现场房间结构与照片严重不符。",
        footer: "调阅来源: 伊萨卡警方刑事侦查科 / 证据物证室档案"
    },
    "cool": {
        title: "麻省理工学院 (MIT) 韦斯利·库尔教授 (Prof. Wesley Cool) 人事与门禁卷宗",
        domain: "mit.edu/math/faculty/cool_w_archive",
        snippet: "【门禁与学术记录】库尔自2016年底后未有离开大楼的影像记录。其著作《无主之谛》(Meaning Without Master)探讨了‘观察者意识与物理子结构之交互’。邮件日志包含发给戏剧系博耶教授与研究生维姬·金的底层协议设置指南。系主任对其道德评价极低。",
        footer: "状态: 麻省理工学院数学系教员档案 (目前状态异常)"
    },
    "king": {
        title: "宾夕法尼亚州踢泉镇 (Kick Springs) 维姬·金 (Vicki King) 住宅封存记录",
        domain: "county-registry.pa.gov/kicksprings/property_408",
        snippet: "【住宅查封与监护通知】‘国家儿童与家庭服务局’通知表明该住宅已被查封。室内住有孪生姐妹艾琳与谢莉雅，虽然出生证明显示其生理年龄仅3岁，但现场两人已呈现出十几岁少女体征。主卧区域存在极高频电磁辐射与严重精神偏执痕迹。",
        footer: "来源: 地方警长办事处 / 银行止赎通知外包档案"
    },
    "wallace": {
        title: "缅因州班戈市 霜橡拖车公园 - 罗伯特·沃尔斯 (Robert Wallace) 监控简报",
        domain: "bangor-pd.maine.gov/case_wallace_r",
        snippet: "【情报记录】罗伯特·沃尔斯自称‘沃尔斯将军’，长期在‘霜松’区域从事极右翼抵抗活动。报告提及该区域面临‘ANTIFA超级战士’威逼。后院拖车影音柜后发现一台惠普 Proliant dl380 服务器（托管有定制数据节点），USB接口插有标签为‘表弟快醒醒’的U盘。",
        footer: "来源: 缅因州地方执法记录 / 计算机网络日志"
    },
    "dabiq": {
        title: "周五屠杀夜 (Friday Night Slaughter) 涉案枪手设备视频元数据分析",
        domain: "counter-terrorism-db.gov/dabiq-media-stream",
        snippet: "【异界圣战视频记录】两名携带‘神之和平·全球哈里发国’证件的枪手在球赛现场开火。设备中提取出达比格镇战场视频：B-21轰炸机投下的核弹在落地前化为盐粒，成千上万士兵凝滞。视频元数据创建于2121年（未来时间标记），音频语言为未知古老方言。",
        footer: "来源: 纳尼亚联合工作组 (Working Group NARNIA) 证据库"
    }
};

window.accountDb = accountDb;
window.userProfiles = userProfiles;
window.customUserResults = customUserResults;
window.database = database;
