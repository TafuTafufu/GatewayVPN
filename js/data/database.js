/**
 * =========================================================
 * 检索数据库与彩蛋关键词库 (Search & Anomaly Database)
 * =========================================================
 */

// 1. 玩家特定暗号专属卡片 (根据当前登录账号展现)
const customUserResults = {
    "peanut": {
        "schnell": {
            title: "【今日速报】",
            domain: "aegis.gateway.internal/user/peanut/schnell-telemetry",
            snippet: "来自异世界的二尺旋风为您带来问候！",
            image: "assets/Gardengnome.png",
            detailText: "【协同节点传输文案】\n来自异世界的二尺旋风为您带来问候！\n\n数据包签名一致，通道状态正常。",
            footer: "#真的还能长 #两尺不是我的极限 #哎这是我家不是松鼠洞！！"
        }
    },
    "schnell": {
        "peanut": {
            title: "【今日速报】",
            domain: "aegis.gateway.internal/user/schnell/peanut-telemetry",
            snippet: "Peanut 今日战利品：极品伊斯班克，全新标签，纯净如水！",
            image: "assets/ithbank.png",
            detailText: "【战利品检视日志】\nPeanut 今日战利品：极品伊斯班克，全新标签，纯净如水！",
            footer: "#我用了动物交谈药水  #幸好我跑的飞快 #奇怪今天城镇守卫怎么没来抓我"
        }
    }
};

