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

    if (window.activeProfile && window.activeProfile.history) {
        if (!window.activeProfile.history.includes(input)) {
            window.activeProfile.history.unshift(input);
        }
    }

    // 1. 恒定第一个展示 Google 搜索卡片
    const googleCardData = {
        title: `🌐 在 Google 上搜索: "${input}"`,
        domain: `https://www.google.com/search?q=${encodeURIComponent(input)}`,
        snippet: `点击此处通过 Gateway VPN 通道直接打开 Google 搜索，调取全网关于“${input}”的即时公开资讯与网页数据。`,
        footer: "来源: Google Search Engine / Gateway VPN Direct Tunnel",
        isDirectUrl: true
    };
    container.appendChild(createResultCard(googleCardData, 'google-style'));

    // 2. 如果存在当前用户特定互打暗号结果（例如 peanut 搜 schnell）
    if (window.customUserResults[activeUser] && window.customUserResults[activeUser][lowerInput]) {
        const customItem = window.customUserResults[activeUser][lowerInput];
        container.appendChild(createResultCard(customItem, 'anomaly'));
    }

    // 3. 匹配预设的模组彩蛋关键词
    let matchedKeys = [];
    if (lowerInput.includes("mckay") || lowerInput.includes("麦凯") || lowerInput.includes("康奈尔")) matchedKeys.push("mckay");
    if (lowerInput.includes("cool") || lowerInput.includes("库尔") || lowerInput.includes("mit")) matchedKeys.push("cool");
    if (lowerInput.includes("king") || lowerInput.includes("维姬") || lowerInput.includes("金")) matchedKeys.push("king");
    if (lowerInput.includes("wallace") || lowerInput.includes("罗伯特") || lowerInput.includes("沃尔斯")) matchedKeys.push("wallace");
    if (lowerInput.includes("dabiq") || lowerInput.includes("屠杀") || lowerInput.includes("周五")) matchedKeys.push("dabiq");

    matchedKeys.forEach(key => {
        container.appendChild(createResultCard(window.database[key], 'anomaly'));
    });

    // 4. 调用外部独立的弹窗检测机制
    if (typeof checkTriggerNotifications === 'function') {
        checkTriggerNotifications(activeUser, searchCount);
    }
}

function createResultCard(data, styleClass) {
    const card = document.createElement('div');
    card.className = `result-card ${styleClass}`;
    
    const isDirect = data.isDirectUrl;

    card.innerHTML = `
        <div class="result-meta">
            <span>${data.domain}</span>
            <span>${styleClass === 'anomaly' ? 'ENCRYPTED NODE' : 'GOOGLE SEARCH'}</span>
        </div>
        <div class="result-title" onclick="openPageTunnel('${data.title}', '${data.domain}', ${isDirect})">${data.title}</div>
        <div class="result-snippet">${data.snippet}</div>
        <div class="result-footer">${data.footer}</div>
    `;
    return card;
}

function openPageTunnel(title, url, isDirect) {
    const loader = document.getElementById('loaderOverlay');
    const statusText = document.getElementById('loaderStatusText');
    
    let newTab = null;
    if (isDirect) {
        newTab = window.open('about:blank', '_blank');
    }

    loader.style.display = 'flex';
    statusText.innerText = `正在建立加密代理隧道，传输数据: ${title}...`;

    setTimeout(() => {
        loader.style.display = 'none';
        if (isDirect && newTab) {
            newTab.location.href = url;
        } else {
            alert(`[Gateway VPN 提示]\n目标文件: ${title}\n状态: 档案已被本地安全协议锁存，无法访问外部服务器。`);
        }
    }, 800);
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

window.getCurrentUserId = getCurrentUserId;
window.setCurrentUserId = setCurrentUserId;
window.login = login;
window.logout = logout;
window.executeSearch = executeSearch;
window.openConsole = openConsole;
window.openHistoryModal = openHistoryModal;
window.clearHistory = clearHistory;
window.openPageTunnel = openPageTunnel;
window.triggerNotifyModal = triggerNotifyModal;
