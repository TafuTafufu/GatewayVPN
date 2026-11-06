/**
 * =========================================================
 * 麦凯 (Bradley McKay) 2019款模拟手机组件 (Phone Simulator)
 * 场景：2019年康奈尔大学大二学生手机 (AT&T Family Plan)
 * =========================================================
 */

function renderMcKayPhoneScreen() {
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    // 渲染 2019 款智能手机硬件外壳与屏幕
    container.innerHTML = `
        <div class="phone-wrapper" style="max-width: 380px; margin: 10px auto; background: #000; border: 12px solid #1c1c1e; border-radius: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.9); overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            
            <!-- 2019款手机顶部的“刘海屏/状态栏” -->
            <div class="phone-header" style="background: #1c1c1e; padding: 10px 20px 5px; display: flex; justify-content: space-between; align-items: center; color: #fff; font-size: 11px;">
                <span>09:41</span>
                <div style="width: 60px; height: 12px; background: #000; border-radius: 6px;"></div>
                <span>4G LTE 🔋 84%</span>
            </div>

            <!-- 手机屏幕主页 wallpaper -->
            <div class="phone-screen" style="background: linear-gradient(130deg, #1f2937, #111827); padding: 15px 12px 25px; min-height: 520px; display: flex; flex-direction: column; justify-content: space-between;">
                
                <!-- 顶部家庭套餐提示微件 -->
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border-radius: 12px; padding: 8px 12px; color: #e5e7eb; font-size: 11px; margin-bottom: 15px; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="color: #9ca3af; font-size: 10px;">AT&T 家庭共享套餐 (Family Plan)</div>
                    <div style="font-weight: bold; margin-top: 2px;">设备: Bradley's iPhone (主控者: 麦凯父母)</div>
                </div>

                <!-- App 应用图标网格 (4列) -->
                <div class="app-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px 8px; text-align: center;">
                    
                    <!-- 1. 核心应用：挑食者 Picky Eater VPN -->
                    <div class="app-item" onclick="openPickyEaterDetail()" style="cursor: pointer;">
                        <div style="width: 52px; height: 52px; background: #10b981; border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 26px; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                            🤮
                        </div>
                        <span style="display: block; font-size: 10px; color: #fff; margin-top: 4px; font-weight: 500;">挑食者</span>
                    </div>

                    <!-- 2. GroupMe (大学姐妹会/社团聊天) -->
                    <div class="app-item" onclick="alert('GroupMe: 姐妹会派对筹备群（已有 14 条未读消息）')" style="cursor: pointer;">
                        <div style="width: 52px; height: 52px; background: #00a8ff; border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 22px; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                            💬
                        </div>
                        <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 4px;">GroupMe</span>
                    </div>

                    <!-- 3. Snapchat (2019大学生最火) -->
                    <div class="app-item" onclick="alert('Snapchat: 接收到来自姐妹会成员的 Snap 照片。')" style="cursor: pointer;">
                        <div style="width: 52px; height: 52px; background: #fffc00; border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 24px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                            👻
                        </div>
                        <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 4px;">Snapchat</span>
                    </div>

                    <!-- 4. Venmo (转账/AA) -->
                    <div class="app-item" onclick="alert('Venmo 账单: 向某同伴转账 $150 (备注: 啤酒与聚会材料)')" style="cursor: pointer;">
                        <div style="width: 52px; height: 52px; background: #008cff; border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 22px; color: #fff; font-weight: bold; font-family: sans-serif; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                            v
                        </div>
                        <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 4px;">Venmo</span>
                    </div>

                    <!-- 5. Life360 (家庭定位) -->
                    <div class="app-item" onclick="alert('Life360 定位服务: 父母已为该设备开启 24 小时实时位置共享。')" style="cursor: pointer;">
                        <div style="width: 52px; height: 52px; background: #8b5cf6; border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 22px; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                            📍
                        </div>
                        <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 4px;">Life360</span>
                    </div>

                    <!-- 6. Canvas (大学课程管理) -->
                    <div class="app-item" onclick="alert('Canvas: 康奈尔大学 2019 秋季学期课程表。考勤异常。')" style="cursor: pointer;">
                        <div style="width: 52px; height: 52px; background: #e11d48; border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 22px; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                            🎓
                        </div>
                        <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 4px;">Canvas</span>
                    </div>

                    <!-- 7. 相册 -->
                    <div class="app-item" onclick="alert('相册: 保存有聚会照片，以及多张拍摄底片呈电磁辐射灼伤痕迹的照片。')" style="cursor: pointer;">
                        <div style="width: 52px; height: 52px; background: #3b82f6; border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 22px; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                            🖼️
                        </div>
                        <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 4px;">照片</span>
                    </div>

                    <!-- 8. Spotify -->
                    <div class="app-item" onclick="alert('Spotify: 正在播放哥特摇滚/电音歌单。')" style="cursor: pointer;">
                        <div style="width: 52px; height: 52px; background: #1ed760; border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 22px; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                            🎧
                        </div>
                        <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 4px;">Spotify</span>
                    </div>

                    <!-- 9. Instagram -->
                    <div class="app-item" style="cursor: pointer;" onclick="alert('Instagram: @braddd_mckay')">
                        <div style="width: 52px; height: 52px; background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 22px; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                            📷
                        </div>
                        <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 4px;">Instagram</span>
                    </div>

                    <!-- 10. Tinder -->
                    <div class="app-item" style="cursor: pointer;" onclick="alert('Tinder: 新的 Matching 消息。')">
                        <div style="width: 52px; height: 52px; background: linear-gradient(45deg, #fd297b, #ff655b); border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 22px; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                            🔥
                        </div>
                        <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 4px;">Tinder</span>
                    </div>

                    <!-- 11. 家长控制 / AT&T 安全 App -->
                    <div class="app-item" style="cursor: pointer;" onclick="alert('AT&T Secure: 父母开启了夜间数据流量上限保护。')">
                        <div style="width: 52px; height: 52px; background: #2563eb; border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 22px; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                            🛡️
                        </div>
                        <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 4px;">AT&T Guard</span>
                    </div>

                    <!-- 12. 设置 -->
                    <div class="app-item" style="opacity: 0.6;">
                        <div style="width: 52px; height: 52px; background: #4b5563; border-radius: 13px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 22px; color: #fff;">
                            ⚙️
                        </div>
                        <span style="display: block; font-size: 10px; color: #9ca3af; margin-top: 4px;">设置</span>
                    </div>
                </div>

                <!-- 底部 Dock 栏 (电话、短信、Safari、音乐) -->
                <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(15px); border-radius: 22px; padding: 8px 12px; margin-top: 25px; display: flex; justify-content: space-around;">
                    <span style="font-size: 20px;" onclick="alert('电话: 最近通话包含父母、兄弟会成员及多次拒接来电。')">📞</span>
                    <span style="font-size: 20px;" onclick="alert('短信: 含有多条母亲发来的提醒催促短信。')">💬</span>
                    <span style="font-size: 20px;" onclick="alert('Safari: 历史记录已被“挑食者 (Picky Eater)”应用全面代理。')">🌐</span>
                    <span style="font-size: 20px;">🎵</span>
                </div>
            </div>
        </div>
    `;
}

