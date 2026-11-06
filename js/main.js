function getCurrentUserId() {
    return (localStorage.getItem("gateway_logged_user") || "").toLowerCase();
}

function setCurrentUserId(userId) {
    localStorage.setItem("gateway_logged_user", userId.toLowerCase());
}

// 1. 实时时间刷新
function startRealTimeClock() {
    function updateClock() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const clockEl = document.getElementById('realTimeClock');
        if (clockEl) {
            clockEl.innerText = `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`;
        }
    }
    updateClock();
    setInterval(updateClock, 1000);
}

// 2. 回车连接监听
function handleAuthKeyPress(e) {
    if (e.keyCode === 13 || e.key === 'Enter') {
        login();
    }
}

// 3. 严格登录鉴权逻辑（拒绝瞎输入/拒绝留空）
function login() {
    const userIn = document.getElementById('usernameInput').value.trim();
    const passIn = document.getElementById('passwordInput').value.trim();
    const errorMsg = document.getElementById('authErrorMsg');

    // ❌ 如果完全留空，阻止连接
    if (!userIn) {
        errorMsg.style.color = "#ff3366";
        errorMsg.innerText = `❌ 鉴权失败：请输入终端身份代号！`;
        return;
    }

    const lowerUser = userIn.toLowerCase();
    let currentUser = "";

    // 检查预设数据库 accountDb
    if (window.accountDb && window.accountDb[lowerUser]) {
        if (window.accountDb[lowerUser].password && window.accountDb[lowerUser].password !== passIn) {
            errorMsg.style.color = "#ff3366";
            errorMsg.innerText = `❌ 鉴权失败：口令不正确！`;
            return;
        }
        currentUser = lowerUser;
    } else {
        // ❌ 乱填一律阻止，不自动创建 Guest
        errorMsg.style.color = "#ff3366";
        errorMsg.innerText = `❌ 鉴权失败：无法识别的终端身份代号！`;
        return;
    }

    // 鉴权通过，关闭登录遮罩并记录登录
    setCurrentUserId(currentUser);
    document.getElementById('authOverlay').style.display = 'none';

    // 4. 根据凭证进行 A/B 界面分类切换
    if (currentUser === "mckay") {
        renderPhoneSimulator(); // 麦凯专用：模拟手机镜像
    } else {
        renderDefaultDashboard(currentUser); // 其他账号：标准 VPN 控制台
    }
}

// A 界面：麦凯手机/挑食者 (Picky Eater) 硬件抓包模拟器
function renderPhoneSimulator() {
    document.getElementById('currentUserTag').innerText = `身份: Bradley McKay [麦凯手机镜像]`;
    const container = document.getElementById('resultsContainer');
    container.innerHTML = `
        <div class="result-card anomaly" style="border: 1px solid #00ffcc; background: #0a0e14; padding: 20px; border-radius: 8px;">
            <div class="result-meta" style="color: #00ffcc; font-size: 12px; margin-bottom: 10px;">
                <span>HARDWARE-DUMP: MCKAY_DEVICE</span> | <span>TUNNEL: PICKY EATER (🤮)</span>
            </div>
            <div class="result-title" style="font-size: 18px; color: #fff; font-weight: bold; margin-bottom: 12px;">📱 嫌疑人麦凯 (McKay) 的手机硬件镜像与应用数据</div>
            <div class="result-snippet" style="color: #cbd5e0; line-height: 1.6;">
                <p>调查人员给麦凯手机充好电后，发现手机展现出下一个异常。应用“挑食者 (Picky Eater)”起到了虚拟专用网络 (VPN) 的作用，提供了令人惊讶的安全性，但细究其历史数据发现了奇怪信息：</p>
                
                <div style="background: #121820; padding: 15px; border-radius: 6px; margin: 15px 0; font-family: monospace; font-size: 13px; border-left: 3px solid #00ffcc;">
                    <strong>应用程序：</strong> 挑食者 (Picky Eater) [🤮 v2.1.0]<br>
                    <strong>数据起始时间：</strong> 2018年8月 (没有更早保存的数据)<br>
                    <strong>路由方式：</strong> 伪装成网页聚合器与图像处理器的 VPN 节点
                </div>

                <p style="margin-top: 10px; font-weight: bold; color: #ff5577;">[捕获到的无意义异常 URL 与 IP 记录]：</p>
                <ul style="color: #ff5577; font-family: monospace; line-height: 1.8; margin-left: 20px;">
                    <li>192.168.300.999 <span style="color:#718096;">(IP 格式不正确：数字过多)</span></li>
                    <li>10.256.0.1 <span style="color:#718096;">(IP 格式不正确：数值越界)</span></li>
                    <li>http://non-existent-domain-2018.internal <span style="color:#718096;">(指向不存在的域名)</span></li>
                    <li>https://avery-bell-slaughter-cache.null/img_09.png <span style="color:#718096;">(死链接/姐妹会解剖艾弗里·贝尔照片)</span></li>
                </ul>
            </div>
            <div class="result-footer" style="margin-top: 15px; font-size: 12px; color: #718096;">提示：这些无意义的网址均可追溯至 2018 年 8 月。</div>
        </div>
    `;
}

// B 界面：常规 Gateway VPN 节点控制台
function renderDefaultDashboard(username) {
    let pKey = window.accountDb[username] ? window.accountDb[username].profileKey : username;
    let profile = (window.userProfiles && window.userProfiles[pKey]) || {
        name: username.toUpperCase(),
        welcome: `欢迎，${username}。Gateway VPN 高密加密隧道已建立。`
    };

    document.getElementById('currentUserTag').innerText = `身份: ${profile.name}`;
    const container = document.getElementById('resultsContainer');
    container.innerHTML = `
        <div class="result-card" style="border: 1px solid #2d3748; background: #1a202c; padding: 20px; border-radius: 8px;">
            <div class="result-meta" style="color: #00e5ff; font-size: 12px; margin-bottom: 10px;">GATEWAY-VPN-READY | ENCRYPTED NODE</div>
            <div class="result-title" style="font-size: 18px; color: #fff; font-weight: bold; margin-bottom: 12px;">Gateway VPN 极速隐私网络网关</div>
            <div class="result-snippet" style="color: #cbd5e0;">${profile.welcome}</div>
            <div class="result-footer" style="margin-top: 15px; font-size: 12px; color: #718096;">提示：高密 VPN 节点已就绪。所有查询均通过全域加密节点传输。</div>
        </div>
    `;
}

// 断开连接 / 登出
function logout() {
    setCurrentUserId("");
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordInput').value = '';
    document.getElementById('authOverlay').style.display = 'flex';
    document.getElementById('authErrorMsg').style.color = '#718096';
    document.getElementById('authErrorMsg').innerText = '说明：终端将建立高密加密隧道。';
    document.getElementById('resultsContainer').innerHTML = '';
}

function goHome() {
    const activeUser = getCurrentUserId();
    if (activeUser === "mckay") {
        renderPhoneSimulator();
    } else if (activeUser) {
        renderDefaultDashboard(activeUser);
    }
}

// 自动启动时钟
window.addEventListener('DOMContentLoaded', () => {
    startRealTimeClock();
});

// 全局挂载
window.handleAuthKeyPress = handleAuthKeyPress;
window.login = login;
window.logout = logout;
window.goHome = goHome;
