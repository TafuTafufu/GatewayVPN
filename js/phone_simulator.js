/**
 * =========================================================
 * 麦凯 (Bradley McKay) 2019款模拟手机组件 (Phone Simulator)
 * =========================================================
 */

function renderMcKayPhoneScreen() {
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    // 渲染 2019 款智能手机硬件外壳与屏幕
    container.innerHTML = `
        <div class="phone-wrapper" style="max-width: 380px; margin: 20px auto; background: #000; border: 12px solid #1c1c1e; border-radius: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.9); overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            
            <!-- 2019款手机顶部的“刘海屏/状态栏” -->
            <div class="phone-header" style="background: #1c1c1e; padding: 10px 20px 5px; display: flex; justify-content: space-between; align-items: center; color: #fff; font-size: 11px;">
                <span>09:41</span>
                <div style="width: 60px; height: 12px; background: #000; border-radius: 6px;"></div>
                <span>5G 🔋 84%</span>
            </div>

            <!-- 手机屏幕主页 wallpaper -->
            <div class="phone-screen" style="background: linear-gradient(130deg, #1f2937, #111827); padding: 20px 15px 30px; min-height: 480px; display: flex; flex-direction: column; justify-content: space-between;">
                
                <!-- 顶部家庭套餐提示微件 -->
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border-radius: 12px; padding: 10px 12px; color: #e5e7eb; font-size: 11px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="color: #9ca3af; font-size: 10px;">AT&T 家庭共享套餐 (Family Plan)</div>
                    <div style="font-weight: bold; margin-top: 2px;">设备: Bradley's iPhone (主控者: 麦凯父母)</div>
                </div>

                <!-- App 应用图标网格 (4列) -->
                <div class="app-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px 10px; text-align: center;">
                    
                    <!--  핵심应用：挑食者 Picky Eater VPN -->
                    <div class="app-item" onclick="openPickyEaterDetail()" style="cursor: pointer;">
                        <div style="width: 54px; height: 54px; background: #10b981; border-radius: 14px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 28px; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                            🤮
                        </div>
                        <span style="display: block; font-size: 10px; color: #fff; margin-top: 5px; font-weight: 500;">挑食者</span>
                    </div>

                    <!-- 其他 2019 款家庭手机常用 App -->
                    <div class="app-item" onclick="alert('Life360 定位服务: 父母已为该设备开启实时位置共享。')" style="cursor: pointer;">
                        <div style="width: 54px; height: 54px; background: #8b5cf6; border-radius: 14px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 24px; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                            📍
                        </div>
                        <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 5px;">Life360</span>
                    </div>

                    <div class="app-item" onclick="alert('相册: 保存有康奈尔大学姐妹会聚会照片，以及被灼伤的底片扫码。')" style="cursor: pointer;">
                        <div style="width: 54px; height: 54px; background: #3b82f6; border-radius: 14px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 24px; color: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                            🖼️
                        </div>
                        <span style="display: block; font-size: 10px; color: #d1d5db; margin-top: 5px;">照片</span>
                    </div>

                    <div class="app-item" style="opacity: 0.6;">
                        <div style="width: 54px; height: 54px; background: #6b7280; border-radius: 14px; margin: 0 auto; display: flex; justify-content: center; align-items: center; font-size: 24px; color: #fff;">
                            ⚙️
                        </div>
                        <span style="display: block; font-size: 10px; color: #9ca3af; margin-top: 5px;">设置</span>
                    </div>
                </div>

                <!-- 底部 Dock 栏 -->
                <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(15px); border-radius: 24px; padding: 10px 15px; margin-top: 40px; display: flex; justify-content: space-around;">
                    <span style="font-size: 22px;">📞</span>
                    <span style="font-size: 22px;">💬</span>
                    <span style="font-size: 22px;">🌐</span>
                    <span style="font-size: 22px;">🎵</span>
                </div>
            </div>
        </div>
    `;
}

// 点击“挑食者 (Picky Eater)” App 后展开弹窗
function openPickyEaterDetail() {
    if (typeof triggerNotifyModal === 'function') {
        triggerNotifyModal(
            "【挑食者 (Picky Eater) VPN - 数据抓包摘要】\n\n" +
            "• 硬件信息：通过家庭套餐购买的 Smart Phone\n" +
            "• 缓存数据起点：2018 年 8 月 (更早数据已缺失)\n\n" +
            "[抓包发现的异常 URL / IP 记录]：\n" +
            "1. 192.168.300.999 (格式错误：段值溢出)\n" +
            "2. 10.256.0.1 (格式错误：数值越界)\n" +
            "3. http://non-existent-domain-2018.internal (不存在的死域名)\n" +
            "4. https://avery-bell-slaughter-cache.null/img_09.png (死链接)",
            null,
            "🤮 Picky Eater VPN [抓包日志]"
        );
    } else {
        alert("挑食者 (Picky Eater) 历史缓存：捕获到数字溢出的非法 IP 地址及不存在的死链接（数据追溯至2018年8月）。");
    }
}

window.renderMcKayPhoneScreen = renderMcKayPhoneScreen;
window.openPickyEaterDetail = openPickyEaterDetail;