// 点击“挑食者 (Picky Eater)” App 后展开原始抓包数据（绝不剧透，让玩家自行推演）
function openPickyEaterDetail() {
    if (typeof triggerNotifyModal === 'function') {
        triggerNotifyModal(
            "【挑食者 (Picky Eater) VPN - 数据隧道抓包日志】\n\n" +
            "• DEVICE_INFO: AT&T Mobile Line #408-201-XXXX [Family Plan]\n" +
            "• CACHE_FIRST_RECORD: 2018-08-14 03:12:09 UTC\n" +
            "• STATUS: NO EARLIER CACHE PRESERVED\n\n" +
            "[CACHED URL / PROXY TELEMETRY DUMP]\n" +
            "1. http://192.168.300.999/gateway/index.php\n" +
            "2. https://10.256.0.1:8443/auth/handshake\n" +
            "3. http://non-existent-domain-2018.internal/forum/thread-409\n" +
            "4. https://avery-bell-slaughter-cache.null/img_09.png\n" +
            "5. http://172.16.0.404/substructure/tunnel_node",
            null,
            "🤮 Picky Eater [Raw Traffic Dump]"
        );
    } else {
        alert("Picky Eater RAW CACHE: 追溯至 2018 年 8 月。无更早数据。");
    }
}

window.renderMcKayPhoneScreen = renderMcKayPhoneScreen;
window.openPickyEaterDetail = openPickyEaterDetail;
