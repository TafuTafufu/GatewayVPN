/**
 * =========================================================
 * 玩家登录账号与凭证库 (Players & Authentication Database)
 * =========================================================
 * 提示：所有账号名 (key) 请一律使用小写字母。
 */

// 1. 登录凭证与密码配置
const accountDb = {
    // 你的专属账号
    "peanut": { password: "Tiefling", profileKey: "peanut" },
    "schnell": { password: "Ithbank", profileKey: "schnell" },

    // 预设玩家 1 ~ 4 模板 (修改处的密码及 profileKey)
    "player1": { password: "123456", profileKey: "player1" },
    "player2": { password: "123456", profileKey: "player2" },
    "player3": { password: "123456", profileKey: "player3" },
    "player4": { password: "123456", profileKey: "player4" },

    // NPC 与预设账号
    "wallace": { password: "123456", profileKey: "wallace" },
    "cool": { password: "mit2016", profileKey: "cool" },
    "vicki": { password: "kick408", profileKey: "vicki" },
    "guest": { password: "", profileKey: "guest" }
};

// 2. 玩家节点属性与个人界面配置
const userProfiles = {
    // 你的专属节点
    "peanut": {
        name: "Peanut [主控专属节点]",
        welcome: "欢迎回来，Peanut。高密通道已成功建立，算法正在为您自动整理关联线索。",
        consoleLog: "[SYSTEM LOG]\nUser: Peanut\nGateway Protocol: SECURE_TUNNEL\nNote: 关联节点 Schnell 处于连线就绪状态。",
        history: ["Schnell", "Gateway VPN 核心架构", "麻省理工学院 库尔教授"]
    },
    "schnell": {
        name: "Schnell [高级协同节点]",
        welcome: "通道已链接，Schnell。加密签名对齐完毕。",
        consoleLog: "[SYSTEM LOG]\nUser: Schnell\nGateway Protocol: HIGH_PRIORITY\nNote: 绑定账号 Peanut。",
        history: ["Peanut", "工业焊接高频谐振", "极右翼拖车公园监控"]
    },

    // 玩家 1 模板
    "player1": {
        name: "Player 1 [玩家终端 01]",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Player 1\nAccess Level: STANDARD\nGateway Status: CONNECTED",
        history: ["终端初始化", "局域网日志"]
    },

    // 玩家 2 模板
    "player2": {
        name: "Player 2 [玩家终端 02]",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Player 2\nAccess Level: STANDARD\nGateway Status: CONNECTED",
        history: ["终端初始化"]
    },

    // 玩家 3 模板
    "player3": {
        name: "Player 3 [玩家终端 03]",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Player 3\nAccess Level: STANDARD\nGateway Status: CONNECTED",
        history: ["终端初始化"]
    },

    // 玩家 4 模板
    "player4": {
        name: "Player 4 [玩家终端 04]",
        welcome: "欢迎接入 Gateway VPN 终端。加密会话建立成功。",
        consoleLog: "[SYSTEM LOG]\nUser Identity: Player 4\nAccess Level: STANDARD\nGateway Status: CONNECTED",
        history: ["终端初始化"]
    },

    // NPC 节点配置
    "wallace": {
        name: "Robert Wallace [霜橡节点]",
        welcome: "注意：已接入沃尔斯将军的私有服务器（Proliant dl380）。",
        consoleLog: "[SYSTEM LOG]\nUser: Robert Wallace (General Wallace)\nNode: Frost Pine Trailer Park",
        history: ["ANTIFA 超级战士 威胁评估"]
    },
    "guest": {
        name: "GUEST / 访客账号",
        welcome: "本软件通过底层微结构路由协议为您提供无痕访问体验。请输入案宗关键词或人员姓名开始检索。",
        consoleLog: "[SYSTEM LOG]\nUser: Anonymous Guest\nGateway Status: ACTIVE",
        history: ["康奈尔大学 姐妹会枪案"]
    }
};

// 挂载到全局 window 对象供系统调用
window.accountDb = accountDb;
window.userProfiles = userProfiles;
