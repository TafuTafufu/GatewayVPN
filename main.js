function getCurrentUserId() {
    return (localStorage.getItem("gateway_logged_user") || "visitor").toLowerCase();
}

function setCurrentUserId(userId) {
    localStorage.setItem("gateway_logged_user", userId.toLowerCase());
}

let searchCount = 0;

function login() {
    const userIn = document.getElementById('usernameInput').value.trim();
    const passIn = document.getElementById('passwordInput').value.trim();
    const errorMsg = document.getElementById('authErrorMsg');

    let currentUser = "guest";

    if (userIn) {
        const lowerUser = userIn.toLowerCase();
        if (window.accountDb[lowerUser]) {
            if (window.accountDb[lowerUser].password && window.accountDb[lowerUser].password !== passIn) {
                errorMsg.style.color = "#ff3366";
                errorMsg.innerText = `❌ 鉴权失败：口令不正确！`;
                return;
            }
            currentUser = lowerUser;
        } else {
            let localUsers = JSON.parse(localStorage.getItem('gateway_users') || '{}');
            if (localUsers[lowerUser]) {
                if (localUsers[lowerUser].password !== passIn) {
                    errorMsg.style.color = "#ff3366";
                    errorMsg.innerText = `❌ 鉴权失败：口令不正确！`;
                    return;
                }
            } else {
                localUsers[lowerUser] = { password: passIn };
                localStorage.setItem('gateway_users', JSON.stringify(localUsers));
            }
            currentUser = lowerUser;
        }
    }

    setCurrentUserId(currentUser);
    document.getElementById('authOverlay').style.display = 'none';
    
    let pKey = window.accountDb[currentUser] ? window.accountDb[currentUser].profileKey : "guest";
    let profile = window.userProfiles[pKey] || {
        name: `${currentUser.toUpperCase()} [自定义网关节点]`,
        welcome: `欢迎，${currentUser}。已经为您成功建立 Gateway VPN 加密会话。`,
        consoleLog: `[SYSTEM DIAGNOSTIC START]\nUser Identity: ${currentUser}\nGateway Node: ACTIVE PROTOCOL\nPower Strain Index: +380%`,
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
    document.getElementById('authErrorMsg').innerText = '说明：终端将建立高密量子隧道。';
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
            <div class="result-footer">提示：全域高密 VPN 节点已就绪。非暗网案宗检索将自动接驳真实 Google 索引。</div>
        </div>
    `;
}

function handleKeyPress(e) {
    if (e.keyCode === 13) executeSearch();
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

    // 记录搜素到本地历史记录
    if (window.activeProfile && window.activeProfile.history) {
        if (!window.activeProfile.history.includes(input)) {
            window.activeProfile.history.unshift(input);
        }
    }

    let matchedCards = [];

    // 1. 优先判定：特定账号下的自定义专属搜索词条（如 Tafu 搜 Schnell）
    if (window.customUserResults[activeUser] && window.customUserResults[activeUser][lowerInput]) {
        matchedCards.push(window.customUserResults[activeUser][lowerInput]);
    }

    // 2. 判定：全局暗网案宗词条
    let matchedKeys = [];
    if (lowerInput.includes("mckay") || lowerInput.includes("麦凯") || lowerInput.includes("康奈尔")) matchedKeys.push("mckay");
    if (lowerInput.includes("cool") || lowerInput.includes("库尔") || lowerInput.includes("mit")) matchedKeys.push("cool");
    if (lowerInput.includes("king") || lowerInput.includes("维姬") || lowerInput.includes("金")) matchedKeys.push("king");
    if (lowerInput.includes("wallace") || lowerInput.includes("罗伯特") || lowerInput.includes("沃尔斯")) matchedKeys.push("wallace");
    if (lowerInput.includes("dabiq") || lowerInput.includes("屠杀") || lowerInput.includes("周五")) matchedKeys.push("dabiq");

    matchedKeys.forEach(key => {
        matchedCards.push(window.database[key]);
    });

    if (matchedCards.length > 0) {
        matchedCards.forEach(item => {
            container.appendChild(createResultCard(item, 'anomaly'));
        });
    } else {
        // 未命中任何暗网词条：生成带直连 Google 跳转的通用索引结果
        const googleResults = generateGoogleMockResults(input);
        googleResults.forEach(item => {
            container.appendChild(createResultCard(item, 'google-style'));
        });
    }

    if (searchCount === 3) {
        triggerNotifyModal("【设备通知】\n收到来自个人通讯录的加密短信：'亲爱的，家里一切都好，你永远是对的。'\n\n(提示：请注意检查您的物理联系。)");
    } else if (searchCount === 6) {
        triggerNotifyModal("【硬件温度警告】\n检测到当前设备芯片温度升至 72°C。某些数据抓包可能在后台持续占用算力。");
    }
}

function generateGoogleMockResults(query) {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    return [
        {
            title: `🌐 [已建立全域 VPN 节点] 在 Google 上搜索: "${query}"`,
            domain: googleSearchUrl,
            snippet: `点击此处可直接打开 Gateway VPN 代理的真实 Google 搜索引擎页面，调取全网关于“${query}”的即时公开资讯与网页数据。`,
            footer: "来源: Google Search Engine / Gateway VPN Direct Tunnel",
            isDirectUrl: true
        },
        {
            title: `${query} - 维基百科，自由的百科全书`,
            domain: `https://zh.wikipedia.org/wiki/${encodeURIComponent(query)}`,
            snippet: `${query}（英文：${query}）通常指相关领域中的核心概念或事件。根据最新的公开学术文献与历史记载，该词条在现代信息学及社会学分析中具有多维度的解释……`,
            footer: "来源: Wikipedia / 开放知识库网关"
        }
    ];
}

