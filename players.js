const accountDb = {
    "peanut": { password: "Tiefling", profileKey: "peanut" },
    "schnell": { password: "Ithbank", profileKey: "schnell" },
    "player1": { password: "123456", profileKey: "player1" },
    "player2": { password: "123456", profileKey: "player2" },
    "player3": { password: "123456", profileKey: "player3" },
    "player4": { password: "123456", profileKey: "player4" },
    "wallace": { password: "123456", profileKey: "wallace" },
    "cool": { password: "mit2016", profileKey: "cool" },
    "vicki": { password: "kick408", profileKey: "vicki" },
    "guest": { password: "", profileKey: "guest" }
};

const userProfiles = {
    "peanut": {
        name: "Peanut",
        welcome: "欢迎回来，Peanut。法师之手已为您准备好，让我们来痛饮伊斯班克吧！。",
        consoleLog: "[SYSTEM LOG]\nUser: Peanut\nGateway Protocol: SECURE_TUNNEL\n任务：伊斯班克[1/3]。",
        history: ["Schnell", "Gateway VPN 核心架构", "空军怎么办"]
    },
    "schnell": {
        name: "Schnell",
        welcome: "松鼠之家十分不欢迎您，这位先生。请您去别的洞。您个子这么高能穿过树洞吧，干扰我们松鼠干什么？",
        consoleLog: "[SYSTEM LOG]\nUser: Schnell\nGateway Protocol: HIGH_PRIORITY\nNote: 绑定账号 Peanut。",
        history: ["Peanut", "打不到松鸡可以用炸鸡骗过去吗", "Jolibee near me"]
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
    "guest": {
        name: "GUEST",
        welcome: "本软件通过底层微结构路由协议为您提供无痕访问体验。请输入案宗关键词或人员姓名开始检索。",
        consoleLog: "[SYSTEM LOG]\nUser: Anonymous Guest\nGateway Status: ACTIVE",
        history: ["康奈尔大学 姐妹会枪案"]
    }
};

window.accountDb = accountDb;
window.userProfiles = userProfiles;
