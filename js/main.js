function getCurrentUserId() {
    return (localStorage.getItem("gateway_logged_user") || "").toLowerCase();
}

function setCurrentUserId(userId) {
    localStorage.setItem("gateway_logged_user", userId.toLowerCase());
}

// 实时时间刷新
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

    // 登录成功：隐藏登录遮罩
    setCurrentUserId(currentUser);
    document.getElementById('authOverlay').style.display = 'none';
    document.getElementById('mainContainer').style.display = 'block';

    // A/B 界面切分：麦凯账号展示 2019款模拟手机屏幕
    if (currentUser === "mckay") {
        document.getElementById('currentUserTag').innerText = "DEVICE: BRADLEY'S PHONE (AT&T FAMILY PLAN)";
        if (typeof renderMcKayPhoneScreen === 'function') {
            renderMcKayPhoneScreen(); // 👈 调用 phone_simulator.js 的渲染方法
        }
    } else {
        renderDefaultDashboard(currentUser);
    }
}

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
