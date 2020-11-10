//関数リテラルは呼び出し元のコードよりも先に記述する
const getWeather = (data) => {
    if (data === null) {
        //<div id = "result">HTMLElementオブジェクトを生成
        const result = document.getElementById('result');
        result.textContent = '天気を取得できませんでした';
    } else {
        // 天気と気温を取得し、配列にする
        const weatherDescription = data.weather[0].description;
        const temp = data.main.temp;
        const maxTemp = data.main.temp_max;
        const minTemp = data.main.temp_min;
        const weatherConditions = [weatherDescription, temp, maxTemp, minTemp];
        const weatherInfo = document.getElementsByClassName('weatherInfo');
        for (let i = 0, len = weatherInfo.length; i < len; i++) {
            const value = document.createTextNode(weatherConditions[i]);
            weatherInfo[i].appendChild(value);
        }
    }
}

// htmlファイルロードとき
document.addEventListener('DOMContentLoaded', () => {
    // <script>タグを生成
    const scr = document.createElement('script');
    const london = 'https://api.openweathermap.org/data/2.5/weather?id=2643743&callback=getWeather&lang=ja&units=metric&appid=4b5774e9f3d2a07b84f0f2f88e486224';
    scr.src = london;
    document.body.appendChild(scr);
}, false);

// セレクトボックスに変化があったとき
document.getElementById('cityId').addEventListener('change', () => {
    //すでに表示されている、weatherInfoオブジェクトのテキストノードの削除
    const text = document.getElementsByClassName('weatherInfo');
    for (let i = 0, len = text.length; i < len; i++) {
        text[i].removeChild(text[i].firstChild);
    }

    //サービスへの問い合わせURLを生成
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?id=';
    const cityId = encodeURIComponent(document.getElementById('cityId').value);
    const callback = "&callback=getWeather&lang=ja&units=metric&appid=4b5774e9f3d2a07b84f0f2f88e486224";
    // <script>タグを生成
    const scr = document.createElement('script');
    scr.src = apiUrl + cityId + callback;
    const lastChild = document.body.lastChild;
    document.body.replaceChild(scr, lastChild);
}, false);