function createResultCard(data, styleClass) {
    const card = document.createElement('div');
    card.className = `result-card ${styleClass}`;
    
    const isDirect = data.isDirectUrl;

    card.innerHTML = `
        <div class="result-meta">
            <span>${data.domain}</span>
            <span>${styleClass === 'anomaly' ? 'ENCRYPTED NODE' : 'GOOGLE / PUBLIC WEB'}</span>
        </div>
        <div class="result-title" onclick="openPageTunnel('${data.title}', '${data.domain}', ${isDirect})">${data.title}</div>
        <div class="result-snippet">${data.snippet}</div>
        <div class="result-footer">${data.footer}</div>
    `;
    return card;
}

// 拟真页面解密与跳转效果
function openPageTunnel(title, url, isDirect) {
    const loader = document.getElementById('loaderOverlay');
    const statusText = document.getElementById('loaderStatusText');
    
    loader.style.display = 'flex';
    statusText.innerText = `正在建立高密代理隧道，解密数据流: ${title}...`;

    setTimeout(() => {
        loader.style.display = 'none';
        if (isDirect) {
            window.open(url, '_blank');
        } else {
            alert(`[Aegis Gateway 提示]\n目标节点: ${title}\n状态: 档案已沙盒化保护，无法建立物理长连接。`);
        }
    }, 900);
}

function updateStageEffects() {
    if (searchCount >= 6) document.body.className = 'stage-3';
    else if (searchCount >= 3) document.body.className = 'stage-2';
    else if (searchCount >= 1) document.body.className = 'stage-1';
}

function triggerNotifyModal(text) {
    document.getElementById('modalText').innerText = text;
    document.getElementById('notifyModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('notifyModal').style.display = 'none';
}

function openConsole() {
    document.getElementById('consoleModal').style.display = 'flex';
}

function closeConsole() {
    document.getElementById('consoleModal').style.display = 'none';
}

function openHistoryModal() {
    const historyContainer = document.getElementById('historyContainer');
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

// 清除历史记录功能
function clearHistory() {
    if (window.activeProfile) {
        window.activeProfile.history = [];
        renderHistoryList();
    }
}

function closeHistoryModal() {
    document.getElementById('historyModal').style.display = 'none';
}

window.getCurrentUserId = getCurrentUserId;
window.setCurrentUserId = setCurrentUserId;
window.login = login;
window.logout = logout;
window.executeSearch = executeSearch;
window.openConsole = openConsole;
window.openHistoryModal = openHistoryModal;
window.clearHistory = clearHistory;
window.openPageTunnel = openPageTunnel;
