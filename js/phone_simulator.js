/**
 * =========================================================
 * 麦凯 (Bradley McKay) 2019款模拟手机组件 (Phone Simulator)
 * 场景：2019年康奈尔大学大二学生手机 (AT&T Family Plan)
 * =========================================================
 */

// 1. 定义 App 数据列表（精简集中管理，拒绝剧透）
const mckayApps = [
    { name: '挑食者', icon: '🤮', bg: '#10b981', action: () => openPickyEaterDetail() },
    { name: 'GroupMe', icon: '💬', bg: '#00a8ff', action: () => alert('GroupMe: 姐妹会派对筹备群（已有 14 条未读消息）') },
    { name: 'Snapchat', icon: '👻', bg: '#fffc00', action: () => alert('Snapchat: 接收到来自姐妹会成员的 Snap 照片。') },
    { name: 'Venmo', icon: 'v', bg: '#008cff', action: () => alert('Venmo 账单: 向某同伴转账 $150 (备注: 聚会材料)') },
    { name: 'Life360', icon: '📍', bg: '#8b5cf6', action: () => alert('Life360 定位服务: 父母已为该设备开启 24 小时实时位置共享。') },
    { name: 'Canvas', icon: '🎓', bg: '#e11d48', action: () => alert('Canvas: 康奈尔大学 2019 秋季学期课程表。考勤异常。') },
    { name: '照片', icon: '🖼️', bg: '#3b82f6', action: () => alert('相册: 保存有聚会照片，以及多张拍摄底片呈电磁辐射灼伤痕迹的照片。') },
    { name: 'Spotify', icon: '🎧', bg: '#1ed760', action: () => alert('Spotify: 正在播放哥特摇滚/电音歌单。') },
    { name: 'Instagram', icon: '📷', bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', action: () => alert('Instagram: @braddd_mckay') },
    { name: 'Tinder', icon: '🔥', bg: 'linear-gradient(45deg, #fd297b, #ff655b)', action: () => alert('Tinder: 新的 Matching 消息。') },
    { name: 'AT&T Guard', icon: '🛡️', bg: '#2563eb', action: () => alert('AT&T Secure: 父母开启了夜间数据流量上限保护。') },
    { name: '设置', icon: '⚙️', bg: '#4b5563', action: () => alert('系统设置已锁定。') }
];

// 2. 渲染手机主界面
function renderMcKayPhoneScreen() {
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    // 动态生成 4×3 App 图标网格
    const appGridHTML = mckayApps.map((app, index) => `
        <div class="app-item" onclick="mckayApps[${index}].action()" style="cursor: pointer; text-align: center;">
            <div style="width: 50px; height: 50px; background: ${app.bg}; border-radius: 12px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 22px; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                ${app.icon}
            </div>
            <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 4px;">${app.name}</span>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="phone-wrapper" style="max-width: 360px; margin: 10px auto; background: #000; border: 10px solid #1c1c1e; border-radius: 36px; box-shadow: 0 20px 50px rgba(0,0,0,0.9); overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
            
            <!-- 2019款手机状态栏 -->
            <div style="background: #1c1c1e; padding: 8px 16px 4px; display: flex; justify-content: space-between; align-items: center; color: #fff; font-size: 11px;">
                <span>09:41</span>
                <div style="width: 50px; height: 10px; background: #000; border-radius: 5px;"></div>
                <span>4G LTE 🔋 84%</span>
            </div>

            <!-- 手机屏幕 content -->
            <div style="background: linear-gradient(130deg, #1f2937, #111827); padding: 15px 12px 20px; min-height: 480px; display: flex; flex-direction: column; justify-content: space-between;">
                
                <!-- 顶部家庭套餐微件（符合现实苹果逻辑，无解说剧透） -->
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border-radius: 12px; padding: 8px 12px; color: #e5e7eb; font-size: 11px; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="color: #9ca3af; font-size: 10px;">AT&T Family Plan</div>
                    <div style="font-weight: bold; margin-top: 2px;">Bradley's iPhone</div>
                </div>

                <!-- App 4列网格 -->
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px 6px; margin-top: 15px;">
                    ${appGridHTML}
                </div>

                <!-- 底部 Dock 栏 -->
                <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(15px); border-radius: 20px; padding: 8px; margin-top: 20px; display: flex; justify-content: space-around; cursor: pointer;">
                    <span style="font-size: 20px;" onclick="alert('电话: 最近通话包含父母及多次拒接来电。')">📞</span>
                    <span style="font-size: 20px;" onclick="alert('短信: 含有多条母亲发来的提醒催促短信。')">💬</span>
                    <span style="font-size: 20px;" onclick="alert('Safari: 历史记录已被“挑食者”应用全面代理。')">🌐</span>
                    <span style="font-size: 20px;" onclick="alert('Music: 播放历史记录。')">🎵</span>
                </div>
            </div>
        </div>
    `;
}

// 3. 点击“挑食者”输出原始抓包数据（绝不提前解释或剧透）
function openPickyEaterDetail() {
    const rawLogs = 
        "【挑食者 (Picky Eater) VPN - 数据隧道抓包日志】\n\n" +
        "• DEVICE_INFO: AT&T Mobile Line #408-201-XXXX [Family Plan]\n" +
        "• CACHE_FIRST_RECORD: 2018-08-14 03:12:09 UTC\n" +
        "• STATUS: NO EARLIER CACHE PRESERVED\n\n" +
        "[CACHED URL / PROXY TELEMETRY DUMP]\n" +
        "1. http://192.168.300.999/gateway/index.php\n" +
        "2. https://10.256.0.1:8443/auth/handshake\n" +
        "3. http://non-existent-domain-2018.internal/forum/thread-409\n" +
        "4. https://avery-bell-slaughter-cache.null/img_09.png\n" +
        "5. http://172.16.0.404/substructure/tunnel_node";

    if (typeof triggerNotifyModal === 'function') {
        triggerNotifyModal(rawLogs, null, "🤮 Picky Eater [Raw Traffic Dump]");
    } else {
        alert(rawLogs);
    }
}

// 挂载全局变量
window.mckayApps = mckayApps;
window.renderMcKayPhoneScreen = renderMcKayPhoneScreen;
window.openPickyEaterDetail = openPickyEaterDetail;
