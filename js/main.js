function getCurrentUserId() {
    return (localStorage.getItem("gateway_logged_user") || "").toLowerCase();
}

function setCurrentUserId(userId) {
    localStorage.setItem("gateway_logged_user", userId.toLowerCase());
}

// 1. 实时时间刷新功能 (完美保留，秒级跟进)
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

function handleAuthKeyPress(e) {
    if (e.keyCode === 13 || e.key === 'Enter') {
        login();
    }
}

// 2. 严格登录校验
function login() {
    const userIn = document.getElementById('usernameInput').value.trim();
    const passIn = document.getElementById('passwordInput').value.trim();
    const errorMsg = document.getElementById('authErrorMsg');

    if (!userIn) {
        errorMsg.innerText = "❌ 请输入终端身份代号";
        return;
    }

    const lowerUser = userIn.toLowerCase();
    let currentUser = "";

    if (window.accountDb && window.accountDb[lowerUser]) {
        if (window.accountDb[lowerUser].password && window.accountDb[lowerUser].password !== passIn) {
            errorMsg.innerText = "❌ 口令错误";
            return;
        }
        currentUser = lowerUser;
    } else {
        errorMsg.innerText = "❌ 无法识别的终端凭证";
        return;
    }

    // 登录成功：隐藏纯黑登录框，打开主视窗
    setCurrentUserId(currentUser);
    document.getElementById('authOverlay').style.display = 'none';
    document.getElementById('mainContainer').style.display = 'block';

    // 根据账号路由到对应界面
    if (currentUser === "mckay") {
        renderPhoneSimulator(); // 麦凯专用：手机抓包镜像
    } else {
        renderDefaultDashboard(currentUser); // 其他常规控制台
    }
}

// 3. 麦凯 (McKay) 手机抓包镜像界面 (完全符合模组原案)
function renderPhoneSimulator() {
    document.getElementById('currentUserTag').innerText = `HARDWARE-DUMP: BRADLEY MCKAY (PHONE)`;
    const container = document.getElementById('resultsContainer');
    container.innerHTML = `
        <div class="result-card anomaly" style="border: 1px solid #00ffcc; background: #0d1117; padding: 20px; border-radius: 8px;">
            <div class="result-meta" style="color: #00ffcc; font-size: 12px; margin-bottom: 10px; font-family: monospace;">
                <span>CACHE: 2018-08 ~ PRESENT</span> | <span>VPN APP: PICKY EATER (🤮)</span>
            </div>
            <div class="result-title" style="font-size: 16px; color: #fff; font-weight: bold; margin-bottom: 12px;">📱 嫌疑人麦凯 (McKay) 手机抓包缓存数据</div>
            <div class="result-snippet" style="color: #cbd5e0; line-height: 1.6; font-size: 13px;">
                <p>调查人员给麦凯手机充好电后，发现其安装的“挑食者 (Picky Eater)”应用程序起到了 VPN 加密隧道的伪装作用。细究其历史数据发现了一系列奇怪的信息：</p>
                
                <div style="background: #161b22; padding: 12px; border-radius: 6px; margin: 15px 0; font-family: monospace; font-size: 12px; border-left: 3px solid #00ffcc;">
                    <strong>捕获到的无意义异常 URL / IP 记录（均为 2018年8月 起的数据）：</strong>
                    <ul style="color: #ff5577; margin: 8px 0 0 18px; line-height: 1.8;">
                        <li>192.168.300.999 <span style="color:#6e7681;">(IP 格式不正确：数字溢出)</span></li>
                        <li>10.256.0.1 <span style="color:#6e7681;">(IP 格式不正确：数值越界)</span></li>
                        <li>http://non-existent-domain-2018.internal <span style="color:#6e7681;">(指向不存在的域名)</span></li>
                        <li>https://avery-bell-slaughter-cache.null/img_09.png <span style="color:#6e7681;">(解剖照片死链接)</span></li>
                    </ul>
                </div>
            </div>
            <div class="result-footer" style="margin-top: 12px; font-size: 11px; color: #6e7681;">数据说明：无更早的历史记录保存。</div>
        </div>
    `;
}

// 4. 普通控制台界面
function renderDefaultDashboard(username) {
    let pKey = window.accountDb[username] ? window.accountDb[username].profileKey : username;
    let profile = (window.userProfiles && window.userProfiles[pKey]) || {
        name: username.toUpperCase(),
        welcome: `已成功与硬件凭证 ${username} 建立通信隧道。`
    };

    document.getElementById('currentUserTag').innerText = `CONNECTED IDENTITY: ${profile.name}`;
    const container = document.getElementById('resultsContainer');
    container.innerHTML = `
        <div class="result-card" style="border: 1px solid #1e293b; background: #12161f; padding: 20px; border-radius: 8px;">
            <div class="result-meta" style="color: #00e5ff; font-size: 11px; margin-bottom: 10px; font-family: monospace;">SECURE NODE READY</div>
            <div class="result-title" style="font-size: 16px; color: #fff; font-weight: bold; margin-bottom: 12px;">终端加密会话</div>
            <div class="result-snippet" style="color: #cbd5e0; font-size: 13px;">${profile.welcome}</div>
        </div>
    `;
}

function logout() {
    setCurrentUserId("");
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordInput').value = '';
    document.getElementById('authErrorMsg').innerText = '';
    document.getElementById('mainContainer').style.display = 'none';
    document.getElementById('authOverlay').style.display = 'flex';
}

window.addEventListener('DOMContentLoaded', () => {
    startRealTimeClock();
});

window.handleAuthKeyPress = handleAuthKeyPress;
window.login = login;
window.logout = logout;
