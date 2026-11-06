const accountDb = {
    "peanut": { password: "Tiefling", profileKey: "peanut", viewType: "terminal" },
    "schnell": { password: "Ithbank", profileKey: "schnell", viewType: "terminal" },
    "player1": { password: "123456", profileKey: "player1", viewType: "terminal" },
    "player2": { password: "123456", profileKey: "player2", viewType: "terminal" },
    "player3": { password: "123456", profileKey: "player3", viewType: "terminal" },
    "player4": { password: "123456", profileKey: "player4", viewType: "terminal" },
    "wallace": { password: "123456", profileKey: "wallace", viewType: "server" },
    "cool": { password: "mit2016", profileKey: "cool", viewType: "terminal" },
    "vicki": { password: "kick408", profileKey: "vicki", viewType: "terminal" },
    "mckay": { password: "2018", profileKey: "mckay", viewType: "phone" },
    "cctv-ithaca-cam01": { password: "delta2019", profileKey: "cctv", viewType: "cctv" },
    "guest": { password: "", profileKey: "guest", viewType: "terminal" }
};

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
    // 其他玩家的 profile 保持不变...
    "guest": {
        name: "GUEST",
        welcome: "本软件通过底层微结构路由协议为您提供无痕访问体验。请输入案宗关键词或人员姓名开始检索。",
        consoleLog: "[SYSTEM LOG]\nUser: Anonymous Guest\nGateway Status: ACTIVE",
        history: ["康奈尔大学 姐妹会枪案"]
    }
};

window.accountDb = accountDb;
window.userProfiles = userProfiles;
