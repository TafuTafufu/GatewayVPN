/**
 * =========================================================
 * 波士顿/MIT [里世界 & 万物归一] 协议控制库 (Inner World & Threshold)
 * =========================================================
 */

// 预留隐藏解锁代码（如输入 cool_gate 或 mens-et-manus）
const INNER_WORLD_CODES = ["cool_gate", "mens-et-manus", "tawil-al-umr"];

// 1. 初始化里世界状态检查（防止刷新重置）
function checkInnerWorldState() {
    // 默认关闭。当后续启用时，如果 localStorage 里标记了已进入里世界，直接强行覆写 UI
    if (localStorage.getItem("gateway_dimension") === "inner_world") {
        applyInnerWorldUI();
    }
}

// 2. 隐藏代码判断入口
function checkInnerWorldTrigger(keyword) {
    const cleanKey = keyword.trim().toLowerCase();
    
    if (INNER_WORLD_CODES.includes(cleanKey)) {
        // 写入本地永久标记，实现单向不可逆锁定！
        localStorage.setItem("gateway_dimension", "inner_world");
        
        // 触发界面巨变
        applyInnerWorldUI();
        return true;
    }
    return false;
}

// 3. 渲染/翻转为 [里世界 / 理性波士顿 Mesh] UI
function applyInnerWorldUI() {
    console.log("[SYSTEM OVERRIDE] 进入里世界网络...");
    // 改变网页整体视觉滤镜（扭曲/光晕效果）
    document.body.classList.add("inner-world-mode");
    
    // 可以在这里更新顶部状态栏或挂载万物归一终局问答
    const subtitle = document.querySelector(".subtitle");
    if (subtitle) {
        subtitle.innerHTML = "v9.9.99 [RATIONAL BOSTON MESH // 万物归一]";
    }
}

// 预留给 KP 的清除后门（搜索框输入 reset_gateway_sys_999 恢复表世界）
function resetToSurfaceWorld() {
    localStorage.removeItem("gateway_dimension");
    location.reload();
}

window.checkInnerWorldTrigger = checkInnerWorldTrigger;
window.checkInnerWorldState = checkInnerWorldState;
