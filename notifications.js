/**
 * userNotifications 配置表
 * key: 用户名小写 (如 "peanut", "schnell", "wallace", "guest" 等)
 * value: { 触发次数: "弹窗显示的内容" }
 */
const userNotifications = {
    "peanut": {
        3: "【设备通知】\n收到来自个人通讯录的加密短信：'亲爱的，家里一切都好，你永远是对的。'\n\n(提示：请注意检查您的物理联系。)",
        6: "【硬件温度警告】\n检测到当前设备芯片温度升至 72°C。某些数据抓包可能在后台持续占用算力。"
    },
    "schnell": {
        3: "【系统提示】\n收到来自节点 Peanut 的物理谐振心跳包，算力已自动对齐。",
        5: "【告警】\n底层数据气泡出现小幅度波动。"
    },
    "wallace": {
        2: "【通用告警】\n服务器（Proliant dl380）遭遇高频扫段，防火墙壁垒运行中。"
    },
    // 默认给其他未知用户或访客的配置
    "default": {
        3: "【设备通知】\n收到来自未知节点的路由推送请求。"
    }
};

/**
 * 核心检查与触发函数
 * @param {string} currentUser - 当前登录的用户名
 * @param {number} count - 当前累计搜索次数
 */
function checkTriggerNotifications(currentUser, count) {
    // 优先读取指定用户的配置，如果没有则读取 default 配置
    const userConfig = userNotifications[currentUser] || userNotifications["default"];
    
    if (userConfig && userConfig[count]) {
        if (typeof triggerNotifyModal === 'function') {
            triggerNotifyModal(userConfig[count]);
        }
    }
}

// 挂载到全局
window.userNotifications = userNotifications;
window.checkTriggerNotifications = checkTriggerNotifications;
