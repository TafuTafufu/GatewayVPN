function getCurrentUserId() {
    return (localStorage.getItem("gateway_logged_user") || "visitor").toLowerCase();
}

function setCurrentUserId(userId) {
    localStorage.setItem("gateway_logged_user", userId.toLowerCase());
}

let searchCount = 0;

// 1. 实时时间刷新功能
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

// 支持登录弹窗按下 Enter 回车键连接
function handleAuthKeyPress(e) {
    if (e.keyCode === 13 || e.key === 'Enter') {
        login();
    }
}

// 严谨登录鉴权与路由分发逻辑
function login() {
    const userIn = document.getElementById('usernameInput').value.trim();
    const passIn = document.getElementById('passwordInput').value.trim();
    const errorMsg = document.getElementById('authErrorMsg');

    // 1. 禁用留空登录：如果不填用户名，直接阻止并提示
    if (!userIn) {
        errorMsg.style.color = "#ff3366";
        errorMsg.innerText = `无法识别的终端身份代号！`;
        return;
    }

    const lowerUser = userIn.toLowerCase();
    let currentUser = "";

    // 2. 检查预设数据库 accountDb
    if (window.accountDb && window.accountDb[lowerUser]) {
        if (window.accountDb[lowerUser].password && window.accountDb[lowerUser].password !== passIn) {
            errorMsg.style.color = "#ff3366";
            errorMsg.innerText = `口令不正确！`;
            return; // 密码错误，阻止进入
        }
        currentUser = lowerUser;
    } else {
        // 3. 检查本地存储用户
        let localUsers = JSON.parse(localStorage.getItem('gateway_users') || '{}');
        if (localUsers[lowerUser]) {
            if (localUsers[lowerUser].password !== passIn) {
                errorMsg.style.color = "#ff3366";
                errorMsg.innerText = `口令不正确！`;
                return; // 密码错误，阻止进入
            }
            currentUser = lowerUser;
        } else {
            // ❌ 不是已注册/预设账号，禁止进入！
            errorMsg.style.color = "#ff3366";
            errorMsg.innerText = `无法识别的终端身份代号！`;
            return; // 阻止进入
        }
    }

    // 鉴权通过，保存登录状态
    setCurrentUserId(currentUser);
    document.getElementById('authOverlay').style.display = 'none';
    
    // 4. 路由切分：判断是否登录麦凯的模拟手机
    if (currentUser === "mckay") {
        renderPhoneSimulator();
        return;
    }

    // 常规 Gateway VPN 界面初始化
    let pKey = window.accountDb && window.accountDb[currentUser] ? window.accountDb[currentUser].profileKey : currentUser;
    
    let profile = (window.userProfiles && window.userProfiles[pKey]) || {
        name: currentUser.toUpperCase(),
        welcome: `欢迎，${currentUser}。已经为您成功建立 Gateway VPN 加密会话。`,
        consoleLog: `[SYSTEM DIAGNOSTIC START]\nUser Identity: ${currentUser}\nGateway Node: ACTIVE PROTOCOL`,
        history: ["Gateway VPN 终端配置", "本地网络包侦听"]
    };

    window.activeProfile = profile;

    document.getElementById('currentUserTag').innerText = `身份: ${profile.name}`;
    document.getElementById('consoleLogText').innerText = profile.consoleLog;
    
    renderWelcomeCard(profile.welcome);
}

// 渲染麦凯手机/挑食者 (Picky Eater) 模拟器界面
function renderPhoneSimulator() {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = `
        <div class="result-card anomaly" style="border-color: #00ffcc; background: #0a0e14;">
            <div class="result-meta">
                <span>HARDWARE-DUMP: MCKAY_DEVICE</span>
                <span>STATUS: MOUNTED VIA PICKY EATER</span>
            </div>
            <div class="result-title">📱 嫌疑人麦凯 (McKay) 的手机硬件镜像抓包</div>
            <div class="result-snippet">
                <p>已通过“挑食者 (Picky Eater)”虚拟专用网络隧道成功挂载该设备缓存镜像。</p>
                <div style="background: #121820; padding: 12px; border-radius: 6px; margin: 10px 0; font-family: monospace; font-size: 13px;">
                    <strong>应用名称：</strong> 挑食者 (Picky Eater) [🤮 v2.1.0]<br>
                    <strong>首批历史数据时间戳：</strong> 2018年8月14日 (早期记录已丢失)<br>
                    <strong>底层路由机制：</strong> 自定义物理子结构代理
                </div>
                <p><strong>[异常缓存 URL / IP 捕获记录]：</strong></p>
                <ul style="color: #ff5577; font-family: monospace; line-height: 1.6; margin-left: 20px;">
                    <li>192.168.300.999 (格式错误：数字溢出)</li>
                    <li>10.256.0.1 (格式错误：段值越界)[cite: 1]</li>
                    <li>http://non-existent-domain-2018.internal (域名不存在)[cite: 1]</li>
                    <li>https://avery-bell-slaughter-cache.null/img_09.png (死链接)[cite: 1, 4]</li>
                </ul>
            </div>
            <div class="result-footer">提示：本数据为 2018 年 8 月以来的物理缓存dump。</div>
        </div>
    `;
}

