/**
 * =========================================================
 * GATEWAY TERMINAL 主逻辑控制程序
 * =========================================================
 */

let activeUser = null;
let activeProfile = null;
let searchCount = 0;

function getCurrentUserId() { return activeUser; }
function setCurrentUserId(id) { activeUser = id; }

function handleAuthKeyPress(e) {
    if (e.key === 'Enter') login();
}

function handleKeyPress(e) {
    if (e.key === 'Enter') executeSearch();
}

function updateClock() {
    const clockEl = document.getElementById('realTimeClock');
    if (clockEl) {
        const now = new Date();
        const timeStr = now.getFullYear() + '-' +
            String(now.getMonth() + 1).padStart(2, '0') + '-' +
            String(now.getDate()).padStart(2, '0') + ' ' +
            String(now.getHours()).padStart(2, '0') + ':' +
            String(now.getMinutes()).padStart(2, '0') + ':' +
            String(now.getSeconds()).padStart(2, '0');
        clockEl.innerText = '[' + timeStr + ']';
    }
}

function login() {
    const userInput = document.getElementById('usernameInput').value.trim();
    const passInput = document.getElementById('passwordInput').value.trim();
    const errEl = document.getElementById('authErrorMsg');

    if (!userInput) {
        if (errEl) errEl.innerHTML = '<span style="color:var(--accent-danger);">❌ 错误：请输入硬件凭证或终端代号！</span>';
        return;
    }

    const account = window.accountDb ? window.accountDb[userInput.toLowerCase()] : null;

    if (!account || account.password !== passInput) {
        if (errEl) errEl.innerHTML = '<span style="color:var(--accent-danger);">❌ 无法识别的终端凭证或通行密码错误！</span>';
        return;
    }

    activeUser = userInput.toLowerCase();
    activeProfile = (window.userProfiles && window.userProfiles[account.profileKey]) 
        ? window.userProfiles[account.profileKey] 
        : { name: activeUser, welcome: "控制台已连接。" };

    // 隐藏登录遮罩
    document.getElementById('authOverlay').style.display = 'none';
    document.getElementById('currentUserTag').innerText = `身份: ${activeProfile.name}`;

    // 多视图分发 (A/B/C 路由)
    routeUserView();
}

function routeUserView() {
    const header = document.querySelector('header');
    const searchCard = document.querySelector('.search-card');

    // 视图 1：CCTV 安防监控模式 (零搜索框，纯控制台)
    if (activeUser === "cctv-ithaca-cam01") {
        if (header) header.style.display = 'flex';
        if (searchCard) searchCard.style.display = 'none'; // 隐藏搜索框
        if (typeof renderCctvScreen === 'function') renderCctvScreen();
    } 
    // 视图 2：麦凯手机镜像模式
    else if (activeUser === "mckay") {
        if (header) header.style.display = 'none'; // 手机端独立 Header
        if (searchCard) searchCard.style.display = 'none';
        if (typeof renderMcKayPhoneScreen === 'function') renderMcKayPhoneScreen();
    } 
    // 视图 3：标准调查员 Gateway VPN 检索模式
    else {
        if (header) header.style.display = 'flex';
        if (searchCard) searchCard.style.display = 'block';
        goHome();
    }
}

function logout() {
    activeUser = null;
    activeProfile = null;
    searchCount = 0;
    
    document.getElementById('authOverlay').style.display = 'flex';
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordInput').value = '';
    document.getElementById('authErrorMsg').innerText = '说明：终端将建立高密加密隧道。';
    
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) resultsContainer.innerHTML = '';
}

function goHome() {
    if (activeUser === "mckay" || activeUser === "cctv-ithaca-cam01") {
        routeUserView();
        return;
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    const resultsContainer = document.getElementById('resultsContainer');
    if (!resultsContainer || !activeProfile) return;

    resultsContainer.innerHTML = `
        <div class="result-card anomaly">
            <div class="result-meta">SECURE NODE READY</div>
            <div class="result-title" style="cursor:default;">终端加密会话</div>
            <div class="result-snippet">${activeProfile.welcome}</div>
        </div>
    `;
}

function executeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) return;

    searchCount++;
    if (typeof updateStageEffects === 'function') updateStageEffects();
    if (typeof checkTriggerNotifications === 'function') checkTriggerNotifications(activeUser, searchCount);

    const loader = document.getElementById('loaderOverlay');
    if (loader) loader.style.display = 'flex';

    setTimeout(() => {
        if (loader) loader.style.display = 'none';
        renderSearchResults(keyword);
    }, 600);
}

