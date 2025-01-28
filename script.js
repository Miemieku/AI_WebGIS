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
});

document.getElementById("searchButton").addEventListener("click", async function() {
    const query = document.getElementById("searchInput").value;

    // 发送 API 请求给 OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer YOUR_OPENAI_API_KEY` // 替换成你的 API Key
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "system", content: "Gib eine JSON-Liste mit Orten, Koordinaten und Datenwerten zurück." }, { role: "user", content: query }],
            temperature: 0.7
        })
    });

    const data = await response.json();
    const resultText = data.choices[0].message.content;

    // 解析 AI 返回的 JSON 数据
    try {
        const locations = JSON.parse(resultText);

        // 清除旧的标记
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // 在地图上标注结果
        locations.forEach(location => {
            L.marker([location.lat, location.lon]).addTo(map)
                .bindPopup(`<b>${location.name}</b><br>${location.data}`);
        });

        document.getElementById("searchResults").innerText = "Daten auf der Karte aktualisiert.";
    } catch (error) {
        document.getElementById("searchResults").innerText = "Fehler beim Laden der Daten.";
    }
});
