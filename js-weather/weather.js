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

/**
 * cityIdによりURLを変更する関数を作成
 * @param {integer} cityId 
 */
const createApiUrl = (cityId) => {
    return `
      https://api.openweathermap.org/data/2.5/weather?id=${encodeURIComponent(cityId)}&callback=getWeather&lang=ja&units=metric&appid=4b5774e9f3d2a07b84f0f2f88e486224
    `
  }
// htmlファイルロードとき
document.addEventListener('DOMContentLoaded', () => {
    // <script>タグを生成
    const scriptElement = document.createElement('script');
    scriptElement.src = createApiUrl(2643743);
    document.body.appendChild(scriptElement);
}, false);

// セレクトボックスに変化があったとき
document.getElementById('cityId').addEventListener('change', () => {
    //すでに表示されている、weatherInfoオブジェクトのテキストノードを変更
    const text = document.getElementsByClassName('weatherInfo');
    for (let i = 0, len = text.length; i < len; i++) {
        text[i].textContent = '';
    }

    //サービスへの問い合わせURLを生成
    // <script>タグを生成
    const scriptElement = document.createElement('script');
    scriptElement.src = createApiUrl(document.getElementById('cityId').value);
    const lastChild = document.body.lastChild;
    document.body.replaceChild(scriptElement, lastChild);
}, false);
