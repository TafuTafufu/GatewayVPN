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

// 登录鉴权逻辑
function login() {
    const userIn = document.getElementById('usernameInput').value.trim();
    const passIn = document.getElementById('passwordInput').value.trim();
    const errorMsg = document.getElementById('authErrorMsg');

    if (!userIn) {
        errorMsg.style.color = "#ff3366";
        errorMsg.innerText = `无法识别的终端身份代号！`;
        return;
    }

    const lowerUser = userIn.toLowerCase();
    let currentUser = "";

    if (window.accountDb && window.accountDb[lowerUser]) {
        if (window.accountDb[lowerUser].password && window.accountDb[lowerUser].password !== passIn) {
            errorMsg.style.color = "#ff3366";
            errorMsg.innerText = `口令不正确！`;
            return;
        }
        currentUser = lowerUser;
    } else {
        let localUsers = JSON.parse(localStorage.getItem('gateway_users') || '{}');
        if (localUsers[lowerUser]) {
            if (localUsers[lowerUser].password !== passIn) {
                errorMsg.style.color = "#ff3366";
                errorMsg.innerText = `口令不正确！`;
                return;
            }
            currentUser = lowerUser;
        } else {
            errorMsg.style.color = "#ff3366";
            errorMsg.innerText = `无法识别的终端身份代号！`;
            return;
        }
    }

    setCurrentUserId(currentUser);
    document.getElementById('authOverlay').style.display = 'none';
    
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

    // 1. Google 搜索卡片（原生 <a> 标签跳转，绕过弹窗拦截）
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

    // 3. 模组彩蛋关键词（捕获 tafu 掌局者与 dwarf 矮人小游戏）
    let matchedKeys = [];
    if (lowerInput.includes("tafu") || lowerInput.includes("塔夫") || lowerInput.includes("掌局者")) matchedKeys.push("tafu");
    if (lowerInput.includes("dwarf") || lowerInput.includes("矮人")) matchedKeys.push("dwarf");
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
            <div class="result-title" style="cursor:pointer;" onclick="triggerCardAction('${encodedData}')">${data.title}</div>
            <div class="result-snippet">${data.snippet}</div>
            <div class="result-footer">${data.footer}</div>
        `;
    }
    return card;
}

// 解密动画结束后，直接在页面中央渲染内嵌游戏视窗或提示
function triggerCardAction(encodedData) {
    const data = JSON.parse(decodeURIComponent(encodedData));
    const loader = document.getElementById('loaderOverlay');
    const statusText = document.getElementById('loaderStatusText');

    if (loader && statusText) {
        loader.style.display = 'flex';
        statusText.innerText = `正在建立加密代理隧道，传输数据: ${data.title}...`;

        setTimeout(() => {
            loader.style.display = 'none';
            // 如果是矮人模拟器/小游戏，直接在主界面渲染内嵌视窗！
            if (data.domain && (data.domain.includes('/games/') || data.domain.includes('dwarf_adventure'))) {
                renderGameInMainView(data);
            } else if (typeof window.openDrawerWithData === 'function') {
                window.openDrawerWithData(data);
            } else {
                alert(`想喝伊斯班克？带上梯子和手来见我！`);
            }
        }, 800);
    } else {
        if (data.domain && (data.domain.includes('/games/') || data.domain.includes('dwarf_adventure'))) {
            renderGameInMainView(data);
        } else if (typeof window.openDrawerWithData === 'function') {
            window.openDrawerWithData(data);
        }
    }
}

// 在终端中央直接替换为小游戏仿真控制面板
function renderGameInMainView(data) {
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="result-card anomaly" style="border-color: #00e5ff; background: rgba(0, 229, 255, 0.05); padding: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(0, 229, 255, 0.3); padding-bottom: 8px;">
                <span style="color: #00e5ff; font-weight: bold; font-size: 16px;">🎮 [虚拟终端内嵌程序]: ${data.title}</span>
                <button onclick="goHome()" style="background: #ff3366; color: #fff; border: none; padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">✖ 退出程序 (CLOSE)</button>
            </div>
            <div style="width: 100%; height: 500px; border: 1px solid #00e5ff; border-radius: 6px; overflow: hidden; background: #000; margin-bottom: 10px;">
                <iframe src="games/dwarf_adventure/index.html" style="width: 100%; height: 100%; border: none;"></iframe>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; color: var(--text-dim); font-size: 12px;">
                <span>${data.footer || "SYSTEM // MINI-GAME MODULE"}</span>
                <a href="games/dwarf_adventure/index.html" target="_blank" style="color: #00e5ff; text-decoration: underline;">[在新窗口单独全屏打开]</a>
            </div>
        </div>
    `;
}

function updateStageEffects()
