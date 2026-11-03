/**
 * =========================================================
 * 跑团 Handout 线索展示与交互控制库 (Handouts & Visuals Controller)
 * =========================================================
 */

/**
 * 方式一：打开右侧滑动抽屉 (Side Drawer) 并加载 Handout 图文细节或内嵌小游戏
 * @param {Object|string} inputData - 包含 title, detailText, image, domain, footer 等字段的对象（或 JSON 字符串）
 */
function openDrawerWithData(inputData) {
    let data = inputData;
    
    // 如果传入的是编码后的 JSON 字符串，自动转回对象
    if (typeof inputData === 'string') {
        try {
            data = JSON.parse(decodeURIComponent(inputData));
        } catch (e) {
            data = { title: "CLASSIFIED FILE", detailText: inputData };
        }
    }

    const drawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const imgEl = document.getElementById('drawerImage');
    const contentEl = document.getElementById('drawerContent');
    
    if (!drawer || !overlay || !contentEl) {
        console.warn("未找到侧边抽屉 DOM 容器 (#sideDrawer / #drawerOverlay / #drawerContent)");
        return;
    }

    // 写入标题与页脚元数据
    document.getElementById('drawerTitle').innerText = data.title || "CLASSIFIED FILE // 机密线索";
    
    const footerEl = document.getElementById('drawerFooterMeta');
    if (footerEl) {
        footerEl.innerText = data.footer || "来源: GATEWAY INTERNAL DB";
    }

    // 1. 判断是否为内嵌小游戏 / HTML 独立页面挂载请求
    if (data.domain && (data.domain.includes('/games/') || data.domain.includes('dwarf_adventure'))) {
        // 隐藏静态图片
        if (imgEl) imgEl.style.display = 'none';
        
        // 构建内嵌 iframe 容器，在右侧抽屉直接运行小游戏
        contentEl.innerHTML = `
            <div style="margin-bottom: 12px; font-size: 13px; color: #a0aec0; line-height: 1.6; white-space: pre-line;">
                ${data.detailText || data.snippet || ''}
            </div>
            <div style="width: 100%; height: 320px; border: 1px solid #00e5ff; border-radius: 6px; overflow: hidden; background: #000;">
                <iframe src="games/dwarf_adventure/index.html" style="width: 100%; height: 100%; border: none;"></iframe>
            </div>
        `;
    } 
    // 2. 普通 Handout 线索（富文本/长描述 + 图片）
    else {
        contentEl.innerText = data.detailText || data.snippet || "无额外详情记录。";

        // 加载 Handout 图片
        if (data.image) {
            imgEl.src = data.image;
            imgEl.style.display = 'inline-block';
        } else {
            imgEl.style.display = 'none';
            imgEl.src = '';
        }
    }

    // 展开展屏
    overlay.style.display = 'block';
    drawer.classList.add('open');
}

/**
 * 关闭右侧滑动抽屉
 */
function closeDrawer() {
    const drawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('drawerOverlay');
    
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.style.display = 'none';
}

/**
 * 方式二：触发带图片/无图片的集中模态弹窗 (Modal)
 * @param {string} text - 弹窗内文案
 * @param {string} [imageUrl] - 可选的图片 URL 或相对路径
 * @param {string} [title] - 可选的弹窗标题
 */
function triggerNotifyModal(text, imageUrl = null, title = null) {
    const imgEl = document.getElementById('modalImage');
    const titleEl = document.getElementById('modalTitle');
    const modal = document.getElementById('notifyModal');
    
    if (!modal) return;

    document.getElementById('modalText').innerText = text;
    
    if (titleEl) {
        if (title) {
            titleEl.innerText = title;
        } else {
            titleEl.innerText = "⚠️ [系统同步通信提示]";
        }
    }

    // 判断是否加载图片
    if (imgEl) {
        if (imageUrl) {
            imgEl.src = imageUrl;
            imgEl.style.display = 'inline-block';
        } else {
            imgEl.style.display = 'none';
            imgEl.src = '';
        }
    }
    
    modal.style.display = 'flex';
}

/**
 * 关闭集中模态弹窗
 */
function closeModal() {
    const modal = document.getElementById('notifyModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 挂载到全局 window 对象，保证全项目安全调用
window.openDrawerWithData = openDrawerWithData;
window.closeDrawer = closeDrawer;
window.triggerNotifyModal = triggerNotifyModal;
window.closeModal = closeModal;
