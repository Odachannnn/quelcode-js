document.addEventListener('DOMContentLoaded', () =>{
    //<div id = "result">オブジェクト
    const result = document.getElementById('result');
    // <script>タグを生成
    const scr = document.createElement('script');
    scr.src = 'https://api.openweathermap.org/data/2.5/weather?id=2643743&callback=test&lang=ja&units=metric&appid=4b5774e9f3d2a07b84f0f2f88e486224';
    document.body.appendChild(scr);
}, false);

document.getElementById('cityId').addEventListener('change', () => {
    //すでに表示されている、<div id="result">の子ノードの削除
    const result = document.getElementById('result');
    const removeChilds = result.querySelectorAll('p');
    for (let i = 0, len = removeChilds.length; i < len; i++) {
        removeChilds[i].parentNode.removeChild(removeChilds[i])
    }

    //サービスへの問い合わせURLを生成
    let url = 'https://api.openweathermap.org/data/2.5/weather?id=' + encodeURIComponent(document.getElementById('cityId').value) + "&callback=test&lang=ja&units=metric&appid=4b5774e9f3d2a07b84f0f2f88e486224";
    // <script>タグを生成
    const scr = document.createElement('script');
    scr.src = url;
    const lastChild = document.body.lastChild;
    document.body.replaceChild(scr, lastChild);
}, false);

const test = (data) => {
    if (data === null) {
        result.textContent = '天気を取得できませんでした';
    } else {
        // 天気, icon, 気温を取得し、配列にする
        const weatherConditions = '空の様子：' + data.weather[0].description;
        const temp = '現在の気温：' + data.main.temp + '度';
        const MaxTemp = '最高気温：' + data.main.temp_max + '度';
        const MinTemp = '最低気温：' + data.main.temp_min + '度';
        const array = [weatherConditions, temp, MaxTemp, MinTemp];
        const len = array.length;
        //タグを生成
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < len; i++) {
            const p = document.createElement('p');
            p.textContent = array[i];
            fragment.appendChild(p);
        }
        result.appendChild(fragment);
    }
}
