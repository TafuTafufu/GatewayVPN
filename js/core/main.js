// 核心路由入口：根据账号 viewType 动态决定渲染控制台、手机还是常规搜索
function routeUserView(currentUser) {
    const header = document.getElementById('mainHeader') || document.querySelector('header');
    const containerWrapper = document.getElementById('mainContainer') || document.querySelector('.container');
    const searchCard = document.getElementById('searchCard') || document.querySelector('.search-card');
    const resultsContainer = document.getElementById('resultsContainer');
    
    const account = window.accountDb ? window.accountDb[currentUser] : null;
    const viewType = account ? account.viewType : "terminal";

    // 登录成功后，无论渲染什么视图，先把主容器显示出来
    if (containerWrapper) containerWrapper.style.display = 'block';
    
    if (resultsContainer) resultsContainer.innerHTML = '';
    if (header) header.style.display = 'none';
    if (searchCard) searchCard.style.display = 'none';

    switch(viewType) {
        case "cctv":
            if (header) header.style.display = 'flex';
            if (typeof renderCctvScreen === 'function') renderCctvScreen();
            break;
        case "phone":
            // 渲染麦凯手机时，隐藏头部导航和搜索框
            if (typeof renderMcKayPhoneScreen === 'function') {
                renderMcKayPhoneScreen();
            } else {
                console.error("未能找到 renderMcKayPhoneScreen 函数，请检查 phone_mckay.js 是否正确加载。");
            }
            break;
        case "terminal":
        default:
            if (header) header.style.display = 'flex';
            if (searchCard) searchCard.style.display = 'block';
            goHome();
            break;
    }
}
