// 1️⃣ 创建一个全局变量 `map`
var map;

document.addEventListener("DOMContentLoaded", function() {
    // 1️⃣ 初始化地图
    map = L.map('map', {
        center: [51.1657, 10.4515],
        zoom: 6,
        zoomControl: false // 禁用默认控件
    });

    // 2️⃣ 添加放大缩小控件
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // 3️⃣ 加载地图瓦片（OpenStreetMap）
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);


