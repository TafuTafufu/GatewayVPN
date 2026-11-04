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
    const userInEl = document.getElementById('usernameInput');
    const passInEl = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('authErrorMsg');

    const userIn = userInEl ? userInEl.value.trim() : "";
    const passIn = passInEl ? passInEl.value.trim() : "";

    if (!userIn) {
        if (errorMsg) {
            errorMsg.style.color = "#ff3366";
            errorMsg.innerText = `无法识别的终端身份代号！`;
        }
        return;
    }

    const lowerUser = userIn.toLowerCase();
    let currentUser = "";

    if (window.accountDb && window.accountDb[lowerUser]) {
        if (window.accountDb[lowerUser].password && window.accountDb[lowerUser].password !== passIn) {
            if (errorMsg) {
                errorMsg.style.color = "#ff3366";
                errorMsg.innerText = `口令不正确！`;
            }
            return;
        }
        currentUser = lowerUser;
    } else {
        let localUsers = JSON.parse(localStorage.getItem('gateway_users') || '{}');
        if (localUsers[lowerUser]) {
            if (localUsers[lowerUser].password !== passIn) {
                if (errorMsg) {
                    errorMsg.style.color = "#ff3366";
                    errorMsg.innerText = `口令不正确！`;
                }
                return;
            }
            currentUser = lowerUser;
        } else {
            if (errorMsg) {
                errorMsg.style.color = "#ff3366";
                errorMsg.innerText = `无法识别的终端身份代号！`;
            }
            return;
        }
    }

    setCurrentUserId(currentUser);
    const authOverlay = document.getElementById('authOverlay');
    if (authOverlay) authOverlay.style.display = 'none';
    
    let pKey = window.accountDb && window.accountDb[currentUser] ? window.accountDb[currentUser].profileKey : currentUser;
    
    let profile = (window.userProfiles && window.userProfiles[pKey]) || {
        name: currentUser.toUpperCase(),
        welcome: `欢迎，${currentUser}。已经为您成功建立 Gateway VPN 加密会话。`,
        consoleLog: `[SYSTEM DIAGNOSTIC START]\nUser Identity: ${currentUser}\nGateway Node: ACTIVE PROTOCOL`,
        history: ["Gateway VPN 终端配置", "本地网络包侦听"]
    };

    window.activeProfile = profile;

    const userTag = document.getElementById('currentUserTag');
    if (userTag) userTag.innerText = `身份: ${profile.name}`;
    
    const consoleLogText = document.getElementById('consoleLogText');
    if (consoleLogText) consoleLogText.innerText = profile.consoleLog;
    
    renderWelcomeCard(profile.welcome);
}

function logout() {
    setCurrentUserId("visitor");
    const authOverlay = document.getElementById('authOverlay');
    if (authOverlay) authOverlay.style.display = 'flex';
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    const errorMsg = document.getElementById('authErrorMsg');
    if (errorMsg) {
        errorMsg.style.color = 'var(--text-dim)';
        errorMsg.innerText = '说明：终端将建立高密加密隧道。';
    }
    document.body.className = '';
    searchCount = 0;
}

function renderWelcomeCard(welcomeText) {
    const container = document.getElementById('resultsContainer');
    if (!container) return;
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
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    const input = searchInput.value.trim();
    const lowerInput = input.toLowerCase();
    const container = document.getElementById('resultsContainer');
    if (!input || !container) return;

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

    // 3. 模组彩蛋关键词（精准捕获 dwarf 与其他词条）
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

// 关键重点：解密动画结束后，直接在页面中央渲染内嵌小游戏，不弹抽屉！
function triggerCardAction(encodedData) {
    const data = JSON.parse(decodeURIComponent(encodedData));
    const loader = document.getElementById('loaderOverlay');
    const statusText = document.getElementById('loaderStatusText');

    if (loader && statusText) {
        loader.style.display = 'flex';
        statusText.innerText = `正在建立加密代理隧道，传输数据: ${data.title}...`;

        setTimeout(() => {
            loader.style.display = 'none';
            // 如果是 dwarf 或小游戏页面，直接主区域渲染内嵌小游戏
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