function renderSearchResults(keyword) {
    const container = document.getElementById('resultsContainer');
    if (!container) return;
    container.innerHTML = '';

    // 1. 生成 Google 标准搜索卡片
    const googleCardHTML = `
        <div class="result-card google-style">
            <div class="result-meta">
                <span>https://www.google.com/search?q=${encodeURIComponent(keyword)}</span>
                <span>Google Search</span>
            </div>
            <a class="result-title" href="https://www.google.com/search?q=${encodeURIComponent(keyword)}" target="_blank">
                ${keyword} - Google 搜索结果
            </a>
            <div class="result-snippet">调阅公共互联网索引库。点击在新的加密标签页中查看真实 Google 搜索结果。</div>
            <div class="result-footer">来源: PUBLIC INDEX // SECURE PROXY</div>
        </div>
    `;

    // 2. 匹配 database.js 案宗词条
    let itemData = null;
    if (window.customUserResults && window.customUserResults[activeUser] && window.customUserResults[activeUser][keyword]) {
        itemData = window.customUserResults[activeUser][keyword];
    } else if (window.database && window.database[keyword]) {
        itemData = window.database[keyword];
    }

    if (itemData) {
        const encodedData = encodeURIComponent(JSON.stringify(itemData));
        const anomalyCardHTML = `
            <div class="result-card anomaly">
                <div class="result-meta">
                    <span>${itemData.domain || 'aegis.gateway.internal'}</span>
                    <span>RESTRICTED FILE</span>
                </div>
                <div class="result-title" onclick="triggerCardAction('${encodedData}')">
                    ${itemData.title}
                </div>
                <div class="result-snippet">${itemData.snippet}</div>
                <div class="result-footer">${itemData.footer || '来源: AEGIS DATABASE'}</div>
            </div>
        `;
        container.innerHTML = googleCardHTML + anomalyCardHTML;
    } else {
        container.innerHTML = googleCardHTML;
    }
}

function triggerCardAction(encodedData) {
    try {
        const data = JSON.parse(decodeURIComponent(encodedData));
        if (typeof openDrawerWithData === 'function') {
            openDrawerWithData(data);
        }
    } catch (e) {
        console.error("解析 Card 数据失败", e);
    }
}

function openConsole() {
    const modal = document.getElementById('consoleModal');
    const logText = document.getElementById('consoleLogText');
    if (modal && logText && activeProfile) {
        logText.innerText = activeProfile.consoleLog || "[SYSTEM LOG]\nStatus: ACTIVE";
        modal.style.display = 'flex';
    }
}

function closeConsole() {
    const modal = document.getElementById('consoleModal');
    if (modal) modal.style.display = 'none';
}

function openHistoryModal() {
    const modal = document.getElementById('historyModal');
    const container = document.getElementById('historyContainer');
    if (modal && container && activeProfile) {
        if (activeProfile.history && activeProfile.history.length > 0) {
            container.innerHTML = `<ul class="history-list">${activeProfile.history.map(item => `<li class="history-item">🔍 ${item}</li>`).join('')}</ul>`;
        } else {
            container.innerHTML = '暂无本地检索历史。';
        }
        modal.style.display = 'flex';
    }
}

function clearHistory() {
    if (activeProfile) {
        activeProfile.history = [];
        openHistoryModal();
    }
}

function closeHistoryModal() {
    const modal = document.getElementById('historyModal');
    if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(updateClock, 1000);
    updateClock();
});

window.getCurrentUserId = getCurrentUserId;
window.setCurrentUserId = setCurrentUserId;
window.handleAuthKeyPress = handleAuthKeyPress;
window.handleKeyPress = handleKeyPress;
window.login = login;
window.logout = logout;
window.goHome = goHome;
window.executeSearch = executeSearch;
window.openConsole = openConsole;
window.closeConsole = closeConsole;
window.openHistoryModal = openHistoryModal;
window.clearHistory = clearHistory;
window.closeHistoryModal = closeHistoryModal;
window.triggerCardAction = triggerCardAction;
