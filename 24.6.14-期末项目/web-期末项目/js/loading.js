// loading.js
function loadoff() {
    const con = document.getElementById('con');
    if (con) {
        con.style.display = "none";
    }
}

function loadon() {
    const con = document.getElementById('con');
    if (con) {
        con.style.display = "flex";
    }
}

window.addEventListener('load', function () {
    setTimeout(loadoff, 1000); // 修改这里的值以调整初始加载动画显示时间，单位为毫秒（ms）
});
