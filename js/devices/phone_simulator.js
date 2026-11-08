// 2. 渲染 2019 年 iPhone (iOS 13 刘海屏) 拟真 UI
function renderMcKayPhoneScreen() {
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    // 获取当前设备真实时间 (格式 HH:MM，不带秒)
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // 👇 修复了这里的模板字符串变量拼写，补上了 $ 符号
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
                
                <!-- 顶部 AT&T 家庭套餐系统卡片 -->
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
