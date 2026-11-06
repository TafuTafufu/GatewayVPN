/**
 * =========================================================
 * 麦凯 (Bradley McKay) 2019款模拟手机组件 (Phone Simulator)
 * 场景：2019年康奈尔大学大二学生手机 (iOS 13 / AT&T Family Plan)
 * =========================================================
 */

// 1. App 数据列表（修复逻辑漏洞：用 Gmail 替代 Life360，规范设置与人设提示）
const mckayApps = [
    { name: '挑食者', icon: '🤮', bg: '#10b981', action: () => openPickyEaterDetail() },
    { name: 'GroupMe', icon: '💬', bg: '#00a8ff', action: () => alert('GroupMe: 罗伯特·沃尔斯：回我电话，我在4Chan上看到好东西了。') },
    { name: 'Snapchat', icon: '👻', bg: '#fffc00', action: () => alert('Snapchat: 罗伯特·沃尔斯: 女性的掌权就是男性的地狱！……老兄，你得明白这是基因和人种层面的退化。我们需要更激进的清洗和改良……') },
    { name: 'Venmo', icon: 'v', bg: '#008cff', action: () => alert('Venmo: 包含宿舍网费 AA 与日常支出交易记录。') },
    { name: 'Gmail', icon: '✉️', bg: '#ea4335', action: () => alert('Gmail: 包含多封来自罗伯特·沃尔斯的未读邮件、 挑食者.exe，及大学系统通知。') },
    { name: 'Canvas', icon: '🎓', bg: '#e11d48', action: () => alert('Canvas: 康奈尔大学 2019 秋季学期课程表（多次缺勤）。') },
    { name: '照片', icon: '🖼️', bg: '#3b82f6', action: () => alert('照片库: 存有校园风景及多张曝光损坏的照片。') },
    { name: 'Spotify', icon: '🎧', bg: '#1ed760', action: () => alert('Spotify: 正在播放Scott Pilgrim vs. the World Ruined a Whole Generation of Women。') },
    { name: 'Instagram', icon: '📷', bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', action: () => alert('Instagram: @braddd_mckay') },
    { name: 'Tinder', icon: '🔥', bg: 'linear-gradient(45deg, #fd297b, #ff655b)', action: () => alert('Tinder: 暂无新的 Match 匹配。') },
    { name: 'AT&T Guard', icon: '🛡️', bg: '#2563eb', action: () => alert('AT&T Secure: 已开启夜间数据流量上限保护。') },
    { name: '设置', icon: '⚙️', bg: '#4b5563', action: () => alert("设置: Bradley's Phone") }
];

// 2. 渲染 2019 年 iPhone (iOS 13 刘海屏) 拟真 UI
function renderMcKayPhoneScreen() {
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    // 获取当前设备真实时间 (格式 HH:MM，不带秒)
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${hours}:${minutes}`;

    // 动态生成 App 4×3 图标网格
    const appGridHTML = mckayApps.map((app, index) => `
        <div class="app-item" onclick="mckayApps[${index}].action()" style="cursor: pointer; text-align: center;">
            <div style="width: 52px; height: 52px; background: ${app.bg}; border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 24px; color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.35);">
                ${app.icon}
            </div>
            <span style="display: block; font-size: 10px; color: #f3f4f6; margin-top: 5px; font-weight: 500; letter-spacing: -0.2px;">${app.name}</span>
        </div>
    `).join('');

    container.innerHTML = `
        <!-- iPhone 11 / iOS 13 经典机身外壳 -->
        <div class="iphone-shell" style="max-width: 360px; margin: 15px auto; background: #000; border: 12px solid #282828; border-radius: 48px; box-shadow: 0 25px 60px rgba(0,0,0,0.85); overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif; position: relative;">
            
            <!-- 2019款 iPhone 顶部刘海 (Notch) & 状态栏 -->
            <div style="padding: 10px 22px 6px; display: flex; justify-content: space-between; align-items: center; color: #fff; font-size: 12px; font-weight: 600; position: relative; z-index: 10;">
                <!-- 左侧：实时系统时间 -->
                <span>${currentTimeStr}</span>

                <!-- 标志性黑色刘海槽 -->
                <div style="width: 120px; height: 18px; background: #000; border-bottom-left-radius: 14px; border-bottom-right-radius: 14px; position: absolute; left: 50%; transform: translateX(-50%); top: 0;"></div>

                <!-- 右侧：信号与电池图标 -->
                <div style="display: flex; align-items: center; gap: 4px; font-size: 11px;">
                    <span>4G</span>
                    <span style="font-size: 13px;">🔋</span>
                </div>
            </div>

            <!-- iOS 13 屏幕区域 -->
            <div style="background: linear-gradient(150deg, #1e293b, #0f172a, #020617); padding: 12px 14px 18px; min-height: 510px; display: flex; flex-direction: column; justify-content: space-between;">
                
                <!-- 顶部 AT&T 家庭套餐系统卡片 (已去除 Bradley's iPhone 字样) -->
                <div style="background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-radius: 14px; padding: 10px 12px; color: #e5e7eb; border: 1px solid rgba(255, 255, 255, 0.1);">
                    <div style="color: #9ca3af; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">AT&T FAMILY PLAN</div>
                </div>

                <!-- App 应用网格 -->
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px 8px; margin-top: 15px;">
                    ${appGridHTML}
                </div>

                <!-- iOS 底部 Dock 栏 -->
                <div style="background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 24px; padding: 10px; margin-top: 20px; display: flex; justify-content: space-around; align-items: center; border: 1px solid rgba(255,255,255,0.12);">
                    <span style="font-size: 22px; cursor: pointer;" onclick="alert('电话: 最近通话包含罗伯特·沃尔斯多次未接来电。')">📞</span>
                    <span style="font-size: 22px; cursor: pointer;" onclick="alert('信息: 包含多条来自母亲的问候短信。')">💬</span>
                    <span style="font-size: 22px; cursor: pointer;" onclick="alert('Safari 提示: 当前网络流量已接入“挑食者 (Picky Eater)”代理。如需查看日志请启动主屏幕应用。')">🌐</span>
                    <span style="font-size: 22px; cursor: pointer;" onclick="alert('音乐: 播放历史记录。')">🎵</span>
                </div>

                <!-- iOS 底部 Home Indicator 悬浮横条 -->
                <div style="width: 120px; height: 4px; background: rgba(255, 255, 255, 0.5); border-radius: 2px; margin: 10px auto 0;"></div>
            </div>
        </div>
    `;
}

// 3. 点击“挑食者”输出原汁原味且无剧透的代理日志
function openPickyEaterDetail() {
    const rawLogs = 
        "🤮【挑食者 (Picky Eater) VPN - 访问历史与数据包日志】\n\n" +
        "• 设备账户：AT&T Mobile Line #408-201-XXXX [家庭共享套餐]\n" +
        "• 缓存起点：2018年08月14日 03:12:09 UTC (无更早日志记录)\n" +
        "[代理网络请求与域名解析记录]：\n" +
        "1. [2018-08-14] GET http://192.168.300.999/gateway/index.php\n" +
        "2. [2018-09-02] CONNECT https://10.256.0.1:8443/auth/handshake\n" +
        "3. [2018-11-19] GET http://non-existent-domain-2018.internal/forum/thread-409\n" +
        "4. [2019-01-05] GET https://avery-bell-slaughter-cache.null/img_09.png\n" +
        "5. [2019-03-22] POST http://172.16.0.404/substructure/tunnel_node";

    if (typeof triggerNotifyModal === 'function') {
        triggerNotifyModal(rawLogs, null, "🤮 Picky Eater [访问历史与抓包记录]");
    } else {
        alert(rawLogs);
    }
}

// 全局挂载导出
window.mckayApps = mckayApps;
window.renderMcKayPhoneScreen = renderMcKayPhoneScreen;
window.openPickyEaterDetail = openPickyEaterDetail;
