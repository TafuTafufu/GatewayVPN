/**
 * =========================================================
 * 玩家登录账号与凭证库 (Players & Authentication Database)
 * =========================================================
 */

// 1. 登录凭证与密码配置 (包含麦凯专用账号与 CCTV 监控专用账号)
const accountDb = {
    // 闭路电视 (CCTV) 专属独立登录凭证
    "cctv-ithaca-cam01": { password: "delta2019", profileKey: "cctv" },

    // 麦凯手机抓包账号
    "mckay": { password: "201808", profileKey: "mckay" },

    // 调查员/玩家专属账号
    "peanut": { password: "Tiefling", profileKey: "peanut" },
    "schnell": { password: "Ithbank", profileKey: "schnell" },
    "player1": { password: "123456", profileKey: "player1" },
    "player2": { password: "123456", profileKey: "player2" },
    "player3": { password: "123456", profileKey: "player3" },
    "player4": { password: "123456", profileKey: "player4" },

    // NPC 节点凭证
    "wallace": { password: "123456", profileKey: "wallace" },
    "cool": { password: "mit2016", profileKey: "cool" },
    "vicki": { password: "kick408", profileKey: "vicki" },
    "guest": { password: "", profileKey: "guest" }
};

// 2. 玩家节点属性与个人界面配置
const userProfiles = {
    // CCTV 监控面板配置
    "cctv": {
        name: "ITHACA-PD CCTV VAULT [伊萨卡警局安防监控中心]",
        welcome: "【警局物证系统建立】成功挂载伊萨卡交通与德尔塔斐伊普西隆姐妹会闭路电视（C-C-T-V）数据流。在下方搜索框输入 cctv 调阅完整监控序列。",
        consoleLog: "[SYSTEM LOG]\nUser: CCTV Archive Node\nAccess Level: RESTRICTED EVIDENCE\nStatus: STREAM READY",
        history: ["10:12 AM 街角监控", "10:15 AM 姐妹会正门破门", "10:29 AM 停车场开火"]
    },

    // 麦凯手机抓包配置
    "mckay": {
        name: "Bradley McKay [麦凯镜像]",
        welcome: "警告：已成功挂载麦凯手机“挑食者 (Picky Eater)”隧道镜像。",
        consoleLog: "[SYSTEM LOG]\nUser: Bradley McKay\nVPN Mode: Picky Eater (🤮)\nStatus: HARDWARE DUMP MOUNTED",
        history: ["192.168.300.999", "艾弗里·贝尔 解剖照片", "挑食者VPN历史数据"]
    },

    // 玩家节点配置
    "peanut": {
        name: "Peanut",
        welcome: "欢迎回来，Peanut。法师之手已就绪，让我们来痛饮伊斯班克吧！",
        consoleLog: "[SYSTEM LOG]\nUser: Peanut\nGateway Protocol: SECURE_TUNNEL\n任务：伊斯班克[1/3]。",
        history: ["Schnell", "如何分辨真假伊斯班克", "空军怎么办"]
    },
    "schnell": {
        name: "Schnell",
        welcome: "松鼠之家十分不欢迎您，这位先生。请您去别的洞。您个子这么高能穿过树洞吧，干扰我们松鼠干什么？",
        consoleLog: "[SYSTEM LOG]\nUser: Schnell\nGateway Protocol: HIGH_PRIORITY\nNote: 绑定账号 Peanut。",
        history: ["Peanut", "打不到松鸡可以用炸鸡骗过去吗", "Jolibee near me", "如何赶走松鼠"]
    },
    "player1": {
        name: "Player 1",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Player 1\nAccess Level: STANDARD\nGateway Status: CONNECTED",
        history: ["终端初始化"]
    },
    "player2": {
        name: "Player 2",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Player 2\nAccess Level: STANDARD\nGateway Status: CONNECTED",
        history: ["终端初始化"]
    },
    "player3": {
        name: "Player 3",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Player 3\nAccess Level: STANDARD\nGateway Status: CONNECTED",
        history: ["终端初始化"]
    },
    "player4": {
        name: "Player 4",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Player 4\nAccess Level: STANDARD\nGateway Status: CONNECTED",
        history: ["终端初始化"]
    },
    "wallace": {
        name: "Robert Wallace",
        welcome: "注意：已接入沃尔斯将军的私有服务器（Proliant dl380）。",
        consoleLog: "[SYSTEM LOG]\nUser: Robert Wallace (General Wallace)\nNode: Frost Pine Trailer Park",
        history: ["ANTIFA 超级战士 威胁评估"]
    },
    "vicki": {
        name: "Vicki King",
        welcome: "高密通道建立。检测到高频电磁辐射环境。",
        consoleLog: "[SYSTEM LOG]\nUser: Vicki King\nAccess Level: RESTRICTED",
        history: ["踢泉镇 住宅查封 通知"]
    },
    "cool": {
        name: "Wesley Cool",
        welcome: "欢迎回来，库尔教授。系统正在对齐物理子结构交互算子...",
        consoleLog: "[SYSTEM LOG]\nUser: Prof. Wesley Cool\nAccess Level: ROOT / ARCHITECT",
        history: ["《无主之谛》 论文出版前言"]
    },
    "guest": {
        name: "GUEST",
        welcome: "本软件通过底层微结构路由协议为您提供无痕访问体验。请输入案宗关键词或人员姓名开始检索。",
        consoleLog: "[SYSTEM LOG]\nUser: Anonymous Guest\nGateway Status: ACTIVE",
        history: ["康奈尔大学 姐妹会枪案"]
    }
};

window.accountDb = accountDb;
window.userProfiles = userProfiles;