// 2. 全局通用彩蛋与案宗线索数据库
const database = {
    // 所有人搜 tafu / 掌局者 时触发的档案
    "tafu": {
        title: "档案分类: Delta Green 掌局者 / 局外观察者 (Tafu)",
        domain: "aegis.gateway.internal/classified/handler-tafu-overview",
        snippet: "作为掌握异常真相与剧本走向的掌局者（Handler），其在幕后操纵着所有现实算力与数据线的交错。请时刻保持警惕，你所经历的一切并非偶然，而是早已被观测与规划好的网格。",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
        detailText: "【详细解密档案】\n掌局者（Handler）不仅负责调度绿色三角洲的特别行动小组，还掌握着整个系统的底层协议。在过去的多次行动报告中，凡是试图破解其真实身份的操作，均触发了物理层面的逻辑坍坍。",
        footer: "来源: 局外高维观察者档案 / 权限锁定: CLEARANCE Delta"
    },

    // 矮人模拟器小游戏彩蛋节点 (修复嵌入双引号与路径问题)
    "dwarf": {
        title: "【暗网程序】地牢矮人协议模拟器.exe",
        domain: "aegis.gateway.internal/games/dwarf_adventure",
        snippet: "检测到像素协议数据包。点击启动内置小游戏模拟器视窗。",
        detailText: "【小程序挂载成功】\n\n可以直接在主控制台中央视窗游玩，或点击下方链接在新窗口打开：\n<a href=\"games/dwarf_adventure/index.html\" target=\"_blank\" style=\"color:#00e5ff; font-weight:bold;\">[在新标签页全屏打开小游戏]</a>",
        footer: "SYSTEM // MINI-GAME MODULE"
    },

    // 案宗线索：麦凯
    "mckay": {
        title: "康奈尔大学姐妹会枪案 - 嫌疑人布拉德利·麦凯 (Bradley McKay) 案宗记录",
        domain: "ithaca-pd.gov/restricted/file-CAR-5-58",
        snippet: "【物证鉴定与矛盾报告】嫌疑人麦凯使用无序列号的定制步枪(5.58mm口径)。其设备缓存中发现多张虐杀照片，显示数名女性在姐妹会解剖艾弗里·贝尔。然而警方物理核查确认：贝尔毫发无损，照片中的女性（加尔珀等）均具有绝对的不在场证明，且现场房间结构与照片严重不符。",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600",
        detailText: "【深层次证据链分析】\n现场提取到多张高清晰度拍立得照片。值得注意的是，照片物证的底片呈现出严重的电磁辐射灼痕。伊萨卡警方物证科认为图像存在高度人为伪造或非欧几何透视倾斜。",
        footer: "调阅来源: 伊萨卡警方刑事侦查科 / 证据物证室档案"
    },

    // 案宗线索：库尔教授
    "cool": {
        title: "麻省理工学院 (MIT) 韦斯利·库尔教授 (Prof. Wesley Cool) 人事与门禁卷宗",
        domain: "mit.edu/math/faculty/cool_w_archive",
        snippet: "【门禁与学术记录】库尔自2016年底后未有离开大楼的影像记录。其著作《无主之谛》(Meaning Without Master)探讨了‘观察者意识与物理子结构之交互’。邮件日志包含发给戏剧系博耶教授与研究生维姬·金的底层协议设置指南。系主任对其道德评价极低。",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600",
        detailText: "【学术手稿调阅】\n摘自《无主之谛》第 4 章：当观察者放弃对实在性的连续性假定，子结构算子便会在局部呈现出确定性溃塌。库尔教授办公室内发现大量未寄出的加密航邮。",
        footer: "状态: 麻省理工学院数学系教员档案 (目前状态异常)"
    },

    // 案宗线索：维姬·金
    "king": {
        title: "宾夕法尼亚州踢泉镇 (Kick Springs) 维姬·金 (Vicki King) 住宅封存记录",
        domain: "county-registry.pa.gov/kicksprings/property_408",
        snippet: "【住宅查封与监护通知】‘国家儿童与家庭服务局’通知表明该住宅已被查封。室内住有孪生姐妹艾琳与谢莉雅，虽然出生证明显示其生理年龄仅3岁，但现场两人已呈现出十几岁少女体征。主卧区域存在极高频电磁辐射与严重精神偏执痕迹。",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600",
        detailText: "【现场搜查报告】\n住宅主卧墙壁贴满了带有屏蔽金箔的报纸。辐射检测仪在靠近壁橱区域时读数剧烈飙升，地下室入口被用电焊接死。",
        footer: "来源: 地方警长办事处 / 银行止赎通知外包档案"
    },

    // 案宗线索：沃尔斯将军
    "wallace": {
        title: "缅因州班戈市 霜橡拖车公园 - 罗伯特·沃尔斯 (Robert Wallace) 监控简报",
        domain: "bangor-pd.maine.gov/case_wallace_r",
        snippet: "【情报记录】罗伯特·沃尔斯自称‘沃尔斯将军’，长期在‘霜松’区域从事极右翼抵抗活动。报告提及该区域面临‘ANTIFA超级战士’威逼。后院拖车影音柜后发现一台惠普 Proliant dl380 服务器（托管有定制数据节点），USB接口插有标签为‘表弟快醒醒’的U盘。",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
        detailText: "【硬件与抓包附件】\n服务器日志显示，其长期通过无线调频向周围两公里广播加密数据包。U盘内部提取出一段被破坏的语音通信，内容提及‘红杉木与冷凝液’。",
        footer: "来源: 缅因州地方执法记录 / 计算机网络日志"
    },

    // 案宗线索：达比格 / 周五屠杀夜
    "dabiq": {
        title: "周五屠杀夜 (Friday Night Slaughter) 涉案枪手设备视频元数据分析",
        domain: "counter-terrorism-db.gov/dabiq-media-stream",
        snippet: "【异界圣战视频记录】两名携带‘神之和平·全球哈里发国’证件的枪手在球赛现场开火。设备中提取出达比格镇战场视频：B-21轰炸机投下的核弹在落地前化为盐粒，成千上万士兵凝滞。视频元数据创建于2121年（未来时间标记），音频语言为未知古老方言。",
        image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600",
        detailText: "【高维度图谱鉴定】\n视频帧逐帧解析显示，爆炸产生的冲击波在扩散至半径30米时出现了明显的帧率断层，盐粒化过程不符合已知热力学定律。",
        footer: "来源: 纳尼亚联合工作组 (Working Group NARNIA) 证据库"
    }
};

// 全局导出挂载
window.customUserResults = customUserResults;
window.database = database;
