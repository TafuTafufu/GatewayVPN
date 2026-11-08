/**
 * =========================================================
 * 玩家登录账号与凭证库 (Players & Authentication Database)
 * =========================================================
 */

// 1. 登录凭证与视图路由配置 (viewType 用于 main.js 动态解耦分发)
const accountDb = {
    "peanut": { password: "Tiefling", profileKey: "peanut", viewType: "terminal" },
    "schnell": { password: "Ithbank", profileKey: "schnell", viewType: "terminal" },
    "Xanthos": { password: "3rdFloor@99db", profileKey: "Xanthos", viewType: "terminal" },
    "Zeta": { password: "Langley_1947#Virg", profileKey: "Zeta", viewType: "terminal" },
    "Xiphias": { password: "B&G_1917_2017", profileKey: "Xiphias", viewType: "terminal" },
    "Zulu": { password: "N747PL_Cigar&Rum", profileKey: "Zulu", viewType: "terminal" },
    "player1": { password: "123456", profileKey: "player1", viewType: "terminal" },
    "player2": { password: "123456", profileKey: "player2", viewType: "terminal" },
    "player3": { password: "123456", profileKey: "player3", viewType: "terminal" },
    "player4": { password: "123456", profileKey: "player4", viewType: "terminal" },
    "wallace": { password: "123456", profileKey: "wallace", viewType: "server" },
    "cool": { password: "mit2016", profileKey: "cool", viewType: "terminal" },
    "vicki": { password: "kick408", profileKey: "vicki", viewType: "terminal" },
    "mckay": { password: "2018", profileKey: "mckay", viewType: "phone" },
    "cctv-ithaca-cam01": { password: "delta2019", profileKey: "cctv", viewType: "cctv" },
    "guest": { password: "guest", profileKey: "guest", viewType: "terminal" }
};

// 2. 玩家节点属性与个人界面配置
const userProfiles = {
    "peanut": {
        name: "Peanut",
        welcome: "欢迎回来，Peanut。法师之手已就绪，让我们来痛饮伊斯班克吧！。",
        consoleLog: "[SYSTEM LOG]\nUser: Peanut\nGateway Protocol: SECURE_TUNNEL\n任务：伊斯班克[1/3]。",
        history: ["Schnell", "如何分辨真假伊斯班克", "空军怎么办"]
    },
    "schnell": {
        name: "Schnell",
        welcome: "松鼠之家十分不欢迎您，这位先生。请您去别的洞。您个子这么高能穿过树洞吧，干扰我们松鼠干什么？",
        consoleLog: "[SYSTEM LOG]\nUser: Schnell\nGateway Protocol: HIGH_PRIORITY\nNote: 绑定账号 Peanut。",
        history: ["Peanut", "打不到松鸡可以用炸鸡骗过去吗", "Jolibee near me", "如何赶走松鼠"]
    },
    "Xanthos": {
        name: "Xanthos",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Xanthos\nAccess Level: CLASSIFIED\nGateway Status: ACTIVE",
        history: ["终端初始化"]
    },
    "Zeta": {
        name: "Zeta",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Zeta\nAccess Level: CLASSIFIED\nGateway Status: ACTIVE",
        history: ["终端初始化"]
    },
    "Xiphias": {
        name: "Xiphias",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Xiphias\nAccess Level: CLASSIFIED\nGateway Status: ACTIVE",
        history: ["终端初始化"]
    },
    "Zulu": {
        name: "Zulu",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Zulu\nAccess Level: CLASSIFIED\nGateway Status: ACTIVE",
        history: ["终端初始化"]
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
    "cool": {
        name: "Cool",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Cool\nAccess Level: RESEARCH",
        history: ["麻省理工学院"]
    },
    "vicki": {
        name: "Vicki",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Vicki\nAccess Level: STANDARD",
        history: ["终端初始化"]
    },
    "mckay": {
        name: "McKay Phone Mirror",
        welcome: "已挂载麦凯手机镜像日志。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: McKay\nDevice: HARDWARE_MIRROR",
        history: ["挑食者 App 异常 IP"]
    },
    "cctv": {
        name: "CCTV Ithaca Cam-01",
        welcome: "伊萨卡监控节点 01 信号接收中...",
        consoleLog: "[SYSTEM LOG]\nDevice: CCTV-ITHACA-CAM01\nStatus: STREAMING",
        history: ["实时监控数据包"]
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