function logout() {
    setCurrentUserId("visitor");
    document.getElementById('authOverlay').style.display = 'flex';
    document.getElementById('searchInput').value = '';
    document.getElementById('authErrorMsg').style.color = 'var(--text-dim)';
    document.getElementById('authErrorMsg').innerText = '说明：终端将建立高密加密隧道。';
    document.body.className = '';
    searchCount = 0;
}

function renderWelcomeCard(welcomeText) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = `
        <div class="result-card">
            <div class="result-meta">
                <span>GATEWAY-VPN-READY</span>
                <span>NODE #${Math.floor(Math.random()*900 + 100)}</span>
            </div>
            <div class="result-title">Gateway VPN 极速隐私网络网关</div>
            <div class="result-snippet">${welcomeText}</div>
            <div class="result-footer">提示：高密 VPN 节点已就绪。所有查询均通过全域节点传输。</div>
        </div>
    `;
}

function handleKeyPress(e) {
    if (e.keyCode === 13 || e.key === 'Enter') executeSearch();
}

function executeSearch() {
    const input = document.getElementById('searchInput').value.trim();
    const lowerInput = input.toLowerCase();
    const container = document.getElementById('resultsContainer');
    if (!input) return;

    searchCount++;
    updateStageEffects();
    container.innerHTML = '';

    const activeUser = getCurrentUserId();

    if (window.activeProfile && window.activeProfile.history) {
        if (!window.activeProfile.history.includes(input)) {
            window.activeProfile.history.unshift(input);
        }
    }

    // 1. Google 搜索卡片
    const googleCardData = {
        title: `🌐 在 Google 上搜索: "${input}"`,
        domain: `https://www.google.com/search?q=${encodeURIComponent(input)}`,
        snippet: `点击此处通过 Gateway VPN 通道在 Google 搜索引擎中获取全网关于“${input}”的最新搜索结果。`,
        footer: "来源: Google Search Engine / Direct Tunnel",
        isDirectUrl: true
    };
    container.appendChild(createResultCard(googleCardData, 'google-style'));

    // 2. 专属暗号词
    if (window.customUserResults && window.customUserResults[activeUser] && window.customUserResults[activeUser][lowerInput]) {
        const customItem = window.customUserResults[activeUser][lowerInput];
        container.appendChild(createResultCard(customItem, 'anomaly'));
    }

    // 3. 模组彩蛋关键词（包含 tafu 掌局者支持）
    let matchedKeys = [];
    if (lowerInput.includes("tafu") || lowerInput.includes("塔夫") || lowerInput.includes("掌局者")) matchedKeys.push("tafu");
    if (lowerInput.includes("mckay") || lowerInput.includes("麦凯") || lowerInput.includes("康奈尔")) matchedKeys.push("mckay");
    if (lowerInput.includes("cool") || lowerInput.includes("库尔") || lowerInput.includes("mit")) matchedKeys.push("cool");
    if (lowerInput.includes("king") || lowerInput.includes("维姬") || lowerInput.includes("金")) matchedKeys.push("king");
    if (lowerInput.includes("wallace") || lowerInput.includes("罗伯特") || lowerInput.includes("沃尔斯")) matchedKeys.push("wallace");
    if (lowerInput.includes("dabiq") || lowerInput.includes("屠杀") || lowerInput.includes("周五")) matchedKeys.push("dabiq");

    matchedKeys.forEach(key => {
        if (window.database && window.database[key]) {
            container.appendChild(createResultCard(window.database[key], 'anomaly'));
        }
    });

    // 4. 调用外部 notifications.js 弹窗逻辑
    if (typeof checkTriggerNotifications === 'function') {
        checkTriggerNotifications(activeUser, searchCount);
    }
}

