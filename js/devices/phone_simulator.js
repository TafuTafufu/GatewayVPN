window.renderMcKayPhoneScreen = function() {
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    // 清空主容器并注入手机UI
    container.innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; width:100%; min-height:80vh; background:#000;">
            <div style="width: 375px; height: 812px; background: url('image_ef735b.png') no-repeat center/cover, #111; border-radius: 40px; border: 8px solid #333; position: relative; overflow: hidden; box-shadow: 0 0 30px rgba(0,0,0,0.8);">
                
                <!-- 顶栏状态 -->
                <div style="position: absolute; top: 0; width: 100%; padding: 12px 20px; display: flex; justify-content: space-between; color: white; font-size: 12px; font-family: Helvetica, sans-serif; z-index: 10;">
                    <span>AT&T LTE</span>
                    <span>10:29 AM</span>
                    <span>100% 🔋</span>
                </div>

                <!-- 退出/断开按钮 (右上角浮窗) -->
                <button onclick="logout()" style="position: absolute; top: 45px; right: 15px; background: rgba(255, 51, 102, 0.8); color: #fff; border: none; padding: 6px 12px; border-radius: 20px; font-size: 12px; cursor: pointer; z-index: 20; backdrop-filter: blur(4px);">断开镜像</button>

                <!-- App 图标网格区域 -->
                <div style="position: absolute; top: 100px; width: 100%; padding: 20px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: center; color: white; font-family: Helvetica, sans-serif; font-size: 11px;">
                    
                    <!-- 挑食者 (Picky Eater) -->
                    <div style="cursor: pointer;" onclick="document.getElementById('pickyEaterApp').style.display='block'">
                        <div style="width: 60px; height: 60px; background: #222; border-radius: 14px; margin: 0 auto 5px auto; display:flex; justify-content:center; align-items:center; font-size: 32px; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">🤮</div>
                        <span>Picky Eater</span>
                    </div>

                    <!-- 其他占位 App -->
                    <div style="opacity: 0.5;">
                        <div style="width: 60px; height: 60px; background: #34c759; border-radius: 14px; margin: 0 auto 5px auto; display:flex; justify-content:center; align-items:center; font-size: 24px;">💬</div>
                        <span>Messages</span>
                    </div>
                    <div style="opacity: 0.5;">
                        <div style="width: 60px; height: 60px; background: #ff9500; border-radius: 14px; margin: 0 auto 5px auto; display:flex; justify-content:center; align-items:center; font-size: 24px;">⚙️</div>
                        <span>Settings</span>
                    </div>
                    <div style="opacity: 0.5;">
                        <div style="width: 60px; height: 60px; background: #007aff; border-radius: 14px; margin: 0 auto 5px auto; display:flex; justify-content:center; align-items:center; font-size: 24px;">🛡️</div>
                        <span>Life360</span>
                    </div>

                </div>

                <!-- 挑食者 App 内部视窗 (默认隐藏) -->
                <div id="pickyEaterApp" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0a0e14; z-index: 30; padding: 40px 20px; color: #00e5ff; font-family: monospace; overflow-y: auto;">
                    <div style="display:flex; justify-content:space-between; margin-bottom: 20px;">
                        <span style="color: #ff3366; cursor: pointer;" onclick="document.getElementById('pickyEaterApp').style.display='none'">◀ 退出程序</span>
                        <span>[v2.1.0]</span>
                    </div>
                    
                    <h3 style="margin-bottom: 10px; border-bottom: 1px solid #333; padding-bottom: 10px;">⚠️ 发现异常网络缓存 (2018.08)</h3>
                    
                    <div style="background: #121820; padding: 12px; border-radius: 6px; margin: 10px 0; font-size: 12px; line-height: 1.5;">
                        <strong>设备归属：</strong> Bradley McKay<br>
                        <strong>底层路由机制：</strong> 物理子结构代理
                    </div>
                    
                    <p style="font-size: 12px; margin-top: 20px;"><strong>[捕获记录 / 死链接清单]：</strong></p>
                    <ul style="color: #ff5577; line-height: 1.8; padding-left: 20px; font-size: 11px;">
                        <li>192.168.300.999 (ERR: 段值溢出)</li>
                        <li>10.256.0.1 (ERR: 协议越界)</li>
                        <li>http://non-existent-2018.internal (DNS FAIL)</li>
                        <li style="margin-top: 10px;">
                            <a href="#" style="color: #00e5ff; text-decoration: underline;" onclick="alert('档案已被伊萨卡警方本地锁存，无法访问目标图片集。'); return false;">
                                img_09_sorority.png [提取失败]
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    `;
};
