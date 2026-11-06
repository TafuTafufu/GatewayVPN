function getCurrentUserId() {
    return (localStorage.getItem("gateway_logged_user") || "visitor").toLowerCase();
}

function setCurrentUserId(userId) {
    localStorage.setItem("gateway_logged_user", userId.toLowerCase());
}

let searchCount = 0;

function handleAuthKeyPress(e) {
    if (e.key === 'Enter') {
        login();
    }
}

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
                errorMsg.innerText = "❌ 鉴权失败：口令不正确！";
                return;
            }
            currentUser = lowerUser;
        } else {
            errorMsg.style.color = "#ff3366";
            errorMsg.innerText = "❌ 鉴权失败：无法识别的终端身份代号！";
            return;
        }
    }

    setCurrentUserId(currentUser);
    document.getElementById('authOverlay').style.display = 'none';
    
    let pKey = window.accountDb[currentUser] ? window.accountDb[currentUser].profileKey : "guest";
    let profile = window.userProfiles[pKey] || window.userProfiles["guest"];

    window.activeProfile = profile;

    const userTag = document.getElementById('currentUserTag');
    const consoleLogText = document.getElementById('consoleLogText');
    if (userTag) userTag.innerText = `身份: ${profile.name}`;
    if (consoleLogText) consoleLogText.innerText = profile.consoleLog;
    
    routeUserView(currentUser);
}

// 核心改动：根据 viewType 动态路由，彻底消灭 if-else 屎山
function routeUserView(currentUser) {
    const header = document.querySelector('header');
    const searchCard = document.querySelector('.search-card');
    const container = document.getElementById('resultsContainer');
    
    const account = window.accountDb[currentUser];
    const viewType = account ? account.viewType : "terminal";

    if (container) container.innerHTML = '';
    if (header) header.style.display = 'none';
    if (searchCard) searchCard.style.display = 'none';

    switch(viewType) {
        case "cctv":
            if (header) header.style.display = 'flex';
            if (typeof renderCctvScreen === 'function') renderCctvScreen();
            break;
        case "phone":
            if (typeof renderMcKayPhoneScreen === 'function') renderMcKayPhoneScreen();
            break;
        case "server":
            if (typeof renderWallaceServer === 'function') renderWallaceServer();
            break;
        case "terminal":
        default:
            if (header) header.style.display = 'flex';
            if (searchCard) searchCard.style.display = 'block';
            goHome();
            break;
    }
}

function logout() {
    setCurrentUserId("visitor");
    const authOverlay = document.getElementById('authOverlay');
    const errorMsg = document.getElementById('authErrorMsg');
    const searchInput = document.getElementById('searchInput');
    
    if (authOverlay) authOverlay.style.display = 'flex';
    if (searchInput) searchInput.value = '';
    if (errorMsg) {
        errorMsg.style.color = 'var(--text-dim)';
        errorMsg.innerText = '说明：终端将建立高密加密隧道。';
    }
    document.body.className = '';
    searchCount = 0;
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

// 全局导出挂载
window.getCurrentUserId = getCurrentUserId;
window.setCurrentUserId = setCurrentUserId;
window.handleAuthKeyPress = handleAuthKeyPress;
window.login = login;
window.logout = logout;
window.goHome = goHome;
