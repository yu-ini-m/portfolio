var API_KEY_WEATHER = '27f9308c3ae25ef41fd47bf52b154777';



function callWeatherAPI(lat, lon, callback) {
  $.ajax({
    type: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + API_KEY_WEATHER,
    dataType: 'json',
    success: function (data, status, xhr) {
      callback({
        city: data.name,
        weather: data.weather[0].main,
        temperature: data.main.temp - 273.15,
        humidity: data.main.humidity,
        pressure: data.main.pressure
      });
    },
    error: function (xhr, status, error) {
      callback(null);
    }
  });
}



window.onload = function findWeather() {



  //yonakuni
  callWeatherAPI(24.46, 122.99, displayWeather);

  //iriomote
  callWeatherAPI(24.17, 123.51, displayWeather2);

  //ishigaki
  callWeatherAPI(24.4, 124.18, displayWeather3);



}


function displayWeather(result) {
  var weather = document.getElementById('weather');
  var temperature = document.getElementById('temperature');
  var humidity = document.getElementById('humidity');
  var pressure = document.getElementById('pressure');


  if (result.weather == "Rain") {
  
    document.getElementById('message').innerHTML =
      "外出の際はお足もとにお気を付けください。<br>また、欠航等の情報にもご注意ください。";
  } else if (result.weather == "Clear") {
    if (result.temperature < 30) {
      document.getElementById('message').innerHTML = "観光日和ですね！<br>船のご利用にも最適です！";
    } else {
      document.getElementById('message').innerHTML = "熱中症にご注意ください。<br>室内アクティビティがオススメです！";
    }
  } else {
    document.getElementById('message').innerHTML = "<br>室内アクティビティがオススメです！";
  }


  weather.textContent = result.weather;
  temperature.textContent = result.temperature.toFixed(2) + " ℃";
  humidity.textContent = result.humidity + " %";
  pressure.textContent = result.pressure + " hPa";

}

function displayWeather2(result) {
  var weather = document.getElementById('weather2');
  var temperature = document.getElementById('temperature2');
  var humidity = document.getElementById('humidity2');
  var pressure = document.getElementById('pressure2');


  if (result.weather == "Rain") {
   
    document.getElementById('message2').innerHTML =
      "外出の際はお足もとにお気を付けください。<br>また、欠航等の情報にもご注意ください。";
  } else if (result.weather == "Clear") {
    if (result.temperature < 30) {
      document.getElementById('message2').innerHTML = "観光日和ですね！<br>船のご利用にも最適です！";
    } else {
      document.getElementById('message2').innerHTML = "熱中症にご注意ください。<br>室内アクティビティがオススメです！";
    }
  } else {
    document.getElementById('message2').innerHTML = "<br>室内アクティビティがオススメです！";
  }


  weather.textContent = result.weather;
  temperature.textContent = result.temperature.toFixed(2) + " ℃";
  humidity.textContent = result.humidity + " %";
  pressure.textContent = result.pressure + " hPa";

}

function displayWeather3(result) {
  var weather = document.getElementById('weather3');
  var temperature = document.getElementById('temperature3');
  var humidity = document.getElementById('humidity3');
  var pressure = document.getElementById('pressure3');


  if (result.weather == "Rain") {
    
    document.getElementById('message3').innerHTML =
      "外出の際はお足もとにお気を付けください。<br>また、欠航等の情報にもご注意ください。";
  } else if (result.weather == "Clear") {
    if (result.temperature < 30) {
      document.getElementById('message3').innerHTML = "観光日和ですね！<br>船のご利用にも最適です！";
    } else {
      document.getElementById('message3').innerHTML = "熱中症にご注意ください。<br>室内アクティビティがオススメです！";
    }
  } else {
    document.getElementById('message3').innerHTML = "<br>室内アクティビティがオススメです！";
  }


  weather.textContent = result.weather;
  temperature.textContent = result.temperature.toFixed(2) + " ℃";
  humidity.textContent = result.humidity + " %";
  pressure.textContent = result.pressure + " hPa";

}