function createResultCard(data, styleClass) {
    const card = document.createElement('div');
    card.className = `result-card ${styleClass}`;
    
    const isDirect = data.isDirectUrl;

    if (isDirect) {
        card.innerHTML = `
            <div class="result-meta">
                <span>${data.domain}</span>
                <span>GOOGLE SEARCH</span>
            </div>
            <a class="result-title" href="${data.domain}" target="_blank" style="text-decoration: none; color: inherit;">${data.title}</a>
            <div class="result-snippet">${data.snippet}</div>
            <div class="result-footer">${data.footer}</div>
        `;
    } else {
        const encodedData = encodeURIComponent(JSON.stringify(data));
        card.innerHTML = `
            <div class="result-meta">
                <span>${data.domain}</span>
                <span>ENCRYPTED NODE</span>
            </div>
            <div class="result-title" onclick="triggerCardAction('${encodedData}')">${data.title}</div>
            <div class="result-snippet">${data.snippet}</div>
            <div class="result-footer">${data.footer}</div>
        `;
    }
    return card;
}

// 点击线索卡片，经过 0.8 秒解密动画后拉出右侧 Handout 抽屉
function triggerCardAction(encodedData) {
    const data = JSON.parse(decodeURIComponent(encodedData));
    const loader = document.getElementById('loaderOverlay');
    const statusText = document.getElementById('loaderStatusText');

    if (loader && statusText) {
        loader.style.display = 'flex';
        statusText.innerText = `正在建立加密代理隧道，传输数据: ${data.title}...`;

        setTimeout(() => {
            loader.style.display = 'none';
            if (typeof openDrawerWithData === 'function') {
                openDrawerWithData(data);
            } else {
                alert(`想喝伊斯班克？带上梯子和手来见我！`);
            }
        }, 800);
    } else {
        if (typeof openDrawerWithData === 'function') {
            openDrawerWithData(data);
        }
    }
}

function updateStageEffects() {
    if (searchCount >= 6) document.body.className = 'stage-3';
    else if (searchCount >= 3) document.body.className = 'stage-2';
    else if (searchCount >= 1) document.body.className = 'stage-1';
}

function openConsole() {
    document.getElementById('consoleModal').style.display = 'flex';
}

function closeConsole() {
    document.getElementById('consoleModal').style.display = 'none';
}

function openHistoryModal() {
    renderHistoryList();
    document.getElementById('historyModal').style.display = 'flex';
}

function renderHistoryList() {
    const historyContainer = document.getElementById('historyContainer');
    if (window.activeProfile && window.activeProfile.history && window.activeProfile.history.length > 0) {
        let html = '<ul class="history-list">';
        window.activeProfile.history.forEach(item => {
            html += `<li class="history-item">🔍 ${item}</li>`;
        });
        html += '</ul>';
        historyContainer.innerHTML = html;
    } else {
        historyContainer.innerHTML = '暂无本地检索历史。';
    }
}

function clearHistory() {
    if (window.activeProfile) {
        window.activeProfile.history = [];
        renderHistoryList();
    }
}

function closeHistoryModal() {
    document.getElementById('historyModal').style.display = 'none';
}

function goHome() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    if (window.activeProfile) {
        renderWelcomeCard(window.activeProfile.welcome);
    } else {
        renderWelcomeCard("欢迎访问 Gateway VPN 极速隐私网络网关。");
    }
}

// 绑定 DOMContentLoaded 自动启动时钟
window.addEventListener('DOMContentLoaded', () => {
    startRealTimeClock();
});

// 全局挂载导出
window.getCurrentUserId = getCurrentUserId;
window.setCurrentUserId = setCurrentUserId;
window.handleAuthKeyPress = handleAuthKeyPress;
window.login = login;
window.logout = logout;
window.executeSearch = executeSearch;
window.openConsole = openConsole;
window.closeConsole = closeConsole;
window.openHistoryModal = openHistoryModal;
window.closeHistoryModal = closeHistoryModal;
window.clearHistory = clearHistory;
window.triggerCardAction = triggerCardAction;
window.goHome = goHome;
