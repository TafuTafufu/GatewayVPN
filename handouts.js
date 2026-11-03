/**
 * =========================================================
 * 跑团 Handout 线索展示控制库 (Handouts & Visuals Controller)
 * =========================================================
 */

/**
 * 方式一：打开右侧滑动抽屉并加载 Handout 图文细节
 * @param {Object} data - 包含 title, detailText, image, footer 等字段的对象
 */
function openDrawerWithData(data) {
    const drawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const imgEl = document.getElementById('drawerImage');
    
    // 写入标题与长文描述
    document.getElementById('drawerTitle').innerText = data.title || "CLASSIFIED FILE";
    document.getElementById('drawerContent').innerText = data.detailText || data.snippet || "无额外详情记录。";
    document.getElementById('drawerFooterMeta').innerText = data.footer || "来源: GATEWAY INTERNAL DB";

    // 加载 Handout 图片
    if (data.image) {
        imgEl.src = data.image;
        imgEl.style.display = 'inline-block';
    } else {
        imgEl.style.display = 'none';
        imgEl.src = '';
    }

    // 展开展屏
    overlay.style.display = 'block';
    drawer.classList.add('open');
}

/**
 * 关闭右侧抽屉
 */
function closeDrawer() {
    const drawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('drawerOverlay');
    
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.style.display = 'none';
}

/**
 * 方式二：触发带图片/无图片的集中模态弹窗
 * @param {string} text - 弹窗内文案
 * @param {string} [imageUrl] - 可选的图片 URL 或相对路径
 * @param {string} [title] - 可选的弹窗标题
 */
function triggerNotifyModal(text, imageUrl = null, title = null) {
    const imgEl = document.getElementById('modalImage');
    const titleEl = document.getElementById('modalTitle');
    
    document.getElementById('modalText').innerText = text;
    
    if (title) {
        titleEl.innerText = title;
    } else {
        titleEl.innerText = "⚠️ [系统同步通信提示]";
    }

    // 判断是否加载图片
    if (imageUrl) {
        imgEl.src = imageUrl;
        imgEl.style.display = 'inline-block';
    } else {
        imgEl.style.display = 'none';
        imgEl.src = '';
    }
    
    document.getElementById('notifyModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('notifyModal').style.display = 'none';
}

// 挂载到全局
window.openDrawerWithData = openDrawerWithData;
window.closeDrawer = closeDrawer;
window.triggerNotifyModal = triggerNotifyModal;
window.closeModal = closeModal;
