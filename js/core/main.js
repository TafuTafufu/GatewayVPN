/**
 * =========================================================
 * GATEWAY TERMINAL 核心调度层 (动态路由版)
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

    const lowerUser = userInput.toLowerCase();
    const account = window.accountDb ? window.accountDb[lowerUser] : null;

    if (!account || account.password !== passInput) {
        if (errEl) errEl.innerHTML = '<span style="color:var(--accent-danger);">❌ 无法识别的终端凭证或通行密码错误！</span>';
        return;
    }

    activeUser = lowerUser;
    activeProfile = (window.userProfiles && window.userProfiles[account.profileKey]) 
        ? window.userProfiles[account.profileKey] 
        : { name: activeUser, welcome: "控制台已连接。" };

    // 隐藏登录遮罩，更新状态栏
    document.getElementById('authOverlay').style.display = 'none';
    const userTag = document.getElementById('currentUserTag');
    if (userTag) userTag.innerText = `身份: ${activeProfile.name}`;

    // 启动路由分发
    routeUserView();
}

function routeUserView() {
    const header = document.querySelector('header');
    const searchCard = document.querySelector('.search-card');
    const resultsContainer = document.getElementById('resultsContainer');

    // 动态获取当前账号的 viewType，默认为 terminal
    const account = window.accountDb ? window.accountDb[activeUser] : null;
    const viewType = account && account.viewType ? account.viewType : "terminal";

    // 每次切换视图前，清空主容器，隐藏公共控件
    if (resultsContainer) resultsContainer.innerHTML = '';
    if (header) header.style.display = 'none';
    if (searchCard) searchCard.style.display = 'none';

    switch(viewType) {
        case "cctv":
            if (header) header.style.display = 'flex'; // CCTV 需要顶部栏
            if (typeof renderCctvScreen === 'function') {
                renderCctvScreen();
            } else {
                if (resultsContainer) resultsContainer.innerHTML = '<div style="color:#ff3366; padding:20px;">[CCTV 模块加载失败，请检查 cctv_simulator.js]</div>';
            }
            break;
            
        case "phone":
            // 麦凯手机端：沉浸式 UI，彻底隐藏通用 Header 和 SearchCard
            if (typeof renderMcKayPhoneScreen === 'function') {
                renderMcKayPhoneScreen();
            } else {
                if (resultsContainer) resultsContainer.innerHTML = '<div style="color:#ff3366; padding:20px;">[手机模块加载失败：找不到 renderMcKayPhoneScreen，请检查 phone_mckay.js 内部是否存在语法错误]</div>';
            }
            break;
            
        case "terminal":
        default:
            // 标准调查员界面
            if (header) header.style.display = 'flex';
            if (searchCard) searchCard.style.display = 'block';
            goHome();
            break;
    }
}

function logout() {
    activeUser = null;
    activeProfile = null;
    searchCount = 0;
    
    document.getElementById('authOverlay').style.display = 'flex';
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordInput').value = '';
    
    const errEl = document.getElementById('authErrorMsg');
    if (errEl) errEl.innerText = '说明：终端将建立高密加密隧道。';
    
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) resultsContainer.innerHTML = '';
}

function goHome() {
    // 防止手机或 CCTV 在返回时刷出终端欢迎卡片
    const account = window.accountDb ? window.accountDb[activeUser] : null;
    if (account && (account.viewType === "phone" || account.viewType === "cctv")) {
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

    const googleCardHTML = `
        <div class="result-card google-style">
            <div class="result-meta">
                <span>https://www.google.com/search?q=${encodeURIComponent(keyword)}</span>
                <span>Google Search</span>
            </div>
            <a class="result-title" href="https://www.google.com/search?q=${encodeURIComponent(keyword)}" target="_blank" style="text-decoration:none; color:inherit;">
                ${keyword} - Google 搜索结果
            </a>
            <div class="result-snippet">调阅公共互联网索引库。点击在新标签页中查看真实 Google 搜索结果。</div>
            <div class="result-footer">来源: PUBLIC INDEX // SECURE PROXY</div>
        </div>
    `;

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
                <div class="result-title" style="cursor:pointer;" onclick="triggerCardAction('${encodedData}')">
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
        if (typeof window.openDrawerWithData === 'function') {
            window.openDrawerWithData(data);
        } else {
            alert(`[内部档案锁存]\n\n${data.snippet}`);
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

// 挂载全局，供 HTML 调用
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
