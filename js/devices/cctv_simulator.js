/**
 * =========================================================
 * 闭路电视 (CCTV) 安防监控模拟控制台组件 (CCTV Simulator)
 * 专用账号: cctv-ithaca-cam01 / 密码: delta2019
 * =========================================================
 */

function renderCctvScreen() {
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    // 获取 database.js 中预设的 cctvTimeline 数据包
    const timelineData = (window.database && window.database.cctv && window.database.cctv.cctvTimeline) 
        ? window.database.cctv.cctvTimeline 
        : [
            { time: "10:12 A.M.", cam: "CAM-01 街角监控", img: "assets/cctv_1012.jpg", desc: "10:12 A.M. 行人稀少。麦凯出现在姐妹会两街区外，手持步枪。" },
            { time: "10:13 A.M.", cam: "CAM-02 十字路口", img: "assets/cctv_1013.jpg", desc: "10:13 A.M. 第二路口。麦凯枪指停下车辆，司机逃离后拨打911。" },
            { time: "10:15 A.M.", cam: "CAM-03 姐妹会正门", img: "assets/cctv_1015.jpg", sanWarning: true, desc: "⚠️ [理智值检定 0/1] 10:15 A.M. 麦凯踢开前门，三名受害者遇害。" },
            { time: "10:16-10:22 A.M.", cam: "CAM-04 屋内走廊", img: "assets/cctv_1016.jpg", desc: "10:16-10:22 A.M. 无声音。麦凯在逐个房间翻箱倒柜胡言乱语后离开。" },
            { time: "10:23 A.M.", cam: "CAM-05 建筑外围", img: "assets/cctv_1023.jpg", desc: "10:23 A.M. 警察抵达现场清查建筑，确认伤亡并请求增援。" },
            { time: "10:29 A.M.", cam: "CAM-06 学生停车场", img: "assets/cctv_1029.jpg", desc: "10:29 A.M. 麦凯在停车场向路人开火未中后逃离。" }
        ];

    // 默认展示第一个节点 (10:12 AM)
    const initialFrame = timelineData[0];

    const cctvHTML = `
        <div class="cctv-container" style="max-width: 800px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
            <!-- 控制台顶部状态栏 -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1f293d; padding-bottom: 8px; margin-bottom: 12px; font-family: var(--font-mono); font-size: 12px; color: var(--accent-color);">
                <span>ITHACA-PD // ANOMALY EVIDENCE VAULT (CAR-5-58-CCTV)</span>
                <span>STATUS: LIVE STREAM MOUNTED</span>
            </div>

            <!-- CCTV 监视器主视窗 (黑白/夜视/CRT 噪点) -->
            <div class="cctv-screen" id="cctvScreen">
                <div class="cctv-hud-top">
                    <span><i class="cctv-rec-dot"></i><span id="cctvCamTag">${initialFrame.cam}</span></span>
                    <span id="cctvTimeTag">${initialFrame.time} (2019-10-14)</span>
                </div>
                <img id="cctvDisplayImage" src="${initialFrame.img}" alt="CCTV Footage Frame" onerror="this.src='https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800'">
            </div>

            <!-- 拖拽/切换时间轴控制栏 -->
            <div style="margin-top: 15px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-dim); font-family: var(--font-mono); margin-bottom: 6px;">
                    <span>◀ 拖动滑块或点击时间轴节点调阅回放</span>
                    <span id="cctvProgressText">节点 1 / ${timelineData.length}</span>
                </div>
                
                <!-- 可拖拽 Range 滑块 -->
                <input type="range" id="cctvScrubber" min="0" max="${timelineData.length - 1}" value="0" step="1" 
                       style="width: 100%; accent-color: var(--accent-color); cursor: pointer; margin-bottom: 12px;"
                       oninput="switchCctvFrame(this.value)">

                <!-- 独立时间节点按钮组 -->
                <div class="cctv-controls" id="cctvControls">
                    ${timelineData.map((frame, idx) => `
                        <button class="cctv-time-btn ${idx === 0 ? 'active' : ''}" onclick="switchCctvFrame(${idx})" id="cctvBtn_${idx}">
                            ${frame.time}
                        </button>
                    `).join('')}
                </div>
            </div>

            <!-- 底部细小警局说明文字 -->
            <div class="cctv-micro-desc" id="cctvDescription">
                ${initialFrame.desc}
            </div>
        </div>
    `;

    container.innerHTML = cctvHTML;
    window.currentCctvTimeline = timelineData;
}

// 切换 CCTV 时间节点与画面噪点闪烁动画
function switchCctvFrame(index) {
    const timeline = window.currentCctvTimeline;
    if (!timeline || !timeline[index]) return;

    const frame = timeline[index];
    const screen = document.getElementById('cctvScreen');
    const img = document.getElementById('cctvDisplayImage');
    const camTag = document.getElementById('cctvCamTag');
    const timeTag = document.getElementById('cctvTimeTag');
    const desc = document.getElementById('cctvDescription');
    const scrubber = document.getElementById('cctvScrubber');
    const progressText = document.getElementById('cctvProgressText');

    if (screen) {
        screen.classList.remove('cctv-noise-flash');
        void screen.offsetWidth; // 强制重绘动画
        screen.classList.add('cctv-noise-flash');
    }

    if (img) img.src = frame.img;
    if (camTag) camTag.innerText = frame.cam;
    if (timeTag) timeTag.innerText = `${frame.time} (2019-10-14)`;
    if (scrubber) scrubber.value = index;
    if (progressText) progressText.innerText = `节点 ${parseInt(index) + 1} / ${timeline.length}`;

    if (desc) {
        if (frame.sanWarning) {
            desc.innerHTML = `<span class="cctv-san-alert">${frame.desc}</span>`;
        } else {
            desc.innerText = frame.desc;
        }
    }

    // 更新按钮高亮状态
    timeline.forEach((_, idx) => {
        const btn = document.getElementById(`cctvBtn_${idx}`);
        if (btn) {
            if (idx == index) btn.classList.add('active');
            else btn.classList.remove('active');
        }
    });
}

window.renderCctvScreen = renderCctvScreen;
window.switchCctvFrame = switchCctvFrame;
