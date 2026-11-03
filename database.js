const customUserResults = {
    "peanut": {
        "schnell": {
            title: "【今日速报】",
            domain: "aegis.gateway.internal/user/peanut/schnell-telemetry",
            snippet: "来自异世界的二尺旋风为您带来问候！",
            footer: "机密等级: ROOT ONLY / 独家解读权限"
        }
    },
    "schnell": {
        "peanut": {
            title: "【今日速报】",
            domain: "aegis.gateway.internal/user/schnell/peanut-telemetry",
            snippet: "Peanut 今日战利品：极品伊斯班克，全新标签，纯净如水！",
            footer: "机密等级: ROOT ONLY / 独家解读权限"
        }
    }
};

const database = {
    // 所有人搜 Tafu 时均会触发的掌局者介绍
    "tafu": {
        title: "档案分类: Delta Green 掌局者 / 局外观察者 (Tafu)",
        domain: "aegis.gateway.internal/classified/handler-tafu-overview",
        snippet: "作为掌握异常真相与剧本走向的掌局者（Handler），其在幕后操纵着所有现实算力与数据线的交错。请时刻保持警惕，你所经历的一切并非偶然，而是早已被观测与规划好的网格。",
        footer: "来源: 局外高维观察者档案 / 权限锁定: CLEARANCE Delta"
    },
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

window.customUserResults = customUserResults;
window.database = database;
